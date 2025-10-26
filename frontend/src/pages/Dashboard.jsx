import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Dashboard({ userEmail, onLogout }) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    fetchUserDocs();
  }, []);

  // ✅ Fetch only documents for the logged-in user
  const fetchUserDocs = async () => {
    try {
      const res = await api.get("/documents", {
        params: { owner_email: userEmail },
      });
      setDocs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const renderFilePreview = (doc) => {
    const ext = doc.filename.split(".").pop().toLowerCase();
    if (ext === "pdf") return <div className="file-icon">📄</div>;
    if (["png", "jpg", "jpeg", "gif"].includes(ext)) {
      return (
        <img
          src={`http://127.0.0.1:8000/${doc.path}`}
          alt={doc.filename}
          className="document-image"
        />
      );
    }
    return <div className="file-icon">📁</div>;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Welcome, {userEmail}</h2>
        <button className="btn btn-logout" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="button-group">
        <Link to="/upload-chat" className="btn btn-primary">
          Upload & Ask AI
        </Link>
      </div>

      <h3>Your Documents</h3>
      <div className="documents-list">
        {docs.length === 0 && <p>No documents uploaded yet.</p>}
        {docs.map((doc) => (
          <div key={doc.id} className="document-card">
            {renderFilePreview(doc)}
            <a
              href={`http://127.0.0.1:8000/${doc.path}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {doc.filename}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
