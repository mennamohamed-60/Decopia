import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AttackTrafficChart({ data }) {
  const topData = [...data]
    .sort((a, b) => b.evaluatedCount - a.evaluatedCount)
    .slice(0, 5);

  const formatLabel = (text) => {
    const words = text.split(" ");

    if (words.length <= 4) return text;

    const mid = Math.ceil(words.length / 2);

    const firstLine = words.slice(0, mid).join(" ");
    const secondLine = words.slice(mid).join(" ");

    return `${firstLine}\n${secondLine}`;
  };

  return (
    <div>
      <h3 className="text-white mb-2">Top 5 Attack Traffic</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          layout="vertical"
          data={topData}
          margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
          barCategoryGap="10%"
        >
          <XAxis type="number" />

          <YAxis
            dataKey="attackName"
            type="category"
            tickFormatter={(value) =>
              value.length > 10 ? value.slice(0, 20) + "..." : value
            }
            tick={{ fontSize: 12, fill: "#fff" }}
            width={150}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "none",
              borderRadius: "8px",
              whiteSpace: "pre-line",
            }}
            labelFormatter={(label) => formatLabel(label)}
            itemStyle={{ color: "#fff" }}
          />

          <Bar dataKey="evaluatedCount" fill="#14b8a6" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
