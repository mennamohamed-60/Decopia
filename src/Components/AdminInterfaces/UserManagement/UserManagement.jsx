// import AddUser from "./AddUser/AddUser";
// import axios from "axios";
// import Swal from "sweetalert2";
// import EditUserModal from "./EditUserModal/EditUserModal";
// import { PulseLoader } from "react-spinners";
// import RoleFilter from "./RoleFilter/RoleFilter";
// import SearchInput from "./SearchInput/SearchInput";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";

// export default function UserManagement() {
//   const queryClient = useQueryClient();

//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [roleFilter, setRoleFilter] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");

//   const roles = [
//     "All",
//     "Admin",
//     "Customer",
//     "Soc",
//     "Security",
//     "Pen",
//     "Frontend",
//     "Backend",
//   ];

//   const {
//     data: users = [],
//     isLoading,
//     isFetching,
//   } = useQuery({
//     queryKey: ["users"],
//     staleTime: 1000 * 60 * 5,
//     queryFn: async () => {
//       const res = await axios.get(
//         "https://decopia-management-system.runasp.net/api/users",
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       return res.data;
//     },
//   });

//   const filteredUsers = users
//     .filter(
//       (user) =>
//         roleFilter === "All" ||
//         (user.role &&
//           user.role.toLowerCase() === roleFilter.toLowerCase())
//     )
//     .filter((user) =>
//       user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//   const handleEdit = (user) => {
//     setSelectedUser(user);
//     setIsEditOpen(true);
//   };

//   const deleteMutation = useMutation({
//     mutationFn: (id) => {
//       return axios.delete(
//         `https://decopia-management-system.runasp.net/api/users/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["users"]);
//     },
//   });

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: "Delete user?",
//       text: "Are you sure you want to delete this user?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#ef4444",
//       cancelButtonColor: "#6b7280",
//       confirmButtonText: "Delete",
//       cancelButtonText: "Cancel",
//       background: "#1f2937",
//       color: "#f9fafb",
//       iconColor: "#f87171",
//     });

//     if (!result.isConfirmed) return;

//     deleteMutation.mutate(id);
//   };

//   return (
//     <>
//       <h2 className="text-3xl mb-4 font-bold">User Management</h2>

//       <AddUser />

//       <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
//         <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
//           <div className="bg-white dark:bg-gray-900 relative shadow-md sm:rounded-lg overflow-hidden">

//             {/* search + filter */}
//             <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
//               <div className="w-full md:w-1/2">
//                 <SearchInput onSearch={setSearchTerm} />
//               </div>

//               <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3">
//                 <RoleFilter
//                   roles={roles}
//                   selectedRole={roleFilter}
//                   onChange={setRoleFilter}
//                 />
//               </div>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">

//                 <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                   <tr>
//                     <th className="px-4 py-3 text-center">User name</th>
//                     <th className="px-4 py-3 text-center">Email</th>
//                     <th className="px-4 py-3 text-center">Role</th>
//                     <th className="px-4 py-3 text-center">Status</th>
//                     <th className="px-4 py-3 text-center">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {isLoading && (
//                     <tr>
//                       <td colSpan="5" className="py-6">
//                         <div className="flex justify-center">
//                           <PulseLoader color="#0f766e" size={10} />
//                         </div>
//                       </td>
//                     </tr>
//                   )}

//                   {!isLoading && users.length === 0 && (
//                     <tr>
//                       <td colSpan="5" className="px-4 py-6 text-center">
//                         No users found
//                       </td>
//                     </tr>
//                   )}

//                   {!isLoading &&
//                     filteredUsers.map((user) => (
//                       <tr
//                         key={user.publicId}
//                         className="border-b dark:border-gray-700 hover:bg-gray-600 transition"
//                       >
//                         <td className="px-4 py-3 text-center text-white">
//                           {user.fullName}
//                         </td>

//                         <td className="px-4 py-3 text-center">
//                           {user.email}
//                         </td>

//                         <td className="px-4 py-3 text-center">
//                           {user.role}
//                         </td>

//                         <td className="px-4 py-3 text-center">
//                           <span
//                             className={`px-2 py-1 text-xs rounded-full ${
//                               user.isActive
//                                 ? "bg-green-100 text-green-700"
//                                 : "bg-red-100 text-red-700"
//                             }`}
//                           >
//                             {user.isActive ? "Active" : "Inactive"}
//                           </span>
//                         </td>

