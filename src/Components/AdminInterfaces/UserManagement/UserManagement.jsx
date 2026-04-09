import AddUser from "./AddUser/AddUser";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditUserModal from "./EditUserModal/EditUserModal";
import { PulseLoader } from "react-spinners";
import RoleFilter from "./RoleFilter/RoleFilter";
import SearchInput from "./SearchInput/SearchInput";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const roles = [
    "All",
    "Admin",
    "Customer",
    "Soc",
    "Security",
    "Pen",
    "Frontend",
    "Backend",
  ];

  const filteredUsers = users
    .filter(
      (user) =>
        roleFilter === "All" ||
        (user.role && user.role.toLowerCase() === roleFilter.toLowerCase())
    )
    .filter((user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete user?",
      text: "Are you sure you want to delete this user? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "#f9fafb",
      iconColor: "#f87171",
      customClass: {
        popup: "rounded-lg shadow-lg",
        title: "text-lg font-bold",
        content: "text-sm",
        confirmButton: "px-4 py-2",
        cancelButton: "px-4 py-2",
      },
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUsers((prev) => prev.filter((u) => u.publicId !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "User has been deleted.",
        timer: 1500,
        showConfirmButton: false,
        background: "#1f2937",
        color: "#f9fafb",
        iconColor: "#34d399",

        customClass: {
          popup: "rounded-lg shadow-lg",
          title: "text-lg font-bold",
          content: "text-sm",
        },
      });
    } catch (err) {
      console.error("Delete failed", err);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete user.",
      });
    }
  };

  return (
    <>
      <h2 className="text-3xl mb-4  font-bold">User Management </h2>
      <AddUser></AddUser>

      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-900 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                {/* search */}
               <SearchInput onSearch={setSearchTerm} />
              </div>

              {/* filter */}
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <RoleFilter
                  roles={roles}
                  selectedRole={roleFilter}
                  onChange={setRoleFilter}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-center">
                      User name
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Email
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Role
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      States
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan="5" className="py-6">
                        <div className="flex justify-center">
                          <PulseLoader color="#0f766e" size={10} />
                        </div>
                      </td>
                    </tr>
                  )}

                  {!loading && users.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-4 py-6 text-center">
                        No users found
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    filteredUsers.map((user) => (
                      <tr
                        key={user.publicId}
                        className="border-b dark:border-gray-700 hover:bg-gray-600 transition"
                      >
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-gray-900 dark:text-white text-center"
                        >
                          {user.fullName}
                        </th>

                        <td className="px-4 py-3 text-center">{user.email}</td>

                        <td className="px-4 py-3 text-center">{user.role}</td>

                        <td className="px-4 py-3 text-center">
                          <span
                            className={`px-2 py-1 text-xs rounded-full
                             ${user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                          >
                            {user.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>

                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center gap-3">
                            <i
                              className="fa-solid fa-pen-to-square text-yellow-500 fa-lg cursor-pointer"
                              onClick={() => handleEdit(user)}
                            ></i>

                            <i
                              className="fa-solid fa-trash-can text-red-700 fa-lg cursor-pointer"
                              onClick={() => handleDelete(user.publicId)}
                            ></i>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <EditUserModal
        isOpen={isEditOpen}
        user={selectedUser}
        onClose={() => setIsEditOpen(false)}
        setUsers={setUsers}
      />
    </>
  );
}
