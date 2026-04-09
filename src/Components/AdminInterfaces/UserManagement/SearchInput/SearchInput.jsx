import React from "react";

export default function SearchInput({ onSearch }) {
  return (
    <form className="flex items-center">
  <label htmlFor="search" className="sr-only">
    Search
  </label>
  <div className="relative w-full">
   
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <i className="fa-solid fa-magnifying-glass text-gray-500 dark:text-gray-400"></i>
    </div>

    <input
      type="text"
      id="search"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-teal-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
      placeholder="Search by name"
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
</form>

  );
}
