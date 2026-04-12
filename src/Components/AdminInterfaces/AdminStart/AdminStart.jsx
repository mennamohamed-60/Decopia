import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import KPICards from "./KPICards/KPICards";
import AttackErrorChart from "./AdminCharts/AttackErrorChart";
import AttackTrafficChart from "./AdminCharts/AttackTrafficChart";
import FailurePieChart from "./AdminCharts/FailurePieChart";
import AdminStartSkeleton from "./AdminStartSkeleton";

export default function AdminStart() {
  const { data: attackData = [] } = useQuery({
    queryKey: ["attacks"],
    queryFn: async () => {
      const res = await axios.get(
        "https://pen-testing-rules-engine.runasp.net/api/evaluation/attack-summary"
      );
      return res.data.attacks;
    },
    staleTime: 1000 * 60 * 5,
  });

  const { data: failureData = [] } = useQuery({
    queryKey: ["failures"],
    queryFn: async () => {
      const res = await axios.get(
        "https://pen-testing-rules-engine.runasp.net/api/evaluation/failed?type=all"
      );
      return res.data.items;
    },
    staleTime: 1000 * 60 * 5,
  });

 
  const isLoading =
    attackData.length === 0 || failureData.length === 0;

  if (isLoading) {
    return <AdminStartSkeleton />;
  }

  return (
    <div className="p-6 min-h-screen">
      {/* KPIs */}
      <div className="mb-6">
        <KPICards />
      </div>

      <h2 className="text-xl font-bold text-white mb-4">
        Attack Overview
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-gray-900 p-6 rounded-xl shadow lg:col-span-2">
          <AttackErrorChart data={attackData} />
        </div>

        <div className="bg-gray-900 p-6 rounded-xl shadow">
          <AttackTrafficChart data={attackData} />
        </div>

        <div className="bg-gray-900 p-6 rounded-xl shadow">
          <FailurePieChart data={failureData} />
        </div>
      </div>
    </div>
  );
}