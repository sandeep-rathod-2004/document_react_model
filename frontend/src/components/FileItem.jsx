import React from "react";

const FileItem = ({ file }) => {
  return (
    <div className="file-item">
      <span>{file.filename}</span>
      <span>{new Date(file.uploaded_at).toLocaleString()}</span>
    </div>
  );
};

export default FileItem;
