import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as zod from "zod";
import { useForm } from "react-hook-form";
// import { email } from "./../../../node_modules/zod/v4/classic/schemas";
import { schema } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data";
import { zodResolver } from "@hookform/resolvers/zod/src/zod";
import { PulseLoader } from "react-spinners";
import axios from "axios";

export default function AddUser() {
  const [isSusses, setisSusses] = useState(false);
  const [isFaild, setisFaild] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const schema = zod.object({
    fullName: zod
      .string()
      .nonempty("user name is required")
      .min(3, "at least 3 char")
      .max(25, "max 25 characters"),
    email: zod
      .string()
      .nonempty("email is required ")
      .email("Invalid email address"),
    role: zod
      .string()
      .nonempty("Role is required")
      .refine((val) => ["Admin","customer","soc","security","pen","frontend","backend",].includes(val), {
        message: "Invalid role selected",
      }),
  });

  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      role: "",
    },
    resolver: zodResolver(schema),
  });

  function MyHandleSubmit(data) {
    console.log(data);
    //------for test api -----
    const finalData = {
      ...data,
      "password": "123456",
    };
    // ---------------------------
    setisLoading(true);
    axios
      .post("https://decopia-management-system.runasp.net/api/users", finalData , {
        
        headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      })
      .then(function (x) {
        setisLoading(false);
        console.log(x.data.message);
        setisSusses(true);
        setTimeout(() => {
          navigate("/admin/UserManagement");
        }, 1000);
      })
      .catch(function (x) {
        setisLoading(false);
        setisFaild(x.response?.data?.error || "Something went wrong" );
        setTimeout(() => {
          setisFaild(null);
        }, 3000);
      });
  }

  return (
    <>
      
      <div className="p-6  mb-4 rounded-sm  bg-gray-900">
        <h4 className=" text-2xl font-semibold">Add New User</h4>
        <p className="mt-2">
          Create a new user account by providing their details and assigning a
          role{" "}
        </p>

        <form
          className="space-y-6 mt-5"
          action="#"
          onSubmit={handleSubmit(MyHandleSubmit)}
        >
          {/* inputs */}

          <div className="grid gap-6 mb-6 grid-cols-1 md:grid-cols-3">
            <div>
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                {...register("fullName")}
                type="text"
                id="fullName"
                className={`bg-gray-50 text-gray-900 text-sm rounded-sm block w-full p-2.5 
                  focus:ring-1 
                  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
                  ${
                    formState.errors.fullName
                      ? "border border-red-900 focus:border-red-900 focus:ring-red-900"
                      : "border border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                  }`}
                placeholder="Enter the user name"
              />

              {formState.errors.fullName?.message && (
                <div className="flex justify-start items-center gap-2 m-1">
                  <i className="fa-solid fa-circle-exclamation text-red-900"></i>
                  <p className="text-red-900">
                    {formState.errors.fullName?.message}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className={`bg-gray-50 text-gray-900 text-sm rounded-sm block w-full p-2.5 
                  focus:ring-1 
                  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
                  ${
                    formState.errors.email
                      ? "border border-red-900 focus:border-red-900 focus:ring-red-900"
                      : "border border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                  }`}
                placeholder="Enter user email"
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
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Role
              </label>

              <select
                {...register("role")}
                id="role"
                className={`bg-gray-50 text-gray-900 text-sm rounded-sm block w-full p-2.5 
                  focus:ring-1 
                  dark:bg-gray-600 dark:border-gray-500 dark:text-white
                  ${
                    formState.errors.role
                      ? "border border-red-900 focus:border-red-900 focus:ring-red-900"
                      : "border border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                  }`}
              >
                <option value="">Select role</option>
                <option value="Admin">Admin</option>
                <option value="customer">Customer</option>
                <option value="soc">Soc</option>
                <option value="security">Security</option>
                <option value="pen">Pen test</option>
                {/* <option value="threat">Threat Intelligence</option> */}
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
              </select>

              {formState.errors.role?.message && (
                <div className="flex justify-start items-center gap-2 m-1">
                  <i className="fa-solid fa-circle-exclamation text-red-900"></i>
                  <p className="text-red-900">
                    {formState.errors.role?.message}
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className=" text-white bg-teal-600 hover:bg-teal-700 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-teal-600 font-medium rounded-sm text-sm px-5 py-2.5 text-center "
          >
            Add User
          </button>

          {isLoading && (
            <div className=" flex justify-center items-center">
              <PulseLoader color={"#0f766e"} size={10} />
            </div>
          )}

          {isSusses && (
            <div className="flex justify-center items-center ">
              <p className="text-teal-700">User added Successfully</p>
            </div>
          )}

          {isFaild && (
            <div className="flex justify-center items-center animate-shake">
              <p className="text-red-900">{isFaild}</p>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
