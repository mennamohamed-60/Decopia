import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ReportLoading from "./ReportLoading";
import { Link } from "react-router-dom";
import RulesFileTable from "../../Security/AploadRules/RulesFileTable.jsx";

export default function PenReports() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const fetchSummary = async () => {
    const res = await axios.get(
      "https://pen-testing-rules-engine.runasp.net/api/evaluation/attack-summary",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    return res.data.attacks;
  };

  const { data: attacks = [], isLoading } = useQuery({
    queryKey: ["attack-summary"],
    queryFn: fetchSummary,
    refetchOnWindowFocus: true,
    refetchInterval: 5000,
    staleTime: 2 * 60 * 1000,
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = attacks.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(attacks.length / rowsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [attacks, totalPages, currentPage]);

  return (
    <>
      <div className="pt-10">
        <section className="bg-gray-900 container m-auto rounded-lg shadow-md">
          <h2 className="text-2xl font-bold m-4 pt-5 text-white">
            Attack Summary
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-xs md:text-sm text-left text-gray-400">
              <thead className="text-xs uppercase bg-gray-800 text-gray-300">
                <tr>
                  <th className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap">
                    Attack Name
                  </th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-center whitespace-nowrap">
                    Evaluated
                  </th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-center whitespace-nowrap">
                    Detection Error %
                  </th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-center whitespace-nowrap">
                    Classification Error %
                  </th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-center whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <ReportLoading rows={6} />
                ) : (
                  currentRows.map((attack, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700 hover:bg-gray-800 transition"
                    >
                      <td className="px-2 md:px-4 py-2 md:py-3 text-white whitespace-nowrap">
                        {attack.attackName}
                      </td>

                      <td className="px-2 md:px-4 py-2 md:py-3 text-center whitespace-nowrap">
                        {attack.evaluatedCount}
                      </td>

                      <td className="px-2 md:px-4 py-2 md:py-3 text-center whitespace-nowrap">
                        {attack.detectionErrorRate}%
                      </td>

                      <td className="px-2 md:px-4 py-2 md:py-3 text-center whitespace-nowrap">
                        {attack.classificationErrorRate}%
                      </td>

                      <td className="px-2 md:px-4 py-2 md:py-3 text-center whitespace-nowrap">
                        <Link
                          className="px-2 md:px-3 py-1 text-xs bg-teal-600 hover:bg-teal-700 text-white rounded-md transition"
                          to={`/pen/attack/${encodeURIComponent(
                            attack.attackName,
                          )}`}
                          state={{ attack }}
                        >
                          View Payload
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!isLoading && attacks.length > 0 && (
            <div className="flex justify-center items-center gap-4 py-4">
              <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 cursor-pointer"
              >
                Previous
              </button>

              <span className="text-white">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>

      {/* <div className="container m-auto  pb-10">
        <RulesFileTable />
      </div> */}
    </>
  );
}
