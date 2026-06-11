import { useState, useEffect, useCallback } from "react";

const SLACK_TOKEN = import.meta.env.REACT_APP_SLACK_TOKEN;

const CHANNEL_ID = "C0B08KXM3K4";

const ROWS_PER_PAGE = 6; 

function getLevelStyle(level) {
  const n = parseInt(level);
  if (n >= 12)
    return {
      label: "Critical",
      color: "#e24b4a",
      bg: "rgba(226,75,74,0.12)",
      border: "rgba(226,75,74,0.3)",
    };
  if (n >= 8)
    return {
      label: "Medium",
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.12)",
      border: "rgba(245,158,11,0.3)",
    };
  return {
    label: "Low",
    color: "#14b8a6",
    bg: "rgba(20,184,166,0.12)",
    border: "rgba(20,184,166,0.3)",
  };
}

function parseWazuhLog(msg) {
  const text = msg.text || "";
  if (!text.includes("Attack Detected")) return null;
  return {
    id: msg.ts,
    level: text.match(/Level:\s*(\d+)/)?.[1]?.trim() || "N/A",
    attack: text.match(/Attack:\s*(.+)/)?.[1]?.trim() || "N/A",
    sourceIP: text.match(/Source IP:\s*(.+)/)?.[1]?.trim() || "N/A",
    decoy: text.match(/Decoy:\s*(.+)/)?.[1]?.trim() || null,
    payload: text.match(/Payload:\s*(.+)/)?.[1]?.trim() || null,
    totalAttacks:
      text.match(/New attacks:\s*(\d+)/)?.[1] ||
      text.match(/Total attacks in last 5 min:\s*(\d+)/)?.[1] ||
      "0",
    timestamp: msg.ts ? new Date(parseFloat(msg.ts) * 1000) : new Date(),
  };
}

function formatTime(date) {
  if (!(date instanceof Date) || isNaN(date)) return "N/A";
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function StatCard({ label, value, icon, accent }) {
  return (
    <div className="relative flex-1 min-w-[120px] rounded-2xl bg-gray-900 px-5 py-4 overflow-hidden">
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10 text-teal-500 text-5xl">
        <i className={icon} />
      </div>
      <p className="text-xs text-gray-400 font-medium mb-1">{label}</p>
      <p className="text-3xl font-bold" style={{ color: accent || "#14b8a6" }}>
        {value}
      </p>
    </div>
  );
}

function Badge({ level }) {
  const s = getLevelStyle(level);
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        border: `1.5px solid ${s.border}`,
        fontSize: 11,
        fontWeight: 700,
        padding: "3px 10px",
        borderRadius: 999,
        whiteSpace: "nowrap",
        fontFamily: "monospace",
      }}
    >
      {s.label} · Lvl {level}
    </span>
  );
}

// ─── Skeleton Loading ────────────────────────────────────────────────────────
function TableSkeleton({ rows = 8 }) {
  return Array.from({ length: rows }).map((_, i) => (
    <tr
      key={i}
      className="border-b border-[#1a3535] animate-pulse"
      style={{ background: i % 2 === 0 ? "transparent" : "rgba(20,184,166,0.03)" }}
    >
      <td className="px-4 py-3">
        <div className="h-6 w-24 rounded-full bg-gray-700" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-40 rounded bg-gray-700" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-28 rounded bg-gray-700" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-20 rounded bg-gray-700" />
      </td>
      <td className="px-4 py-3">
        <div className="h-7 w-24 rounded-lg bg-gray-700" />
      </td>
      <td className="px-4 py-3 text-center">
        <div className="h-6 w-10 rounded-full bg-gray-700 mx-auto" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-32 rounded bg-gray-700" />
      </td>
    </tr>
  ));
}

