// import { useState, useEffect } from "react";

// const ROWS_PER_PAGE = 6;

// const TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJlYjE2NGY1NC1hMzlkLTRlMzItODVlNi0wYmJhZjUzMDg3NDAiLCJyb2xlIjoiQWRtaW4iLCJlbWFpbCI6Im1lbm5hQGV4YW1wbGUuY29tIiwibmJmIjoxNzc4MDMyMzY5LCJleHAiOjE4MDk1NjgzNjksImlhdCI6MTc3ODAzMjM2OSwiaXNzIjoiRGVjb3BpYUFQSSIsImF1ZCI6IkRlY29waWFDbGllbnQifQ.Evj1tEDZQavdjjopEtsG7NYq_XUNxhiqF3zytIsqOPE";

// const authHeaders = {
//   Authorization: `Bearer ${TOKEN}`,
// };

// function RulesLoading({ rows }) {
//   return Array.from({ length: rows }).map((_, i) => (
//     <div
//       key={i}
//       className="flex items-center gap-10 border border-gray-600 p-4 rounded-lg mt-5 animate-pulse"
//     >
//       <div className="flex items-center gap-5 w-2/5">
//         <div className="bg-gray-700 w-12 h-12 rounded-lg flex-shrink-0" />
//         <div className="flex flex-col gap-2 flex-1">
//           <div className="h-4 bg-gray-700 rounded w-3/4" />
//           <div className="h-3 bg-gray-700 rounded w-1/2" />
//         </div>
//       </div>
//       <div className="flex items-center justify-between w-3/5">
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 bg-gray-700 rounded-full" />
//           <div className="flex flex-col gap-2">
//             <div className="h-3 bg-gray-700 rounded w-12" />
//             <div className="h-4 bg-gray-700 rounded w-20" />
//           </div>
//         </div>
//         <div className="flex flex-col gap-2">
//           <div className="h-3 bg-gray-700 rounded w-10" />
//           <div className="h-4 bg-gray-700 rounded w-16" />
//         </div>
//         <div className="flex flex-col gap-2">
//           <div className="h-3 bg-gray-700 rounded w-14" />
//           <div className="h-4 bg-gray-700 rounded w-14" />
//         </div>
//         <div className="w-10 h-10 bg-gray-700 rounded-lg" />
//       </div>
//     </div>
//   ));
// }

// export default function RulesTable() {
//   const [rules, setRules] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [downloadingId, setDownloadingId] = useState(null);

//   useEffect(() => {
//     const fetchRules = async () => {
//       try {
//         const res = await fetch(
//           "https://decopia-management-system.runasp.net/api/rules",
//           { headers: authHeaders }
//         );
//         if (!res.ok) throw new Error("Failed to fetch rules");
//         const data = await res.json();
//         setRules(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchRules();
//   }, []);

//   const totalPages = Math.ceil(rules.length / ROWS_PER_PAGE);
//   const currentRows = rules.slice(
//     (currentPage - 1) * ROWS_PER_PAGE,
//     currentPage * ROWS_PER_PAGE
//   );

//   const handleDownload = async (publicId, fileName) => {
//     setDownloadingId(publicId);
//     try {
//       const res = await fetch(
//         `https://decopia-management-system.runasp.net/api/rules/${publicId}/download`,
//         { headers: authHeaders }
//       );
//       if (!res.ok) throw new Error("Download failed");
//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = fileName;
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       alert("Download failed: " + err.message);
//     } finally {
//       setDownloadingId(null);
//     }
//   };

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="pt-10">
//       <section className="bg-gray-900 container m-auto rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold text-white mb-2">Rules Files</h2>

//         {error && (
//           <div className="mb-4 px-4 py-3 bg-red-900/40 border border-red-700 rounded-lg text-red-400 text-sm">
//             Error: {error}
//           </div>
//         )}

//         <div>
//           {isLoading ? (
//             <RulesLoading rows={6} />
//           ) : (
//             currentRows.map((rule) => (
//               <div
//                 key={rule.publicId}
//                 className="flex items-center gap-10 border border-gray-600 p-4 rounded-lg mt-5 hover:bg-gray-800 transition"
//               >
//                 {/* Left: icon + file name + date */}
//                 <div className="flex items-center gap-5 w-2/5 min-w-0">
//                   <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0">
//                     <i className="fa-regular fa-file-lines text-teal-500 text-3xl"></i>
//                   </div>
//                   <div className="min-w-0">
//                     <h2 className="font-bold text-white truncate">
//                       {rule.fileName}
//                     </h2>
//                     <p className="text-gray-400 text-sm">
//                       {formatDate(rule.uploadedAt)}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Right: uploader + size + category + download */}
//                 <div className="flex items-center justify-between w-3/5">
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
//                       <span className="text-white text-xs font-bold">
//                         {rule.uploadedBy?.trim().charAt(0).toUpperCase()}
//                       </span>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-400">Uploader</p>
//                       <p className="text-sm font-semibold text-white">
//                         {rule.uploadedBy}
//                       </p>
//                     </div>
//                   </div>

//                   <div>
//                     <p className="text-xs text-gray-400">Size</p>
//                     <p className="text-sm font-semibold text-white">
//                       {rule.fileSizeFormatted}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-gray-400">Category</p>
//                     <p className="text-sm font-semibold text-white">
//                       {rule.category}
//                     </p>
//                   </div>

