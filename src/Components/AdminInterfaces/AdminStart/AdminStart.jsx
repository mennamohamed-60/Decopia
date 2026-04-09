import React from "react";

export default function AdminStart() {
  return (
    <>
      
          <h2 className="text-xl text-gray-50">
            Detection & Classification Accuracy:
          </h2>

          <div className="grid grid-cols-3 gap-6 mb-4 mt-5">


            <div className=" h-50 p-5 rounded-2xl  bg-gray-900">
              <div className="flex justify-between  items-center">
                <h3 className="text-xl text-gray-50">
                  Detection & Classification — Both correct
                </h3>
                <i class="fa-regular fa-circle-check fa-lg text-teal-500"></i>
              </div>

              <p className="text-gray-50 text-4xl font-semibold mt-4">70 %</p>

              <div className="w-full  rounded-full h-2.5 mb-2 mt-5 bg-gray-700">
                <div
                  className=" h-2.5 rounded-full bg-teal-500"
                  style={{ width: "70%" }}
                />
              </div>
            </div>




             <div className=" h-50 p-5 rounded-2xl  bg-gray-900">
              <div className="flex justify-between  items-center">
                <h3 className="text-xl text-gray-50">
                  Detection correct only
                </h3>
                
                <i class="fa-solid fa-exclamation fa-lg text-amber-400"></i>

                
              </div>

              <p className="text-gray-50 text-4xl font-semibold mt-4">20 %</p>

              <div className="w-full  rounded-full h-2.5 mb-2 mt-12 bg-gray-700">
                <div
                  className=" h-2.5 rounded-full bg-teal-500"
                  style={{ width: "20%" }}
                />
              </div>
            </div>


            <div className=" h-50 p-5 rounded-2xl  bg-gray-900">
              <div className="flex justify-between  items-center">
                <h3 className="text-xl text-gray-50">
                  Unknown / Failed
                </h3>
                
                <i class="fa-solid fa-viruses fa-lg text-rose-600"></i>
              </div>

              <p className="text-gray-50 text-4xl font-semibold mt-4">10 %</p>

              <div className="w-full  rounded-full h-2.5 mb-2 mt-12 bg-gray-700">
                <div
                  className=" h-2.5 rounded-full bg-teal-500"
                  style={{ width: "10%" }}
                />
              </div>
            </div>


          </div>
        
    </>
  );
}
