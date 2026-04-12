import { useState, useEffect, useCallback } from "react";

const API_BASE = "https://decopia-management-system.runasp.net/api";

function formatDate(dateStr) {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getPlanLabel(plan) {
  const plans = { 1: "Basic", 2: "Professional", 3: "Enterprise" };
  return plans[plan] || `Plan ${plan}`;
}

function getPlanColor(plan) {
  const p = parseInt(plan);
  if (p === 3) return { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)" };
  if (p === 2) return { color: "#60a5fa", bg: "rgba(96,165,250,0.12)", border: "rgba(96,165,250,0.3)" };
  return { color: "#14b8a6", bg: "rgba(20,184,166,0.12)", border: "rgba(20,184,166,0.3)" };
}

function getSubStatus(days) {
  if (days <= 0) return { label: "Expired", color: "#e24b4a", bg: "rgba(226,75,74,0.12)", border: "rgba(226,75,74,0.3)" };
  if (days <= 7) return { label: `${days}d left`, color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)" };
  return { label: `${days}d left`, color: "#14b8a6", bg: "rgba(20,184,166,0.12)", border: "rgba(20,184,166,0.3)" };
}

function Skeleton({ className }) {
  return <div className={`animate-pulse rounded bg-gray-700 ${className}`} />;
}

function InfoItem({ icon, label, value, loading }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#1a3535] border border-[#2e4a48] flex items-center justify-center">
        {loading ? (
          <Skeleton className="h-4 w-4 rounded" />
        ) : (
          <i className={`${icon} text-teal-500 text-sm`} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        {loading ? (
          <>
            <Skeleton className="h-2.5 w-16 mb-1.5" />
            <Skeleton className="h-4 w-28" />
          </>
        ) : (
          <>
            <p className="text-[11px] text-gray-500 font-medium">{label}</p>
            <p className="text-sm text-white font-semibold capitalize truncate">{value}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function CustomerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/customer/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setData(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  const info = data?.customerInfo;
  const decoys = data?.decoys || [];
  const sub = info ? getSubStatus(info.daysRemaining) : null;
  const plan = info ? getPlanColor(info.subscriptionPlan) : null;

  return (
    <div className="min-h-screen bg-slate-950 font-sans pt-6">
      <section className="container mx-auto mt-4 rounded-lg p-6 ">

        {/* ── Header ── */}
        

        {/* ── Profile Hero ── */}
        <div className="rounded-2xl bg-gray-900 p-6 mb-4">
          <div className="flex items-center gap-5 flex-wrap">

            {/* Avatar */}
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#1a3535] border-2 border-teal-500 flex items-center justify-center">
              {loading || !info
                ? <i className="fa-solid fa-user text-teal-500 text-2xl" />
                : <span className="text-2xl font-bold text-teal-400">
                    {info.contactPersonName?.charAt(0).toUpperCase()}
                  </span>
              }
            </div>

            {/* Name + email */}
            <div className="flex-1 min-w-0">
              {loading || !info ? (
                <>
                  <Skeleton className="h-5 w-48 mb-2" />
                  <Skeleton className="h-3 w-36" />
                </>
              ) : (
                <>
                  <h2 className="text-lg font-bold text-white truncate">{info.contactPersonName}</h2>
                  <p className="text-sm text-gray-400 truncate">{info.contactEmail}</p>
                </>
              )}
            </div>

            {/* Badges */}
            <div className="flex flex-col items-end gap-2">
              {loading || !info ? (
                <>
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </>
              ) : (
                <>
                  <span style={{ background: plan.bg, color: plan.color, border: `1.5px solid ${plan.border}`, fontSize: 12, fontWeight: 700, padding: "4px 14px", borderRadius: 999, fontFamily: "monospace" }}>
                    <i className="fa-solid fa-crown mr-1.5 text-[10px]" />
                    {getPlanLabel(info.subscriptionPlan)}
                  </span>
                  <span style={{ background: sub.bg, color: sub.color, border: `1.5px solid ${sub.border}`, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, fontFamily: "monospace" }}>
                    <i className="fa-solid fa-clock mr-1 text-[10px]" />
                    {sub.label}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── Two column grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Company Info */}
          <div className="rounded-2xl bg-gray-900 p-5">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <i className="fa-solid fa-building text-teal-500" />
              Company Info
            </h3>
            <div className="flex flex-col gap-4">
              <InfoItem icon="fa-solid fa-building" label="Company Name" value={info?.companyName} loading={loading || !info} />
              <InfoItem icon="fa-solid fa-industry" label="Industry" value={info?.industry} loading={loading || !info} />
            </div>
          </div>

          {/* Subscription Dates */}
          <div className="rounded-2xl bg-gray-900 p-5">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <i className="fa-solid fa-calendar-days text-teal-500" />
              Subscription
            </h3>
            <div className="flex flex-col gap-4">
              <InfoItem icon="fa-solid fa-calendar-check" label="Start Date" value={formatDate(info?.startDate)} loading={loading || !info} />
              <InfoItem icon="fa-solid fa-calendar-xmark" label="End Date" value={formatDate(info?.endDate)} loading={loading || !info} />
            </div>
          </div>

          {/* Decoys — full width */}
          <div className="rounded-2xl bg-gray-900 p-5 md:col-span-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <i className="fa-solid fa-crosshairs text-teal-500" />
              Decoys
              {!loading && data && (
                <span className="ml-auto text-[11px] font-mono text-gray-500">
                  {decoys.filter((d) => d.isEnabled).length} / {decoys.length} active
                </span>
              )}
            </h3>

            {loading && !data ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-[#2e4a48] bg-gray-800 px-4 py-3 animate-pulse">
                    <Skeleton className="h-9 w-9 rounded-lg flex-shrink-0" />
                    <div className="flex-1">
                      <Skeleton className="h-3 w-24 mb-1.5" />
                      <Skeleton className="h-2.5 w-16" />
                    </div>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                ))}
              </div>
            ) : decoys.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500 gap-2">
                <i className="fa-regular fa-folder-open text-teal-500 text-2xl opacity-40" />
                <span className="text-sm">No decoys configured.</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {decoys.map((decoy, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-[#2e4a48] bg-gray-800 px-4 py-3 hover:bg-[#1a3535] transition-colors"
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#1a3535] border border-[#2e4a48] flex items-center justify-center">
                      <i className="fa-solid fa-shield-virus text-teal-500 text-sm" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-semibold truncate">{decoy.type}</p>
                      <p className="text-[11px] text-gray-500">Honeypot decoy</p>
                    </div>
                    <span style={{
                      background: decoy.isEnabled ? "rgba(20,184,166,0.12)" : "rgba(107,114,128,0.15)",
                      color: decoy.isEnabled ? "#14b8a6" : "#6b7280",
                      border: `1.5px solid ${decoy.isEnabled ? "rgba(20,184,166,0.3)" : "rgba(107,114,128,0.3)"}`,
                      fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, fontFamily: "monospace", flexShrink: 0,
                    }}>
                      {decoy.isEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}