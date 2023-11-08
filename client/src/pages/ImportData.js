import React, { useState } from "react";
import "../FileDrag.css"; // Make sure to replace 'YourStylesheet' with the actual stylesheet name

function ImportData() {
  const [fileName, setFileName] = useState("");
  const [fileDataUrl, setFileDataUrl] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        setFileDataUrl(dataUrl);
        localStorage.setItem("file", dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    handleFileUpload({ target: { files: [file] } });
  };

  return (
    <div>
      <h1>Import Data</h1>
      <input type="file" onChange={handleFileUpload} />
      <div className="drag-drop-area"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        Drag and drop your file here
      </div>
      {fileName && (
        <div>
          <h2>Uploaded File Name:</h2>
          <p>{fileName}</p>
        </div>
      )}
      {fileDataUrl && (
        <div>
          <h2>File Data URL:</h2>
          <p>{fileDataUrl}</p>
        </div>
      )}
    </div>
  );
}

export default ImportData;
