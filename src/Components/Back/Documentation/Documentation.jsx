import React from "react";
import DocumentationUploader from "./DocumentationUploader.jsx";
import DocumentationFiles from "./DocumentationFiles.jsx";



export default function Documentation() {
  return (
    <>
      <div className="min-h-screen bg-slate-950 px-6 py-14">
        <div className="container mx-auto">
          <DocumentationUploader></DocumentationUploader>
        </div>
        <div className="container mx-auto">
          <DocumentationFiles></DocumentationFiles>
        </div>
      </div>
    </>
  );
}