function PayloadModal({ log, onClose }) {
  if (!log) return null;
  const s = getLevelStyle(log.level);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-gray-900 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full border border-[#2e4a48] bg-gray-800 text-gray-400 hover:text-white hover:border-teal-500 transition-colors cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-xs" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-teal-500 bg-[#1a3535] text-teal-500 text-sm">
            <i className="fa-solid fa-file-code" />
          </span>
          <div>
            <h2 className="text-white font-bold text-[16px]">Payload Details</h2>
            <p className="text-xs text-gray-400">{formatTime(log.timestamp)}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-5">
          <div className="flex items-center justify-between rounded-lg border border-[#2e4a48] bg-gray-800 px-4 py-2.5">
            <span className="text-xs text-gray-400 font-medium">Attack</span>
            <span className="text-sm text-gray-100 font-semibold">{log.attack}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-[#2e4a48] bg-gray-800 px-4 py-2.5">
            <span className="text-xs text-gray-400 font-medium">Level</span>
            <Badge level={log.level} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-[#2e4a48] bg-gray-800 px-4 py-2.5">
            <span className="text-xs text-gray-400 font-medium">Source IP</span>
            <span className="font-mono text-sm text-teal-400">{log.sourceIP}</span>
          </div>
          {log.decoy && (
            <div className="flex items-center justify-between rounded-lg border border-[#2e4a48] bg-gray-800 px-4 py-2.5">
              <span className="text-xs text-gray-400 font-medium">Decoy</span>
              <span className="font-mono text-sm text-gray-300">{log.decoy}</span>
            </div>
          )}
          <div className="flex items-center justify-between rounded-lg border border-[#2e4a48] bg-gray-800 px-4 py-2.5">
            <span className="text-xs text-gray-400 font-medium">New Attacks</span>
            <span
              className="px-3 py-1 rounded-full text-xs font-bold font-mono"
              style={{
                background: parseInt(log.totalAttacks) > 10 ? "rgba(226,75,74,0.15)" : "rgba(20,184,166,0.1)",
                color: parseInt(log.totalAttacks) > 10 ? "#e24b4a" : "#14b8a6",
              }}
            >
              {log.totalAttacks}
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs text-teal-500 font-semibold uppercase tracking-wide mb-2">
            <i className="fa-solid fa-code mr-1.5" />
            Payload
          </p>
          {log.payload ? (
            <div className="rounded-lg border border-teal-900 bg-gray-800 px-4 py-3">
              <p className="font-mono text-sm text-teal-500 break-all leading-relaxed">{log.payload}</p>
            </div>
          ) : (
            <div className="rounded-lg border border-[#2e4a48] bg-gray-800 px-4 py-3">
              <p className="text-sm text-gray-500 italic">No payload captured.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WazuhDashboard() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedLog, setSelectedLog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // ← pagination state

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let allMessages = [];
      let cursor = null;
      do {
        const url = new URL("/slack-api/api/conversations.history", window.location.origin);
        url.searchParams.set("channel", CHANNEL_ID);
        url.searchParams.set("limit", "200");
        if (cursor) url.searchParams.set("cursor", cursor);

        const res = await fetch(url.toString(), {
          headers: {
            Authorization: `Bearer ${SLACK_TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!data.ok) throw new Error(data.error || "Slack API error");
        allMessages = [...allMessages, ...(data.messages || [])];
        cursor = data.response_metadata?.next_cursor || null;
      } while (cursor);

      const parsed = allMessages
        .map(parseWazuhLog)
        .filter(Boolean)
        .sort((a, b) => b.timestamp - a.timestamp);

      setLogs(parsed);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 60000);
    return () => clearInterval(interval);
  }, [fetchLogs]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setSelectedLog(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // ─── Filtering ───────────────────────────────────────────────────────────
  const filtered = logs.filter((log) => {
    const matchSearch =
      search === "" ||
      log.attack.toLowerCase().includes(search.toLowerCase()) ||
      log.sourceIP.includes(search) ||
      log.payload?.toLowerCase().includes(search.toLowerCase()) ||
      log.decoy?.toLowerCase().includes(search.toLowerCase());
    const matchLevel =
      filterLevel === "all" ||
      (filterLevel === "critical" && parseInt(log.level) >= 12) ||
      (filterLevel === "medium" && parseInt(log.level) >= 8 && parseInt(log.level) < 12) ||
      (filterLevel === "low" && parseInt(log.level) < 8);
    return matchSearch && matchLevel;
  });

  // ─── Pagination ──────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));

  // لو الـ filter اتغيرت نرجع للصفحة الأولى
  useEffect(() => { setCurrentPage(1); }, [search, filterLevel]);

  const paginatedRows = filtered.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  const criticalCount = logs.filter((l) => parseInt(l.level) >= 12).length;
  const mediumCount = logs.filter((l) => parseInt(l.level) >= 8 && parseInt(l.level) < 12).length;
  const totalAttacksSum = logs.reduce((sum, l) => sum + parseInt(l.totalAttacks || 0), 0);

  const TABLE_HEADERS = ["Level", "Attack Type", "Source IP", "Decoy", "Payload", "New Attacks", "Time"];

  return (
    <div className="min-h-screen bg-slate-950 font-sans pt-8">
      <section className="container mx-auto mt-4 rounded-lg p-6">
        <PayloadModal log={selectedLog} onClose={() => setSelectedLog(null)} />

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div>
            <h1 className="text-[22px] font-bold text-white flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-teal-500 bg-[#1a3535] text-teal-500 text-base">
                <i className="fa-solid fa-shield-halved" />
              </span>
              Wazuh Security Dashboard
            </h1>
            <p className="text-xs text-gray-400 mt-1 ml-11">
              Live logs from Slack · Auto-refreshes every 60s
              {lastUpdated && ` · Last updated: ${formatTime(lastUpdated)}`}
            </p>
          </div>
          <button
            onClick={fetchLogs}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-teal-500 px-6 py-[10px] text-sm font-bold text-black transition-all hover:bg-teal-600 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <><i className="fa-solid fa-spinner fa-spin" /> Loading...</>
            ) : (
              <><i className="fa-solid fa-rotate-right" /> Refresh</>
            )}
          </button>
        </div>

        {/* Stat Cards */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <StatCard label="Total Logs" value={logs.length} icon="fa-solid fa-list" accent="#14b8a6" />
          <StatCard label="Critical" value={criticalCount} icon="fa-solid fa-triangle-exclamation" accent="#e24b4a" />
          <StatCard label="Medium" value={mediumCount} icon="fa-solid fa-circle-exclamation" accent="#f59e0b" />
          <StatCard label="Total Attack Events" value={totalAttacksSum.toLocaleString()} icon="fa-solid fa-bolt" accent="#60a5fa" />
        </div>

        {/* Filters */}
        <div className="flex gap-3 flex-wrap items-center mb-4 rounded-2xl bg-gray-900 px-5 py-4">
          <div className="relative flex-1 min-w-[200px]">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search by attack, IP, payload, decoy..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-[#2e4a48] bg-gray-800 pl-9 pr-3.5 py-2.5 text-[13px] text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:shadow-none focus:border-teal-500 transition-colors"
            />
          </div>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="rounded-lg border border-[#2e4a48] bg-gray-800 px-3.5 py-2.5 text-[13px] text-gray-100 focus:outline-none focus:ring-0 focus:shadow-none focus:border-teal-500 transition-colors cursor-pointer"
          >
            <option value="all">All Levels</option>
            <option value="critical">Critical (12+)</option>
            <option value="medium">Medium (8–11)</option>
            <option value="low">Low (0–7)</option>
          </select>
          <span className="text-xs text-gray-400 font-mono">
            {filtered.length} / {logs.length} logs
          </span>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-[rgba(226,75,74,0.3)] bg-[rgba(226,75,74,0.1)] px-4 py-3 mb-4 text-[#e24b4a] text-[13px]">
            <i className="fa-solid fa-circle-exclamation" />
            Error: {error} — Check your Token &amp; Channel ID.
          </div>
        )}

        {/* Table */}
        <div className="rounded-2xl bg-gray-900 overflow-hidden">
          {filtered.length === 0 && !loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-3">
              <i className="fa-regular fa-folder-open text-teal-500 text-2xl opacity-40" />
              <span className="text-sm">No logs found.</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-[#1a3535]">
                    {TABLE_HEADERS.map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* ← Skeleton أو البيانات الحقيقية */}
                  {loading && logs.length === 0 ? (
                    <TableSkeleton rows={8} />
                  ) : (
                    paginatedRows.map((log, i) => (
                      <tr
                        key={log.id}
                        className="border-b border-[#1a3535] transition-colors hover:bg-[#1a3535]"
                        style={{ background: i % 2 === 0 ? "transparent" : "rgba(20,184,166,0.03)" }}
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Badge level={log.level} />
                        </td>
                        <td className="px-4 py-3 text-gray-100 font-medium whitespace-nowrap">
                          {log.attack}
                        </td>
                        <td className="px-4 py-3 font-mono text-teal-400 whitespace-nowrap">
                          {log.sourceIP}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-300 font-mono whitespace-nowrap">
                          {log.decoy || <span className="text-gray-600">—</span>}
                        </td>
                        <td className="px-4 py-3">
                          {log.payload ? (
                            <button
                              onClick={() => setSelectedLog(log)}
                              className="flex items-center gap-1.5 rounded-lg border border-teal-900 bg-gray-700 px-3 py-1.5 text-xs font-semibold text-teal-500 hover:bg-gray-600 hover:border-teal-600 transition-all cursor-pointer whitespace-nowrap"
                            >
                              <i className="fa-solid fa-code text-[10px]" />
                              View Payload
                            </button>
                          ) : (
                            <span className="text-gray-600 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center whitespace-nowrap">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-bold font-mono"
                            style={{
                              background: parseInt(log.totalAttacks) > 10 ? "rgba(226,75,74,0.15)" : "rgba(20,184,166,0.1)",
                              color: parseInt(log.totalAttacks) > 10 ? "#e24b4a" : "#14b8a6",
                            }}
                          >
                            {log.totalAttacks}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap font-mono">
                          {formatTime(log.timestamp)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ─── Pagination ─────────────────────────────────────────────────── */}
        {!loading && filtered.length > 0 && (
          <div className="flex justify-center items-center gap-4 py-6">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-gray-800 text-white text-sm font-semibold border border-[#2e4a48] hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <i className="fa-solid fa-chevron-left mr-1.5 text-xs" />
              Previous
            </button>
            <span className="text-sm text-gray-400 font-mono">
              Page <span className="text-white font-bold">{currentPage}</span> of{" "}
              <span className="text-white font-bold">{totalPages}</span>
            </span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-gray-800 text-white text-sm font-semibold border border-[#2e4a48] hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Next
              <i className="fa-solid fa-chevron-right ml-1.5 text-xs" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}