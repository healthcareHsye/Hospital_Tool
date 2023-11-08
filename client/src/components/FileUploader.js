import React, { useEffect } from "react";

function FileUploader() {
  useEffect(() => {
    // Retrieve the data URL from local storage
    const storedDataUrl = localStorage.getItem("file");

    // Convert the data URL to a File object
    const uploadedFile = dataURLtoFile(storedDataUrl, "file.xls");

    // Function to convert data URL to a File object
    function dataURLtoFile(dataUrl, filename) {
      if (dataUrl != null) {
        const byteString = atob(dataUrl.split(",")[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: "application/octet-stream" });

        // Create a File object from the Blob
        const file = new File([blob], filename);

        return file;
      }
    }

    // Function to upload the file to the server
    function uploadFile(file) {
      const formData = new FormData();
      formData.append("file", file);

      // Make a POST request to your server to handle the file upload using fetch
      fetch("http://127.0.0.1:5002/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log("File uploaded successfully.");
          } else {
            console.error("Error uploading file:", response.statusText);
          }
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }

    // Upload the retrieved file
    uploadFile(uploadedFile);
  }, []);

  return (
    <div>
      {/* You can render UI elements related to file upload if needed */}
    </div>
  );
}

export default FileUploader;
