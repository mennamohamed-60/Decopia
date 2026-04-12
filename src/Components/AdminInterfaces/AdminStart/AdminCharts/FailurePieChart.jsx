import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function FailurePieChart({ data }) {
  const counts = {
    MissedDetection: 0,
    WrongClassification: 0,
    Both: 0,
  };

  data.forEach((item) => {
    const type = item.failureType;

    if (type === "MissedDetection") counts.MissedDetection++;
    else if (type === "WrongClassification") counts.WrongClassification++;
    else counts.Both++;
  });

  const chartData = Object.entries(counts).map(([key, value]) => ({
    name: key,
    value,
  }));

  const colors = ["#a855f7", "#14b8a6", "#f59e0b"];

  

  return (
    <div>
      <h3>Failure Type Distribution</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={colors[index]} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
            // itemStyle={{ color: "#fff" }}
            // labelStyle={{ color: "#fff" }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
