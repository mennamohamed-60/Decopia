import React from "react";
import { useNavigate } from "react-router-dom";
import logo4 from "../../assets/images/logo4.svg"
import { Link } from "react-router-dom";

export default function HomeNavbar() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="  border-gray-800 relative z-10 shadow-md">
        <div className="    max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center  space-x-3 rtl:space-x-reverse"
          >
            <img
              src={logo4}
              className="h-12 "
              alt="web trao Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
               Decopia
            </span>
          </Link>

          {/* Buttons */}
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              onClick={() => navigate("/login")}
              type="button"
              className="text-white bg-teal-500 hover:bg-teal-600 transition-colors duration-200 focus:outline-none  font-medium rounded-lg   text-base px-4 py-2 text-center cursor-pointer    w-32 "
            >
              Login
            </button>


            
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-300 rounded-lg md:hidden hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Navbar links */}
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-transparent bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-teal-600 hover:text-teal-700"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-gray-300 hover:text-teal-600"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-gray-300 hover:text-teal-600"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-gray-300 hover:text-teal-600"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav> 
    </>
  );
}
