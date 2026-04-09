import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ReportPayloads() {
  const { attackName } = useParams();
  const location = useLocation();

  const [attack, setAttack] = useState(location.state?.attack || null);

  useEffect(() => {
    if (!attack) {
      console.log("No attack data passed");
    }
  }, [attack]);

  if (!attack) {
    return (
      <div className="p-6 text-white">
        No data found for: {decodeURIComponent(attackName)}
      </div>
    );
  }

  return (
    <div className="pt-10">
      <section className="bg-gray-900 container m-auto rounded-lg shadow-md">
        <h2 className="text-2xl font-bold m-4 pt-5 text-white">
          {attack.attackName}
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs uppercase bg-gray-800 text-gray-300">
              <tr>
                <th className="px-4 py-3">Payload</th>
                <th className="px-4 py-3 text-center">Detection</th>
                <th className="px-4 py-3 text-center">Classification</th>
                <th className="px-4 py-3 text-center">Assigned To</th>
                <th className="px-4 py-3 text-center">Notes</th>
                <th className="px-4 py-3 text-center">Created At</th>
              </tr>
            </thead>

            <tbody>
              {attack.failedPayloads.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-teal-400">
                    No Failed Payloads <i class="fa-solid fa-gift"></i>
                  </td>
                </tr>
              ) : (
                attack.failedPayloads.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700 hover:bg-gray-800 transition"
                  >
                    <td className="px-4 py-3 break-all">{item.payload}</td>

                    <td className="px-4 py-3 text-center text-lg">
                      {item.detectionCorrect ? (
                        <i className="fa-regular fa-circle-check text-teal-500"></i>
                      ) : (
                        <i className="fa-regular fa-circle-xmark text-red-500"></i>
                      )}
                    </td>

                    <td className="px-4 py-3 text-center text-lg">
                      {item.classificationCorrect ? (
                        <i className="fa-regular fa-circle-check text-teal-500"></i>
                      ) : (
                        <i className="fa-regular fa-circle-xmark text-red-500"></i>
                      )}
                    </td>

                    <td className="px-4 py-3 text-center">{item.assignedTo}</td>

                    <td className="px-4 py-3 text-center">
                      {item.notes || "-"}
                    </td>

                    <td className="px-4 py-3 text-center">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
