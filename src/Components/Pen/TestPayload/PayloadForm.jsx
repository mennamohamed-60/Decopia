import React, { useState } from "react";
import axios from "axios";

export default function PayloadForm({
  setResults,
  setIsLoading,
  setSessionId,
}) {
  const [payload, setPayload] = useState("");
  const [error, setError] = useState(null);

  function getUserFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch (error) {
      console.error("Invalid token");
      return null;
    }
  }

  async function getClientIP() {
    try {
      const res = await axios.get("https://api.ipify.org?format=json");
      return res.data.ip;
    } catch {
      return "Unknown";
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!payload.trim()) {
      setError("Payload is required");
      return;
    }

    setError(null);
    setIsLoading(true);
    setResults([]);

    try {
      const user = getUserFromToken();
      const clientIP = await getClientIP();

      const response = await axios.post(
        "/rules-api/rules/analyze",
        {
          payload,
          clientId: clientIP,
          assignedTo: user?.email,
          userAgent: navigator.userAgent,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setResults(response.data.matches || []);
      setSessionId(response.data.sessionId);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze payload");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 container  mx-auto mb-4 rounded-sm bg-gray-900">
      <h4 className="text-2xl font-semibold">Rules Engine Testing</h4>

      <form className="space-y-6 mt-5" onSubmit={handleSubmit}>
        <div className="mb-6 grid-cols-1 md:grid-cols-3">
          <div>
            <label
              htmlFor="payload"
              className="block mb-2 text-sm font-medium text-gray-200"
            >
              Enter Payload
            </label>

            <textarea
              id="payload"
              rows={1}
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              className={`bg-gray-50 text-gray-900 text-sm rounded-sm block w-full p-2.5 
                focus:ring-1 
                dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
                ${
                  error
                    ? "border border-red-900 focus:border-red-900 focus:ring-red-900"
                    : "border border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                }`}
              placeholder="Type your payload here..."
            />

            {error && (
              <div className="flex justify-start items-center gap-2 m-1">
                <i className="fa-solid fa-circle-exclamation text-red-900"></i>
                <p className="text-red-900">{error}</p>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-teal-600 hover:bg-teal-700 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-teal-600 font-medium rounded-sm text-sm px-5 py-2.5"
        >
          Analyze Payload
        </button>
      </form>
    </div>
  );
}
