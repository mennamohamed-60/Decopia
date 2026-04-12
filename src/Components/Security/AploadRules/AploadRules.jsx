import React from "react";
import RuleSetUploader from "./RuleSetUploader.jsx";
import RulesFileTable from "./RulesFileTable.jsx";

export default function AploadRules() {
  return (
    <>
      <div className="min-h-screen bg-slate-950 px-6 py-8">
        <div className="container m-auto mt-6 ">
          <RuleSetUploader />
        </div>

        <div className="container m-auto  pb-10">
          <RulesFileTable />
        </div>
      </div>
    </>
  );
}
