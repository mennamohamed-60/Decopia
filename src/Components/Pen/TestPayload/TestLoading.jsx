import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-gray-800 p-6 rounded-sm animate-pulse h-64"
        >
          <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
        </div>
      ))}
    </div>
  );
}