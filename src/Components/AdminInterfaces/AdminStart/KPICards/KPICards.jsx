import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function KPICards() {
  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axios.get(
        "https://pen-testing-rules-engine.runasp.net/api/evaluation/stats"
      );
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  if (!stats) return null;

  const cards = [
    {
      title: "Total Payloads",
      value: stats.totalPayloadsTested,
      percent: null,
      icon: "fa-database",
    },
    {
      title: "Detection Accuracy",
      value: `${stats.detectionAccuracyPercent}%`,
      percent: stats.detectionAccuracyPercent,
      icon: "fa-circle-check",
    },
    {
      title: "Classification Accuracy",
      value: `${stats.classificationAccuracyPercent}%`,
      percent: stats.classificationAccuracyPercent,
      icon: "fa-chart-pie",
    },
  ];

  return (
    <div className="grid gap-6 p-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <div
          key={index}
          className="p-5 rounded-2xl bg-gray-900 shadow-lg hover:scale-105 transition duration-300"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-gray-200 text-lg">{card.title}</h3>
            <i className={`fa-solid ${card.icon} text-xl text-white`} />
          </div>

          {/* Value */}
          <p
            className={`text-white font-semibold mt-4 ${
              index === 0 ? "text-5xl" : "text-3xl"
            }`}
          >
            {card.value}
          </p>

          {/* Progress */}
          {card.percent !== null && (
            <div className="w-full rounded-full h-2.5 mt-5 bg-gray-700">
              <div
                className={`h-2.5 rounded-full ${
                  card.percent < 50 ? "bg-red-500" : "bg-teal-500"
                }`}
                style={{ width: `${card.percent}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}