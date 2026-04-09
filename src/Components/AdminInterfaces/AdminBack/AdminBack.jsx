import React from "react";
import BarChart from "../../../Charts/BarChart/BarChart";

export default function AdminBack() {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex items-center justify-center h-100 rounded-sm bg-gray-50 dark:bg-gray-800">
          <BarChart></BarChart>
        </div>

        <div className="flex items-center justify-center h-24 rounded-sm bg-gray-50 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>

        <div className="flex items-center justify-center h-24 rounded-sm bg-gray-50 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
      </div>

      <div className="flex items-center justify-center h-48 mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
      </div>

      {/* <div className="grid grid-cols-2 gap-4 ">
        <div className=" rounded-sm bg-gray-50 h-100 dark:bg-gray-800">
            <BarChart></BarChart>
        </div>



        <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
        <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
        <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
      </div> */}
      <div className="flex items-center justify-center h-48 mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
        <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
        <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
        <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
      </div>



    </>
  );
}
