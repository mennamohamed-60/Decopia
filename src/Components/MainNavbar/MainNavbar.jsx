import React from "react";
import { useState , useEffect } from "react";
import logo from "../../assets/images/logo4.svg";
import userPhoto from "../../assets/images/user photo.jpg";
import { Link } from "react-router-dom";
import LogoutButton from "../LogoutButton/LogoutButton";

export default function MainNavbar() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        setEmail(decoded.email);
      } catch (err) {
        console.error("Failed to decode JWT token:", err);
      }
    }
  }, []);
  return (
    <>
      <nav className="fixed top-0 z-50 w-full  border-b  bg-slate-950 border-gray-700 ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
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
                    <p
                      className="text-sm font-medium truncate text-gray-300"
                      role="none"
                    >
                      {email || "No email"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
