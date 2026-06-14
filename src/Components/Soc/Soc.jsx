import React from "react";
import SocUploader from "./SocUploader";
import SocFiles from "./SocFiles";

export default function Soc() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="container mx-auto">
        <SocUploader />
        <SocFiles></SocFiles>
      </div>
    </div>
  );
}