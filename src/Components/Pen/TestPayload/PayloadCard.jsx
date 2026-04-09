import React, { useState, useEffect } from "react";

export default function ResultCard({ data, onEvaluate }) {
  const [detectionCorrect, setDetectionCorrect] = useState(null);
  const [classificationCorrect, setClassificationCorrect] = useState(null);
  const [notes, setNotes] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    onEvaluate({
      attackName: data.attackName,
      pattern: data.pattern,
      detectionCorrect,
      classificationCorrect,
      notes,
    });
  }, [detectionCorrect, classificationCorrect, notes]);

  return (
    <div className="bg-gray-900 p-6 rounded-sm shadow flex flex-col relative">
      <p className="text-gray-400">Attack Name:</p>

      <div className="relative">
        <h5
          className="mb-3 text-2xl font-semibold text-heading leading-8 truncate cursor-pointer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {data.attackName}
        </h5>

        {showTooltip && (
          <div className="absolute left-0 bottom-full mb-1 w-max max-w-xs bg-gray-700 text-white text-sm p-2 rounded shadow z-50">
            {data.attackName}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mt-2">
        <p className="text-gray-400 text-xl mb-0">Severity score:</p>
        <span
          className={`text-l font-medium px-2 py-1 rounded-full ${
            data.score >= 4
              ? "bg-red-400/40 text-red-300"
              : "bg-yellow-200/40 text-yellow-100"
          }`}
        >
          {data.score}
        </span>
      </div>

      <hr className="h-px my-2 bg-gray-400 border-0" />

      <div className="mt-1 flex justify-between">
        {/* Detection */}
        <div>
          <p className="mb-2 text-xl font-medium">Test Detection:</p>
          <div className="flex flex-col gap-2">
            <label className="inline-flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name={`detection-${data.pattern}`}
                onChange={() => setDetectionCorrect(true)}
                className="w-4 h-4 text-teal-500 bg-gray-400 border-gray-300 focus:ring-teal-500"
              />
              <span className="text-gray-200 text-base">correct</span>
            </label>
            <label className="inline-flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name={`detection-${data.pattern}`}
                onChange={() => setDetectionCorrect(false)}
                className="w-4 h-4 text-teal-500 bg-gray-400 border-gray-300 focus:ring-teal-500"
              />
              <span className="text-gray-200 text-base">incorrect</span>
            </label>
          </div>
        </div>

        {/* Classification */}
        <div>
          <p className="mb-2 text-xl font-medium">Test Classification:</p>
          <div className="flex flex-col gap-2">
            <label className="inline-flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name={`classification-${data.pattern}`}
                onChange={() => setClassificationCorrect(true)}
                className="w-4 h-4 text-teal-500 bg-gray-400 border-gray-300 focus:ring-teal-500"
              />
              <span className="text-gray-200 text-base">correct</span>
            </label>
            <label className="inline-flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name={`classification-${data.pattern}`}
                onChange={() => setClassificationCorrect(false)}
                className="w-4 h-4 text-teal-500 bg-gray-400 border-gray-300 focus:ring-teal-500"
              />
              <span className="text-gray-200 text-base">incorrect</span>
            </label>
          </div>
        </div>
      </div>

      <textarea
        rows={1}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="bg-gray-50 mt-2 text-gray-900 text-sm rounded-sm block w-full p-2.5 focus:ring-1 focus:ring-teal-500 focus:outline-none dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder="Type any notes here..."
      ></textarea>
    </div>
  );
}
