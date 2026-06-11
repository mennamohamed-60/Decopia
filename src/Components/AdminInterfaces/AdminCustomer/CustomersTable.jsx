import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import CustomerDetailsModal from "./Customerdetailsmodal.jsx";
import EditCustomerModal from "./EditCustomerModal.jsx";

const ROWS_PER_PAGE = 6;
const BASE = "https://decopia-management-system.runasp.net/api";

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ─── Skeleton ────────────────────────────────────────────────────────────────
function TableSkeleton({ rows = 6 }) {
  return Array.from({ length: rows }).map((_, i) => (
    <tr key={i} className="border-b border-gray-700 animate-pulse">
      <td className="px-4 py-3"><div className="h-4 bg-gray-700 rounded w-32" /></td>
      <td className="px-4 py-3"><div className="h-4 bg-gray-700 rounded w-24 mx-auto" /></td>
      <td className="px-4 py-3"><div className="h-4 bg-gray-700 rounded w-28 mx-auto" /></td>
      <td className="px-4 py-3">
        <div className="flex gap-1 justify-center">
          <div className="h-5 bg-gray-700 rounded w-14" />
          <div className="h-5 bg-gray-700 rounded w-14" />
        </div>
      </td>
      <td className="px-4 py-3"><div className="h-6 bg-gray-700 rounded-full w-14 mx-auto" /></td>
      <td className="px-4 py-3"><div className="h-4 bg-gray-700 rounded w-20 mx-auto" /></td>
      <td className="px-4 py-3"><div className="w-8 h-8 bg-gray-700 rounded-lg mx-auto" /></td>
      <td className="px-4 py-3">
        <div className="flex gap-2 justify-center">
          <div className="w-8 h-8 bg-gray-700 rounded-lg" />
          <div className="w-8 h-8 bg-gray-700 rounded-lg" />
        </div>
      </td>
    </tr>
  ));
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CustomersTable() {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [editCustomer, setEditCustomer] = useState(null);
  const debounceRef = useRef(null);

  // Debounce search
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [searchTerm]);

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ["customers", debouncedSearch],
    queryFn: async () => {
      const url = debouncedSearch
        ? `${BASE}/customers/search?name=${encodeURIComponent(debouncedSearch)}`
        : `${BASE}/customers`;
      const res = await axios.get(url, { headers: authHeaders() });
      return res.data;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`${BASE}/customers/${id}`, { headers: authHeaders() }),
    onSuccess: () => queryClient.invalidateQueries(["customers"]),
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete customer?",
      text: "Are you sure you want to delete this customer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "#f9fafb",
      iconColor: "#f87171",
    });
    if (!result.isConfirmed) return;
    deleteMutation.mutate(id);
  };

  const totalPages = Math.ceil(customers.length / ROWS_PER_PAGE);
  const currentRows = customers.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
    });

  return (
    <>
      <h2 className="text-3xl mb-4 font-bold text-white">Customer Management</h2>

      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-900 relative shadow-md sm:rounded-lg overflow-hidden">

            {/* Search Bar */}
            <div className="flex items-center p-4 border-b border-gray-700">
              <div className="relative w-full md:w-1/2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="fa-solid fa-magnifying-glass text-gray-400 text-sm" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by company name..."
                  className="w-full pl-9 pr-4 py-2 bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:outline-none focus:ring-0 focus:border-teal-500 placeholder-gray-500 transition"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition"
                  >
                    <i className="fa-solid fa-xmark text-sm" />
                  </button>
                )}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                  <tr>
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3 text-center">Plan</th>
                    <th className="px-4 py-3 text-center">Industry</th>
                    <th className="px-4 py-3 text-center">Decoys</th>
                    <th className="px-4 py-3 text-center">Management</th>
                    <th className="px-4 py-3 text-center">End Date</th>
                    <th className="px-4 py-3 text-center">Details</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && <TableSkeleton rows={6} />}

                  {!isLoading && customers.length === 0 && (
                    <tr>
                      <td colSpan="8" className="py-16 text-center">
                        <div className="flex flex-col items-center gap-3 text-gray-500">
                          <i className="fa-regular fa-building text-4xl text-gray-600" />
                          <p className="text-sm">No customers found.</p>
                        </div>
                      </td>
                    </tr>
                  )}

                  {!isLoading && currentRows.map((c) => (
                    <tr
                      key={c.publicId}
                      className="border-b border-gray-700 hover:bg-gray-800 transition"
                    >
                      {/* Company */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">
                              {c.companyName?.trim().charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="font-semibold text-white">{c.companyName}</span>
                        </div>
                      </td>

                      {/* Plan */}
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-0.5 text-xs rounded-full bg-teal-900/50 text-teal-400 border border-teal-800">
                          {c.subscriptionPlan}
                        </span>
                      </td>

                      {/* Industry */}
                      <td className="px-4 py-3 text-center text-gray-300">{c.industry}</td>

                      {/* Decoys */}
                      <td className="px-4 py-3 text-center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {c.assignedDecoys?.length > 0 ? (
                            c.assignedDecoys.map((d, i) => (
                              <span key={i} className="px-2 py-0.5 text-xs rounded-full bg-gray-700 text-gray-300">
                                {d}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500 text-xs">None</span>
                          )}
                        </div>
                      </td>

                      {/* Management */}
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          c.managementType === "SelfManaged"
                            ? "bg-blue-900/50 text-blue-400 border border-blue-800"
                            : "bg-orange-900/50 text-orange-400 border border-orange-800"
                        }`}>
                          {c.managementType === "SelfManaged" ? "Self" : "Admin"}
                        </span>
                      </td>

                      {/* End Date */}
                      <td className="px-4 py-3 text-center text-gray-300">
                        {formatDate(c.endDate)}
                      </td>

                      {/* Details */}
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setSelectedId(c.publicId)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-lg transition mx-auto"
                          title="View Details"
                        >
                          <i className="fa-solid fa-eye text-teal-500 text-sm" />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setEditCustomer(c)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-700 hover:bg-yellow-600/30 rounded-lg transition"
                            title="Edit"
                          >
                            <i className="fa-solid fa-pen-to-square text-yellow-500 text-sm" />
                          </button>
                          <button
                            onClick={() => handleDelete(c.publicId)}
                            disabled={deleteMutation.isPending}
                            className="w-8 h-8 flex items-center justify-center bg-gray-700 hover:bg-red-600/30 rounded-lg transition disabled:opacity-50"
                            title="Delete"
                          >
                            <i className="fa-solid fa-trash-can text-red-500 text-sm" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {!isLoading && customers.length > 0 && (
              <div className="flex justify-center items-center gap-4 py-6">
                <button
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-white">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Details Modal */}
      {selectedId && (
        <CustomerDetailsModal
          publicId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}

      {/* Edit Modal */}
      {editCustomer && (
        <EditCustomerModal
          isOpen={!!editCustomer}
          publicId={editCustomer.publicId}
          onClose={() => setEditCustomer(null)}
        />
      )}
    </>
  );
}