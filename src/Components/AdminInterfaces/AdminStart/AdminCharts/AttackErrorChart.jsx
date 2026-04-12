import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AttackErrorChart({ data }) {
  const formatLabel = (text) => {
    const words = text.split(" ");

    if (words.length <= 4) return text;

    const mid = Math.ceil(words.length / 2);

    const firstLine = words.slice(0, mid).join(" ");
    const secondLine = words.slice(mid).join(" ");

    return `${firstLine}\n${secondLine}`;
  };

  // تحويل الـ error إلى success
  const transformedData = data.map((item) => ({
    ...item,
    detectionSuccessRate: 100 - item.detectionErrorRate,
    classificationSuccessRate: 100 - item.classificationErrorRate,
  }));

  return (
    <div>
      <h3>Error Comparison</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={transformedData}>
          <XAxis dataKey="attackName" />
          <YAxis domain={[0, 100]} />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "none",
              borderRadius: "10px",
              padding: "10px",
              whiteSpace: "pre-line",
            }}
            labelStyle={{
              color: "#ffffff",
              fontWeight: "bold",
              whiteSpace: "pre-line",
            }}
            labelFormatter={(label) => formatLabel(label)}
            formatter={(value, name) => [`${value}%`, name]}
          />

          <Legend />

          <Bar
            dataKey="detectionSuccessRate"
            fill="#4c1d95"
            name="Detection Success"
          />

          <Bar
            dataKey="classificationSuccessRate"
            fill="#14b8a6"
            name="Classification Success"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}