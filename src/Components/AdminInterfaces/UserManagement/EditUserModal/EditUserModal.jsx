import axios from "axios";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

export default function EditUserModal({ isOpen, onClose, user, setUsers }) {
  const [loading, setLoading] = useState(false);
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
      await axios.put(`/api/users/${user.publicId}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUsers((prev) =>
        prev.map((u) =>
          u.publicId === user.publicId ? { ...u, ...updatedUser } : u,
        ),
      );

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
        <div className="relative bg-neutral-primary-soft rounded-sm rounded-base shadow-sm p-4 md:p-6 bg-gray-900">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-default pb-4">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-pen-to-square  fa-lg "></i>
              <h2 className="text-lg font-medium text-heading">Edit User</h2>
            </div>

            <button
              onClick={onClose}
              className="text-body hover:bg-neutral-tertiary rounded-base w-9 h-9 inline-flex justify-center items-center"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="pt-4">
            <div className="mb-4">
              <label className="block mb-2.5 text-sm font-medium text-heading">
                Full name
              </label>
              <input
                name="fullName"
                defaultValue={user.fullName}
                required
                className="bg-gray-50 text-gray-900 text-sm rounded-sm block w-full p-2.5 
                  focus:ring-1 
                  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white border border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2.5 text-sm font-medium text-heading">
                Role
              </label>
              <select
                name="role"
                defaultValue={user.role}
                className="bg-gray-50 text-gray-900 text-sm rounded-sm block w-full p-2.5 
                  focus:ring-1 
                  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white border border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              >
                <option value="Admin">Admin</option>
                <option value="customer">Customer</option>
                <option value="soc">Soc</option>
                <option value="security">Security</option>
                <option value="pen">Pen test</option>
                {/* <option value="threat">Threat Intelligence</option> */}
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
              </select>
            </div>

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                name="isActive"
                defaultChecked={user.isActive}
                style={{ accentColor: "#0d9488" }}
                className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium  appearance-auto  hover:cursor-pointer"
              />
              <label className="ms-2 text-sm font-medium text-heading">
                Active
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={` text-white font-medium rounded-sm text-sm px-5 py-2.5 text-center
                  ${
                    loading
                      ? "bg-teal-400 cursor-not-allowed"
                      : "bg-teal-600 hover:bg-teal-700"
                  }`}
            >
              {loading ? (
                <div className="flex justify-center">
                  <PulseLoader color="#ffffff" size={8} />
                </div>
              ) : (
                "Update User"
              )}
            </button>

            <button
              onClick={onClose}
              className="   text-white bg-red-400 hover:bg-red-700 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-red-600 font-medium rounded-sm text-sm px-5 py-2.5 text-center ms-3"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