//                   <button
//                     onClick={() => handleDownload(rule.publicId, rule.fileName)}
//                     disabled={downloadingId === rule.publicId}
//                     className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                     title="Download"
//                   >
//                     {downloadingId === rule.publicId ? (
//                       <i className="fa-solid fa-spinner fa-spin text-teal-500 text-lg"></i>
//                     ) : (
//                       <i className="fa-solid fa-download text-teal-500 text-xl"></i>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {!isLoading && rules.length > 0 && (
//           <div className="flex justify-center items-center gap-4 py-6">
//             <button
//               onClick={() => setCurrentPage((prev) => prev - 1)}
//               disabled={currentPage === 1}
//               className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
//             >
//               Previous
//             </button>

//             <span className="text-white">
//               Page {currentPage} of {totalPages}
//             </span>

//             <button
//               onClick={() => setCurrentPage((prev) => prev + 1)}
//               disabled={currentPage === totalPages}
//               className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }





import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const ROWS_PER_PAGE = 6;

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJiNDdkNGRhNC03OGEwLTQzODgtYTQwMi0yMTk3Y2UzNmE1ZjQiLCJyb2xlIjoic2VjdXJpdHkiLCJlbWFpbCI6ImZhcmFoQHNlY3VyaXR5LmNvbSIsIm5iZiI6MTc3ODE0NDUzMywiZXhwIjoxODA5NjgwNTMzLCJpYXQiOjE3NzgxNDQ1MzMsImlzcyI6IkRlY29waWFBUEkiLCJhdWQiOiJEZWNvcGlhQ2xpZW50In0.wRtpPwuq0XsLNbi1h9PXWAJ6CVVIzOhA6MXQuywyiX0";

const authHeaders = {
  Authorization: `Bearer ${TOKEN}`,
};

const fetchRules = async () => {
  const res = await fetch(
    "https://decopia-management-system.runasp.net/api/rules",
    { headers: authHeaders }
  );
  if (!res.ok) throw new Error("Failed to fetch rules");
  return res.json();
};

function RulesLoading({ rows }) {
  return Array.from({ length: rows }).map((_, i) => (
    <div
      key={i}
      className="flex items-center gap-10 border border-gray-600 p-4 rounded-lg mt-5 animate-pulse"
    >
      <div className="flex items-center gap-5 w-2/5">
        <div className="bg-gray-700 w-12 h-12 rounded-lg flex-shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 bg-gray-700 rounded w-3/4" />
          <div className="h-3 bg-gray-700 rounded w-1/2" />
        </div>
      </div>
      <div className="flex items-center justify-between w-3/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-700 rounded-full" />
          <div className="flex flex-col gap-2">
            <div className="h-3 bg-gray-700 rounded w-12" />
            <div className="h-4 bg-gray-700 rounded w-20" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-3 bg-gray-700 rounded w-10" />
          <div className="h-4 bg-gray-700 rounded w-16" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-3 bg-gray-700 rounded w-14" />
          <div className="h-4 bg-gray-700 rounded w-14" />
        </div>
        <div className="w-10 h-10 bg-gray-700 rounded-lg" />
      </div>
    </div>
  ));
}

export default function RulesTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [downloadingId, setDownloadingId] = useState(null);

  const { data: rules = [], isLoading, error } = useQuery({
    queryKey: ["rules"],
    queryFn: fetchRules,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  const totalPages = Math.ceil(rules.length / ROWS_PER_PAGE);
  const currentRows = rules.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  const handleDownload = async (publicId, fileName) => {
    setDownloadingId(publicId);
    try {
      const res = await fetch(
        `https://decopia-management-system.runasp.net/api/rules/${publicId}/download`,
        { headers: authHeaders }
      );
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Download failed: " + err.message);
    } finally {
      setDownloadingId(null);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="pt-10">
      <section className="bg-gray-900 container m-auto rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-white mb-2">Rules Files</h2>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-900/40 border border-red-700 rounded-lg text-red-400 text-sm">
            Error: {error.message}
          </div>
        )}

        <div>
          {isLoading ? (
            <RulesLoading rows={6} />
          ) : (
            currentRows.map((rule) => (
              <div
                key={rule.publicId}
                className="flex items-center gap-10 border border-gray-600 p-4 rounded-lg mt-5 hover:bg-gray-800 transition"
              >
                {/* Left: icon + file name + date */}
                <div className="flex items-center gap-5 w-2/5 min-w-0">
                  <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0">
                    <i className="fa-regular fa-file-lines text-teal-500 text-3xl"></i>
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-bold text-white truncate">
                      {rule.fileName}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {formatDate(rule.uploadedAt)}
                    </p>
                  </div>
                </div>

                {/* Right: uploader + size + category + download */}
                <div className="flex items-center justify-between w-3/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">
                        {rule.uploadedBy?.trim().charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Uploader</p>
                      <p className="text-sm font-semibold text-white">
                        {rule.uploadedBy}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Size</p>
                    <p className="text-sm font-semibold text-white">
                      {rule.fileSizeFormatted}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Category</p>
                    <p className="text-sm font-semibold text-white">
                      {rule.category}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDownload(rule.publicId, rule.fileName)}
                    disabled={downloadingId === rule.publicId}
                    className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Download"
                  >
                    {downloadingId === rule.publicId ? (
                      <i className="fa-solid fa-spinner fa-spin text-teal-500 text-lg"></i>
                    ) : (
                      <i className="fa-solid fa-download text-teal-500 text-xl"></i>
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {!isLoading && rules.length > 0 && (
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
      </section>
    </div>
  );
}