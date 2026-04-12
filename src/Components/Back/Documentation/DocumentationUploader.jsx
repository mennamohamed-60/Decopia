import { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";

const API_URL = "https://decopia-management-system.runasp.net/api/documentation/upload";

export default function DocumentationUploader() {
  const queryClient = useQueryClient();

  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [status, setStatus] = useState({ type: "idle" });
  const fileInputRef = useRef(null);

  const handleFile = (f) => {
    setFile(f);
    setStatus({ type: "idle" });
  };

  const clearFile = () => {
    setFile(null);
    setNotes("");
    setDescription("");
    setStatus({ type: "idle" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onDragOver = (e) => { e.preventDefault(); setIsDragOver(true); };
  const onDragLeave = () => setIsDragOver(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  };
  const onFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) handleFile(selected);
  };

  const upload = async () => {
    if (!file) { fileInputRef.current?.click(); return; }

    const token = localStorage.getItem("token");
    if (!token) {
      setStatus({ type: "error", message: "No token found in localStorage." });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("notes", notes.trim() || "-");
    formData.append("description", description.trim() || "-");

    setStatus({ type: "loading" });

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        setStatus({ type: "success", message: "Documentation uploaded successfully!" });
        clearFile();
        queryClient.invalidateQueries({ queryKey: ["documentation"] });
      } else {
        const text = await res.text();
        setStatus({ type: "error", message: `Upload failed: ${text || res.status}` });
      }
    } catch (err) {
      setStatus({ type: "error", message: `Error: ${err.message}` });
    }
  };

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      style={{ contain: "layout" }}
      className={[
        "relative flex flex-col items-center rounded-2xl border-[1.5px] border-dashed px-10 py-12 transition-colors duration-200",
        isDragOver ? "border-teal-500 bg-gray-700" : "border-teal-500 bg-gray-900",
      ].join(" ")}
    >
      {/* Decorative icons */}
      <div className="absolute left-7 top-1/2 -translate-y-1/2 opacity-10 text-teal-500 text-6xl">
        <i className="fa-regular fa-file-code" />
      </div>
      <div className="absolute right-7 top-1/2 -translate-y-1/2 opacity-10 text-teal-500 text-6xl">
        <i className="fa-solid fa-book" />
      </div>

      {/* Upload icon */}
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] border-teal-500 bg-[#1a3535] text-teal-500 text-xl">
        <i className="fa-solid fa-upload" />
      </div>

      {/* Title */}
      <h2 className="mb-2.5 text-center text-[22px] font-bold text-white">
        Upload API Documentation
      </h2>

      {/* Description */}
      <p className="mb-7 text-center text-sm leading-relaxed text-gray-400">
        Drag and drop your API documentation files here. We support{" "}
        <span className="font-mono text-[13px] text-teal-500">.json</span>,{" "}
        <span className="font-mono text-[13px] text-teal-500">.yaml</span>,{" "}
        <span className="font-mono text-[13px] text-teal-500">.pdf</span>, and{" "}
        <span className="font-mono text-[13px] text-teal-500">.md</span> files.
      </p>

      {/* File chip */}
      {file && (
        <div className="mb-4 flex w-full max-w-sm items-center gap-2 rounded-lg border border-teal-500 bg-gray-800 px-3.5 py-2 font-mono text-[13px] text-teal-500">
          <i className="fa-regular fa-file-code" />
          <span className="truncate">{file.name}</span>
          <button
            onClick={clearFile}
            className="ml-auto text-[#6b8a8a] transition-colors hover:text-[#e24b4a]"
            aria-label="Remove file"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
      )}

      {/* Inputs — shown after file is selected */}
      {file && (
        <div className="mb-5 flex w-full max-w-sm flex-col gap-3">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes (optional)..."
            rows={2}
            className="w-full rounded-lg border border-[#2e4a48] bg-gray-800 px-3.5 py-2.5 text-[13px] text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-teal-500 transition-colors resize-none"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)..."
            rows={2}
            className="w-full rounded-lg border border-[#2e4a48] bg-gray-800 px-3.5 py-2.5 text-[13px] text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-teal-500 transition-colors resize-none"
          />
        </div>
      )}

      {/* Upload button */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={upload}
          disabled={status.type === "loading"}
          className="flex items-center gap-2 rounded-lg bg-teal-500 px-7 py-[11px] text-sm font-bold text-black transition-all hover:bg-teal-600 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          { file ? (
            <><i className="fa-solid fa-cloud-arrow-up" /> Upload Now</>
          ) : (
            <><i className="fa-solid fa-folder-open" /> Select Files</>
          )}
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json,.yaml,.yml,.pdf,.md"
        onChange={onFileChange}
        style={{ display: "none" }}
      />

      {/* Status message */}
      {status.type !== "idle" && (
        <p
          className={[
            "mt-3.5 flex items-center gap-2 text-center text-[13px]",
            status.type === "loading" && "text-teal-500",
            status.type === "success" && "text-teal-500",
            status.type === "error" && "text-[#e24b4a]",
          ].filter(Boolean).join(" ")}
        >
          {status.type === "loading" && <> <PulseLoader color={"#0f766e"} size={8} /> </>}
          {status.type === "success" && <><i className="fa-solid fa-circle-check" /> {status.message}</>}
          {status.type === "error" && <><i className="fa-solid fa-circle-exclamation" /> {status.message}</>}
        </p>
      )}
    </div>
  );
}