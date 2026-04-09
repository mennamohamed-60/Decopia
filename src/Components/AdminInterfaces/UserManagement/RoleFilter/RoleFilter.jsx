import React from "react";
import { FaFilter } from "react-icons/fa"; 

export default function RoleFilter({ roles, selectedRole, onChange }) {
  return (
    <div className="flex items-center space-x-2">
      
      <div className="flex items-center space-x-1 text-gray-700 dark:text-white">
        <FaFilter className="text-gray-500" />
        <span className="text-sm">Filter by role</span>
      </div>

      
      <select
        value={selectedRole}
        onChange={(e) => onChange(e.target.value)}
        className="w-30 bg-gray-50  text-gray-900 text-sm rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white border border-gray-300 focus:border-teal-500 focus:ring-teal-500"
      >
        
        <option value="All">All</option>
        {roles
          .filter((role) => role !== "All") 
          .map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
      </select>
    </div>
  );
}