//                         <td className="px-4 py-3 text-center">
//                           <div className="flex justify-center gap-3">
//                             <i
//                               className="fa-solid fa-pen-to-square text-yellow-500 cursor-pointer"
//                               onClick={() => handleEdit(user)}
//                             />

//                             <i
//                               className="fa-solid fa-trash-can text-red-700 cursor-pointer"
//                               onClick={() => handleDelete(user.publicId)}
//                             />
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>

//               </table>
//             </div>

//           </div>
//         </div>
//       </section>

//       <EditUserModal
//         isOpen={isEditOpen}
//         user={selectedUser}
//         onClose={() => setIsEditOpen(false)}
//       />
//     </>
//   );
// }



import AddUser from "./AddUser/AddUser";
import axios from "axios";
import Swal from "sweetalert2";
import EditUserModal from "./EditUserModal/EditUserModal";
import RoleFilter from "./RoleFilter/RoleFilter";
import SearchInput from "./SearchInput/SearchInput";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const ROWS_PER_PAGE = 6;

function TableSkeleton({ rows = 6 }) {
  return Array.from({ length: rows }).map((_, i) => (
    <tr key={i} className="border-b dark:border-gray-700 animate-pulse">
      <td className="px-4 py-3 text-center">
        <div className="h-4 bg-gray-700 rounded w-32 mx-auto" />
      </td>
      <td className="px-4 py-3 text-center">
        <div className="h-4 bg-gray-700 rounded w-44 mx-auto" />
      </td>
      <td className="px-4 py-3 text-center">
        <div className="h-4 bg-gray-700 rounded w-20 mx-auto" />
      </td>
      <td className="px-4 py-3 text-center">
        <div className="h-6 bg-gray-700 rounded-full w-16 mx-auto" />
      </td>
      <td className="px-4 py-3 text-center">
        <div className="flex justify-center gap-3">
          <div className="w-4 h-4 bg-gray-700 rounded" />
          <div className="w-4 h-4 bg-gray-700 rounded" />
        </div>
      </td>
    </tr>
  ));
}

export default function UserManagement() {
  const queryClient = useQueryClient();

  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const res = await axios.get(
        "https://decopia-management-system.runasp.net/api/users",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    },
  });

  const filteredUsers = users
    .filter(
      (user) =>
        roleFilter === "All" ||
        (user.role && user.role.toLowerCase() === roleFilter.toLowerCase())
    )
    .filter((user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalPages = Math.ceil(filteredUsers.length / ROWS_PER_PAGE);
  const currentRows = filteredUsers.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleRoleChange = (role) => {
    setRoleFilter(role);
    setCurrentPage(1);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(
        `https://decopia-management-system.runasp.net/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete user?",
      text: "Are you sure you want to delete this user?",
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

  return (
    <>
      <h2 className="text-3xl mb-4 font-bold">User Management</h2>

      <AddUser />

      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-900 relative shadow-md sm:rounded-lg overflow-hidden">

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <SearchInput onSearch={handleSearch} />
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3">
                <RoleFilter
                  roles={roles}
                  selectedRole={roleFilter}
                  onChange={handleRoleChange}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-3 text-center">User name</th>
                    <th className="px-4 py-3 text-center">Email</th>
                    <th className="px-4 py-3 text-center">Role</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {isLoading && <TableSkeleton rows={6} />}

                  {!isLoading && filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-4 py-6 text-center">
                        No users found
                      </td>
                    </tr>
                  )}

                  {!isLoading &&
                    currentRows.map((user) => (
                      <tr
                        key={user.publicId}
                        className="border-b dark:border-gray-700 hover:bg-gray-600 transition"
                      >
                        <td className="px-4 py-3 text-center text-white">
                          {user.fullName}
                        </td>
                        <td className="px-4 py-3 text-center">{user.email}</td>
                        <td className="px-4 py-3 text-center">{user.role}</td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              user.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {user.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center gap-3">
                            <i
                              className="fa-solid fa-pen-to-square text-yellow-500 cursor-pointer"
                              onClick={() => handleEdit(user)}
                            />
                            <i
                              className="fa-solid fa-trash-can text-red-700 cursor-pointer"
                              onClick={() => handleDelete(user.publicId)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {!isLoading && filteredUsers.length > 0 && (
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

      <EditUserModal
        isOpen={isEditOpen}
        user={selectedUser}
        onClose={() => setIsEditOpen(false)}
      />
    </>
  );
}