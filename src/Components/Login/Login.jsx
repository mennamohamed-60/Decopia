import React, { useState } from "react";
import logo4 from "../../assets/images/logo4.svg";
import { Link, useNavigate } from "react-router-dom";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { email } from "./../../../node_modules/zod/v4/classic/schemas";
import { schema } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data";
import { zodResolver } from "@hookform/resolvers/zod/src/zod";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import ForgetPassword from "../ForgetPassword/ForgetPassword";

export default function Login() {
  const [isSusses, setisSusses] = useState(false);
  const [isFaild, setisFaild] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const schema = zod.object({
    email: zod
      .string()
      .nonempty("email is required ")
      .email("Invalid email address"),

    password: zod
      .string()
      .nonempty("password is required ")
      .min(5, { message: "Password must be at least 8 characters" })
      // .regex(/[A-Z]/, {
      //   message: " must contain at least one uppercase letter",
      // })
      // .regex(/[a-z]/, {
      //   message: " must contain at least one lowercase letter",
      // })
      // .regex(/\d/, { message: " must contain a number" })
      // .regex(/[@$!%*?&]/, { message: " must contain a special character" }),
  });

  const { handleSubmit, register, formState } = useForm({
    resolver: zodResolver(schema),
    
  });

  function getRouteByRole(role) {
  const routes = {
    Admin: "/admin",
    admin: "/admin",
    frontend:"/front",
    backend:"/back",
    security:"/security",
    customer:"/customer",
    soc:"/soc",
    pen:"/pen",

    
  };

  return routes[role.toLowerCase()] || "/";
}

  function MyHandleSubmit(data) {
    
    setisLoading(true); 
    axios
      .post("https://decopia-management-system.runasp.net/api/auth/login", data)
      .then(function (x) {
        setisLoading(false);
        localStorage.setItem("token", x.data.token);
        localStorage.setItem("role", x.data.role);
        
        setisSusses(true);
        setTimeout(() => {
          navigate(getRouteByRole(x.data.role));
        }, 1000);
      })
      .catch((error) => {
        setisLoading(false);
        if (error.response) {
        setisFaild(error.response.data?.message || "Login failed");
      } else {
        setisFaild("Network or server error");
      }
        setTimeout(() => {
          setisFaild(null);
        }, 3000);
      })
      
  }

  return (
    <>
      <div className=" bg-slate-950  min-h-screen flex justify-center items-center">
        <div className="w-full max-w-sm p-4    rounded-sm shadow-sm sm:p-6 md:p-8 bg-[#1e2128]   ">
          <form
            className="space-y-6"
            action="#"
            onSubmit={handleSubmit(MyHandleSubmit)}
          >
            <div className="flex justify-center m-1">
              <Link to={"/home"}><img className="h-12" src={logo4} alt="logo" /> </Link>
              <h5 className="text-4xl font-medium  text-gray-900 dark:text-white">
                Decopia
              </h5>
            </div>
            <div className="text-neutral-400 text-center">
              <p>Login to your account to continue</p>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                {...register("email")}
                type="email"
                name="email"
                id="email"
                className={`bg-gray-50 text-gray-900 text-sm rounded-sm block w-full p-2.5 
                  focus:ring-1 
                  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
                  ${
                    formState.errors.email
                      ? "border border-red-900 focus:border-red-900 focus:ring-red-900"
                      : "border border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                  }`}
                placeholder="enter your email"
              />
              {formState.errors.email?.message && (
                <div className="flex justify-start items-center gap-2 m-1">
                  <i className="fa-solid fa-circle-exclamation text-red-900"></i>
                  <p className="text-red-900">
                    {formState.errors.email?.message}
                  </p>
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                {...register("password")}
                type="password"
                name="password"
                id="password"
                placeholder="enter your password"
                className={`bg-gray-50 text-gray-900 text-sm rounded-sm block w-full p-2.5 
                  focus:ring-1 
                  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
                  ${
                    formState.errors.password
                      ? "border border-red-900 focus:border-red-900 focus:ring-red-900"
                      : "border border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                  }`}
              />

              {formState.errors.password?.message && (
                <div className="flex justify-start items-center gap-2 m-1">
                  <i className="fa-solid fa-circle-exclamation text-red-900"></i>
                  <p className="text-red-900">
                    {formState.errors.password?.message}
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full text-white bg-teal-600 hover:bg-teal-700 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-teal-600 font-medium rounded-sm text-sm px-5 py-2.5 text-center "
            >
              Login to your account
            </button>

            

            {isLoading && (
              <div className=" flex justify-center items-center">
                <PulseLoader color={"#0f766e"} size={10} />
              </div>
            )}

            {isSusses && (
              <div className="flex justify-center items-center ">
                <p className="text-teal-700">welcomback...</p>
              </div>
            )}

            {isFaild && (
              <div className="flex justify-center items-center animate-shake">
                <p className="text-red-900">{isFaild}</p>
              </div>
            )}

            <div className="flex  justify-center">
              <Link
                to ="/forgetPassword"
                className="ms-2 text-sm font-medium hover:underline   text-teal-500"
              >
                Forget Password ?
              </Link>

              
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

