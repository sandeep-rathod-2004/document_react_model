import React, { useState } from "react";
import api from "../services/api";

function UploadChat() {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);

  const userEmail = localStorage.getItem("email");

  // ✅ Upload document to backend
  const handleUpload = async () => {
    if (!file) return;
    setLoadingUpload(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("owner_email", userEmail);

    try {
      const res = await api.post("/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadedFile(res.data.document);
      setAnswer("");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Please try again.");
    } finally {
      setLoadingUpload(false);
    }
  };

  // ✅ Send file + question to AI endpoint
  const askAI = async () => {
    if (!question || !uploadedFile) return alert("Please upload a file first.");
    setLoadingAI(true);
    setAnswer("");

    try {
      // We need to re-fetch the file from uploads to send again as form-data
      const response = await fetch(`http://127.0.0.1:8000/uploads/${uploadedFile.filename}`);
      const blob = await response.blob();
      const fileForAI = new File([blob], uploadedFile.filename, { type: blob.type });

      const formData = new FormData();
      formData.append("file", fileForAI);
      formData.append("question", question);

      const res = await api.post("/ai/chat", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAnswer(res.data.answer);
    } catch (err) {
      console.error("AI chat error:", err);
      setAnswer("Failed to get AI response. Try again.");
    } finally {
      setLoadingAI(false);
    }
  };

  const renderFilePreview = (doc) => {
    const ext = doc.filename.split(".").pop().toLowerCase();
    if (ext === "pdf") return <div className="file-icon">📄</div>;
    if (["png", "jpg", "jpeg", "gif", "bmp", "tiff"].includes(ext)) {
      return (
        <img
          src={`http://127.0.0.1:8000/uploads/${doc.filename}`}
          alt={doc.filename}
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            transition: "transform 0.2s",
          }}
          onClick={() =>
            window.open(`http://127.0.0.1:8000/uploads/${doc.filename}`, "_blank")
          }
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      );
    }
    return <div className="file-icon">📁</div>;
  };

  return (
    <div className="page-container">
      <h2 className="page-header">Upload Document & Ask AI</h2>

      <div className="upload-chat-form">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button
          className={`btn btn-primary ${loadingUpload ? "loading" : ""}`}
          onClick={handleUpload}
          disabled={loadingUpload}
        >
          {loadingUpload ? "Uploading..." : "Upload"}
        </button>
      </div>

      {uploadedFile && (
        <>
          <h3>Uploaded File</h3>
          <div className="document-card">
            {renderFilePreview(uploadedFile)}
            <a
              href={`http://127.0.0.1:8000/uploads/${uploadedFile.filename}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {uploadedFile.filename}
            </a>
          </div>

          <h3>Ask AI</h3>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something about this file..."
            style={{ width: "100%", height: "80px", marginBottom: "10px" }}
          />
          <button
            className={`btn btn-secondary ${loadingAI ? "loading" : ""}`}
            onClick={askAI}
            disabled={loadingAI}
          >
            {loadingAI ? "Thinking..." : "Ask"}
          </button>

          {answer && (
            <div
              className="chat-response"
              style={{
                marginTop: "15px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                maxHeight: "300px",
                overflowY: "auto",
                whiteSpace: "pre-wrap",
              }}
            >
              <strong>Answer:</strong> {answer}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UploadChat;
