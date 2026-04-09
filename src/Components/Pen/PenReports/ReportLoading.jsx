import React from "react";

export default function ReportLoading({ rows = 6 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <tr
          key={index}
          className="border-b border-gray-700 animate-pulse"
        >
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          </td>

          <td className="px-4 py-4 text-center">
            <div className="h-4 bg-gray-700 rounded w-10 mx-auto"></div>
          </td>

          <td className="px-4 py-4 text-center">
            <div className="h-4 bg-gray-700 rounded w-16 mx-auto"></div>
          </td>

          <td className="px-4 py-4 text-center">
            <div className="h-4 bg-gray-700 rounded w-16 mx-auto"></div>
          </td>

          <td className="px-4 py-4 text-center">
            <div className="h-8 bg-gray-700 rounded w-20 mx-auto"></div>
          </td>
        </tr>
      ))}
    </>
  );
}