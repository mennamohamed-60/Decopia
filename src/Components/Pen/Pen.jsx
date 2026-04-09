import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function Pen() {
  const baseClasses =
    "inline-flex items-center justify-center p-4 border-b rounded-t-base group";

  const getClasses = (isActive) =>
    `${baseClasses} ${
      isActive
        ? "text-fg-brand border-brand  text-teal-500"
        : "text-body border-transparent hover:text-fg-brand hover:border-brand"
    }`;

  return (
    <>
      <div className="fixed top-14 w-full z-40 bg-slate-950">

        <div className="flex justify-center">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-body">
          
          {/* Reports */}
          <li className="me-2   hover:text-teal-500 text-gray-400">
            <NavLink
              to=""
              end
              className={({ isActive }) => getClasses(isActive)}
            >
              <svg
                className="w-4 h-4 me-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"
                />
              </svg>
              Reports
            </NavLink>
          </li>

          {/* Test Payload */}
          <li className="me-2 hover:text-teal-500 text-gray-400">
            <NavLink
              to="testpayload"
              className={({ isActive }) => getClasses(isActive)}
            >
              <svg
                className="w-4 h-4 me-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M6 4v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2m6-16v2m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v10m6-16v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2"
                />
              </svg>
              Test Payload
            </NavLink>
          </li>
        </ul>
      </div>
    
      </div>

      <Outlet />
    </>
  );
}
