import { useEffect, useState } from "react";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import ReportLoading from "./ReportLoading";
import { Link } from "react-router-dom";
import ReportPayloads from "./ReportPayloads/ReportPayloads";

export default function PenReports() {
  const [attacks, setAttacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("https://pen-testing-rules-engine.runasp.net/api/evaluation/attack-summary", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setAttacks(res.data.attacks);
      } catch (err) {
        // console.error("Error fetching attack summary", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <>
      <div className="pt-10">
        <section className="bg-gray-900  container m-auto  rounded-lg shadow-md">
          <h2 className="text-2xl font-bold m-4 pt-5  text-white">
            Attack Summary
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-xs uppercase bg-gray-800 text-gray-300">
                <tr>
                  <th className="px-4 py-3 ">Attack Name</th>
                  <th className="px-4 py-3 text-center">Evaluated</th>
                  <th className="px-4 py-3 text-center">Detection Error %</th>
                  <th className="px-4 py-3 text-center">
                    Classification Error %
                  </th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <ReportLoading rows={6} />
                ) : (
                  attacks.map((attack, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700 hover:bg-gray-800 transition"
                    >
                      <td className="px-4 py-3 text-white">
                        {attack.attackName}
                      </td>

                      <td className="px-4 py-3 text-center">
                        {attack.evaluatedCount}
                      </td>

                      <td className="px-4 py-3 text-center">
                        {attack.detectionErrorRate}%
                      </td>

                      <td className="px-4 py-3 text-center">
                        {attack.classificationErrorRate}%
                      </td>

                      <td className="px-4 py-3 text-center">
                        <button className="px-3 py-1 text-xs bg-teal-600 hover:bg-teal-700 text-white rounded-md transition">
                          <Link
                            to={`/pen/attack/${encodeURIComponent(attack.attackName)}`}
                            state={{ attack }}
                          >
                            View Payloads
                          </Link>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
