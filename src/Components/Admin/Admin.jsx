import React from "react";
import { Outlet } from "react-router-dom";
import userPhoto from "../../assets/images/user photo.jpg";
import logo from "../../assets/images/logo4.svg";
import { Link, NavLink } from "react-router-dom";
import LogoutButton from "../LogoutButton/LogoutButton";

export default function Admin() {
  return (
    <>
      <div className="bg-slate-950 min-h-screen">
        <nav className="fixed top-0 z-50 w-full  border-b  bg-slate-950 border-gray-700">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start rtl:justify-end">
                {/* side bar button responsive */}
                <button
                  data-drawer-target="logo-sidebar"
                  data-drawer-toggle="logo-sidebar"
                  aria-controls="logo-sidebar"
                  type="button"
                  className="inline-flex items-center p-2 text-sm  rounded-lg sm:hidden  focus:outline-none focus:ring-2        text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    />
                  </svg>
                </button>

                {/* logo and header */}
                <Link to="/admin" className="flex ms-2 md:me-24">
                  <img src={logo} className="h-8 me-3" alt=" Logo" />
                  <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                    Decopia
                  </span>
                </Link>
              </div>

              <div className="flex items-center">
                <div className="flex items-center ms-3  space-x-3">
                  {/* user photo */}

                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full cursor-pointer focus:ring-4  focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <img
                      className="w-8 h-8 rounded-full"
                      src={userPhoto}
                      alt="user photo"
                    />
                  </button>

                  {/* logout button */}

                 <LogoutButton></LogoutButton>

                  {/* user information */}
                  <div
                    className="z-50 hidden my-4 text-base list-none  divide-y  rounded-sm shadow-sm bg-gray-700 divide-gray-600"
                    id="dropdown-user"
                  >
                    <div className="px-4 py-3" role="none">
                      <p className="text-sm text-white" role="none">
                        Menna Mohamed
                      </p>
                      <p
                        className="text-sm font-medium  truncate text-gray-300"
                        role="none"
                      >
                        mm60@fayoum.edu.eg
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <aside
          id="logo-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-20  transition-transform -translate-x-full  border-r  sm:translate-x-0 bg-slate-950 border-slate-700"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-slate-950">
            <ul className="space-y-2 font-medium">
              <li>
                <NavLink
                  to=""
                  end
                  className="nav-link flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 group"
                >
                  <i className="fa-solid  fa-layer-group   w-5 h-5  transition duration-75 text-gray-400  group-hover:text-white"></i>
                  <span className="ms-3"> Admin Dashboard</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="customers"
                  className="nav-link flex items-center p-2  rounded-lg text-white hover:bg-gray-700 group"
                >
                  <i className="fa-solid fa-users shrink-0 w-5 h-5  transition duration-75 text-gray-400 group-hover:text-white"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Customers
                  </span>
                </NavLink>
              </li>

              {/* <li>
                <NavLink
                  to="soc"
                  className="nav-link flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 group"
                >
                  <i className="fa-solid fa-chart-simple shrink-0  w-5 h-5  transition duration-75 text-gray-400 group-hover:text-white"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">soc</span>
                </NavLink>
              </li> */}

              {/* <li>
                <NavLink
                  to="threat"
                  className="nav-link flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 group"
                >
                  <i className="fa-solid fa-shield-halved  shrink-0 w-5 h-5  transition duration-75 text-gray-400 group-hover:text-white  "></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Threat Intelligence
                  </span>
                </NavLink>
              </li> */}

              {/* <li>
                <NavLink
                  to="pen"
                  className="nav-link flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 group"
                >
                  <i className="fa-solid fa-bug shrink-0   w-5 h-5  transition duration-75 text-gray-400 group-hover:text-white"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Penetration Test
                  </span>
                </NavLink>
              </li> */}

              {/* <li>
                <NavLink
                  to="security"
                  className="nav-link flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 group"
                >
                  <i className="fa-solid fa-user-gear  shrink-0 w-5 h-5  transition duration-75 text-gray-400 group-hover:text-white"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Security Engineers
                  </span>
                </NavLink>
              </li> */}

              {/* <li>
                <NavLink
                  to="front"
                  className="nav-link flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 group"
                >
                  <i className="fa-solid fa-code  shrink-0 w-5 h-5  transition duration-75 text-gray-400 group-hover:text-white"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Frontend
                  </span>
                </NavLink>
              </li> */}

              {/* <li>
                <NavLink
                  to="back"
                  className="nav-link flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 group"
                >
                  <i className="fa-solid fa-database  shrink-0 w-5 h-5  transition duration-75 text-gray-400 group-hover:text-white"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">Backend</span>
                </NavLink>
              </li> */}

              <li>
                <NavLink
                  to="UserManagement"
                  className="nav-link flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 group"
                >
                  <i className="fa-solid fa-user  shrink-0 w-5 h-5  transition duration-75 text-gray-400 group-hover:text-white"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">User Management</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </aside>

        

        <div className="p-4 sm:ml-64">
          <div className="pt-15   ps-8 pe-8   ">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
}
