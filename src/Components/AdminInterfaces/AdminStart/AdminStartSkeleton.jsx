export default function AdminStartSkeleton() {
  const box = "bg-gray-800 animate-pulse rounded-xl";

  return (
    <div className="p-6 min-h-screen">
      {/* KPIs - SAME AS REAL CARDS */}
      <div className="mb-6">
        <div className="grid gap-6 p-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-gray-900 shadow-lg"
              style={{ minHeight: "160px" }}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div className={`${box} h-4 w-24`} />
                <div className={`${box} h-6 w-6 rounded-full`} />
              </div>

              {/* Value */}
              <div className={`${box} h-10 w-32 mb-6`} />
            </div>
          ))}
        </div>
      </div>

      {/* Title */}
      <div className={`${box} h-6 w-48 mb-6`} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
        <div className="bg-gray-900 p-6 rounded-xl shadow lg:col-span-2">
          <div className={`${box} h-6 w-40 mb-4`} />
          <div className={`${box} h-64 w-full`} />
        </div>

        
        <div className="bg-gray-900 p-6 rounded-xl shadow">
          <div className={`${box} h-6 w-40 mb-4`} />
          <div className={`${box} h-64 w-full`} />
        </div>

        <div className="bg-gray-900 p-6 rounded-xl shadow">
          <div className={`${box} h-6 w-40 mb-4`} />
          <div className={`${box} h-64 w-full`} />
        </div>
      </div>
    </div>
  );
}
