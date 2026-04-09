
import React, { useState } from "react";
import PayloadForm from "./PayloadForm";
import ResultCard from "./PayloadCard";
import LoadingSkeleton from "./TestLoading";
import axios from "axios";
import { PulseLoader } from "react-spinners";

export default function TestPayload() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [evaluations, setEvaluations] = useState({});

 
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isSaveSuccess, setIsSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const handleSave = async () => {
    const allEvaluated = results.every((match) => {
      const evalItem = evaluations[match.pattern];
      return evalItem?.detectionCorrect !== null && evalItem?.classificationCorrect !== null;
    });

    if (!allEvaluated) {
      setSaveError("You must evaluate all cards before saving!");
      setTimeout(() => setSaveError(null), 3000); 
      return; 
    }

    const attackEvaluations = Object.values(evaluations).map((evalItem) => ({
      attackName: evalItem.attackName,
      pattern: evalItem.pattern,
      detectionCorrect: evalItem.detectionCorrect,
      classificationCorrect: evalItem.classificationCorrect,
      notes: evalItem.notes,
    }));

    const requestBody = {
      sessionId,
      attackEvaluations,
    };

    

    setIsSaveLoading(true);
    setIsSaveSuccess(false);
    setSaveError(null);

    try {
      const response = await axios.post(
        "/rules-api/evaluation/submit",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      setIsSaveSuccess(true);
      setTimeout(() => setIsSaveSuccess(false), 2000);
    } catch (err) {
      console.error(err);
      setSaveError(err.response?.data?.error || "Failed to submit evaluation");
      setTimeout(() => setSaveError(null), 3000);
    } finally {
      setIsSaveLoading(false);
    }
  };

  return (
    <div className="container mx-auto pt-15">
      <PayloadForm
        setResults={setResults}
        setIsLoading={setIsLoading}
        setSessionId={setSessionId}
      />

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {results.map((match) => (
              <ResultCard
                key={match.pattern}
                data={match}
                onEvaluate={(evaluation) => {
                  setEvaluations((prev) => ({
                    ...prev,
                    [match.pattern]: evaluation,
                  }));
                }}
              />
            ))}
          </div>

         
          {results.length > 0 && (
            <div className="mx-auto mt-6 pb-30 container">
              <button
                type="button"
                className="text-white w-full  rounded-sm bg-teal-600 box-border border border-transparent hover:cursor-pointer hover:bg-teal-700 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                onClick={handleSave}
                disabled={isSaveLoading}
              >
                <i className="fa-regular fa-floppy-disk me-1 text-white" />
                Save Result
              </button>

              {isSaveLoading && (
                <div className="flex justify-center items-center mt-2">
                  <PulseLoader color={"#0f766e"} size={10} />
                </div>
              )}

              {isSaveSuccess && (
                <div className="flex justify-center items-center mt-2 mb-20">
                  <p className="text-teal-700">Evaluation submitted successfully</p>
                </div>
              )}

              {saveError && (
                <div className="flex justify-center items-center animate-shake mt-2 mb-20">
                  <p className="text-red-900">{saveError}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}