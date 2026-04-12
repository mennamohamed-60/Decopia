import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const BASE = "https://decopia-management-system.runasp.net/api";

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const DECOY_NAMES = { 0: "Login Page", 1: "File Upload", 2: "Admin Panel" };
const DECOY_OPTIONS = [
  { value: 0, label: "Login Page" },
  { value: 1, label: "File Upload" },
  { value: 2, label: "Admin Panel" },
];

export default function CustomerDetailsModal({ publicId, onClose }) {
  const queryClient = useQueryClient();
  const [addingDecoy, setAddingDecoy] = useState(false);
  const [newDecoyType, setNewDecoyType] = useState(0);

  const { data: customer, isLoading } = useQuery({
    queryKey: ["customer", publicId],
    queryFn: async () => {
      const res = await axios.get(`${BASE}/customers/${publicId}`, {
        headers: authHeaders(),
      });
      return res.data;
    },
    enabled: !!publicId,
  });

  const { data: decoys = [], isLoading: decoysLoading } = useQuery({
    queryKey: ["decoys", publicId],
    queryFn: async () => {
      const res = await axios.get(`${BASE}/customers/${publicId}/decoys`, {
        headers: authHeaders(),
      });
      return res.data;
    },
    enabled: !!publicId,
  });

  const addDecoyMutation = useMutation({
    mutationFn: (payload) =>
      axios.post(`${BASE}/customers/${publicId}/decoys`, payload, {
        headers: authHeaders(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["decoys", publicId]);
      queryClient.invalidateQueries(["customers"]);
      setAddingDecoy(false);
    },
    onError: (err) => {
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Failed to add decoy",
        icon: "error",
        background: "#1f2937",
        color: "#f9fafb",
      });
    },
  });

  const deleteDecoyMutation = useMutation({
    mutationFn: (decoyId) =>
      axios.delete(`${BASE}/customers/${publicId}/decoys/${decoyId}`, {
        headers: authHeaders(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["decoys", publicId]);
      queryClient.invalidateQueries(["customers"]);
    },
  });

  const handleDeleteDecoy = async (decoyId) => {
    const result = await Swal.fire({
      title: "Remove decoy?",
      text: "Are you sure you want to remove this decoy?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "#f9fafb",
      iconColor: "#f87171",
    });
    if (!result.isConfirmed) return;
    deleteDecoyMutation.mutate(decoyId);
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
    });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-700">
          <h3 className="text-2xl font-bold text-white">Customer Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition text-2xl leading-none"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : customer ? (
          <div className="px-8 py-6 space-y-8">

            {/* Company Header */}
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-teal-700 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white text-3xl font-bold">
                  {customer.companyName?.trim().charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h4 className="text-white text-2xl font-bold">{customer.companyName}</h4>
                <p className="text-gray-400">{customer.industry}</p>
              </div>
              <span
                className={`ml-auto px-4 py-1.5 text-sm rounded-full font-semibold ${
                  customer.isActive
                    ? "bg-green-900/50 text-green-400 border border-green-700"
                    : "bg-red-900/50 text-red-400 border border-red-700"
                }`}
              >
                {customer.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            {/* Details Grid — 3 columns */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Subscription Plan", value: customer.subscriptionPlan, icon: "fa-briefcase" },
                { label: "Management Type", value: customer.managementType, icon: "fa-sliders" },
                { label: "Start Date", value: formatDate(customer.startDate), icon: "fa-calendar-day" },
                { label: "End Date", value: formatDate(customer.endDate), icon: "fa-calendar-check" },
                { label: "Contact Person", value: customer.contactPersonName, icon: "fa-user" },
                { label: "Contact Email", value: customer.contactEmail, icon: "fa-envelope" },
                { label: "Contact Phone", value: customer.contactPhone, icon: "fa-phone" },
              ].map(({ label, value, icon }) => (
                <div key={label} className="bg-gray-800 rounded-lg px-5 py-4 flex items-start gap-3">
                  <i className={`fa-solid ${icon} text-teal-500 mt-0.5 text-sm flex-shrink-0`} />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 mb-1">{label}</p>
                    <p className="text-sm font-semibold text-white break-words">{value || "—"}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Decoys Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-white font-semibold text-lg flex items-center gap-2">
                  <i className="fa-solid fa-shield-halved text-teal-500" />
                  Assigned Decoys
                </h5>
                <button
                  onClick={() => setAddingDecoy((v) => !v)}
                  className="flex items-center gap-2 text-sm px-4 py-2 bg-teal-700 hover:bg-teal-600 text-white rounded-lg transition"
                >
                  <i className="fa-solid fa-plus text-xs" />
                  Add Decoy
                </button>
              </div>

              {/* Add Decoy Form */}
              {addingDecoy && (
                <div className="flex items-center gap-3 bg-gray-800 border border-gray-600 rounded-lg px-5 py-4 mb-4">
                  <select
                    value={newDecoyType}
                    onChange={(e) => setNewDecoyType(Number(e.target.value))}
                    className="flex-1 bg-gray-700 text-white text-sm rounded-lg px-3 py-2 border border-gray-600 focus:outline-none focus:border-teal-500"
                  >
                    {DECOY_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => addDecoyMutation.mutate({ type: newDecoyType, isEnabled: true, configuration: "" })}
                    disabled={addDecoyMutation.isPending}
                    className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white text-sm rounded-lg transition disabled:opacity-50"
                  >
                    {addDecoyMutation.isPending ? <i className="fa-solid fa-spinner fa-spin" /> : "Confirm"}
                  </button>
                  <button
                    onClick={() => setAddingDecoy(false)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* Decoys List */}
              {decoysLoading ? (
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-10 bg-gray-700 rounded-lg w-32 animate-pulse" />
                  ))}
                </div>
              ) : decoys.length === 0 ? (
                <div className="flex items-center gap-3 text-gray-500 bg-gray-800/50 rounded-lg px-5 py-4">
                  <i className="fa-solid fa-shield text-gray-600" />
                  <p className="text-sm">No decoys assigned yet.</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {decoys.map((d) => (
                    <div
                      key={d.id}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm border ${
                        d.isEnabled
                          ? "bg-teal-900/40 border-teal-700 text-teal-300"
                          : "bg-gray-700 border-gray-600 text-gray-400"
                      }`}
                    >
                      <i className={`fa-solid fa-circle text-xs ${d.isEnabled ? "text-teal-400" : "text-gray-500"}`} />
                      <span className="font-medium">{DECOY_NAMES[d.type] ?? d.type}</span>
                      <button
                        onClick={() => handleDeleteDecoy(d.id)}
                        disabled={deleteDecoyMutation.isPending}
                        className="text-gray-400 hover:text-red-400 transition"
                        title="Remove"
                      >
                        <i className="fa-solid fa-xmark text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        ) : (
          <p className="text-gray-400 text-center py-10">Customer not found.</p>
        )}
      </div>
    </div>
  );
}