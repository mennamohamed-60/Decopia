import axios from "axios";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import { useQueryClient } from "@tanstack/react-query";

export default function EditUserModal({ isOpen, onClose, user }) {
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  if (!isOpen || !user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target);

    const updatedUser = {
      fullName: formData.get("fullName"),
      role: formData.get("role"),
      isActive: formData.get("isActive") === "on",
    };

    try {
      await axios.put(
        `https://decopia-management-system.runasp.net/api/users/${user.publicId}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      queryClient.invalidateQueries(["users"]);

      onClose();
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative w-full max-w-md p-4">
        <div className="bg-gray-900 rounded-sm p-4 md:p-6">
          <div className="flex justify-between border-b pb-4">
            <h2 className="text-lg">Edit User</h2>
            <button onClick={onClose}>✕</button>
          </div>

          <form onSubmit={handleSubmit} className="pt-4">
            <input
              name="fullName"
              defaultValue={user.fullName}
              className="w-full p-2 mb-3 bg-gray-600 text-white border border-gray-500 rounded-md focus:outline-none focus:ring-0 focus:border-teal-500"
            />
            <select
              name="role"
              defaultValue={user.role}
              className="w-full p-2 mb-3 bg-gray-600 text-white border border-gray-500 rounded-md focus:outline-none focus:ring-0 focus:border-teal-500"
            >
              <option value="Admin">Admin</option>
              <option value="customer">Customer</option>
              <option value="soc">Soc</option>
              <option value="security">Security</option>
              <option value="pen">Pen test</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
            </select>

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                name="isActive"
                defaultChecked={user.isActive}
                style={{ accentColor: "#0d9488" }}
                className="w-4 h-4 border border-gray-400 rounded-sm bg-neutral-secondary-medium appearance-auto hover:cursor-pointer focus:outline-none focus:ring-0"
              />
              <label className="ms-2 text-sm font-medium text-heading">
                Active
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-teal-600 text-white px-4 py-2 rounded"
            >
              {loading ? <PulseLoader size={8} color="#fff" /> : "Update User"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="ml-3 bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
