import React, { useState } from "react";
import "./styles.css";

function combine() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleCombineFiles = () => {
    const fileContents = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (event) => {
        fileContents.push({
          name: file.name,
          content: event.target.result,
          date: file.lastModified
        });

        if (fileContents.length === files.length) {
          fileContents.sort((a, b) => a.date - b.date);

          const combinedContent = fileContents.reduce(
            (acc, cur) => `${acc}\n\n${cur.name}\n${cur.content}`,
            ""
          );

          const blob = new Blob([combinedContent], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "combined.txt");
          document.body.appendChild(link);
          link.click();
        }
      };
    });
  };

  return (
    <div>
      <h1 className="title componentA-title">Combine logs</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <div className="button-container">
        <button className="button" onClick={handleCombineFiles}>
          Combine files
        </button>
      </div>
    </div>
  );
}

export default combine;
