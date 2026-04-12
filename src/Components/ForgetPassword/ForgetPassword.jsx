import React, { useState } from "react";
import axios from "axios";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";
import logo4 from "../../assets/images/logo4.svg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const emailSchema = zod.object({
    email: zod
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
  });

  const resetSchema = zod.object({
    code: zod.string().nonempty("Code is required"),
    newPassword: zod
      .string()
      .nonempty("Password is required")
      .min(5, "Password must be at least 5 characters"),
  });

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: formStateEmail,
  } = useForm({
    resolver: zodResolver(emailSchema),
  });

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: formStateReset,
  } = useForm({
    resolver: zodResolver(resetSchema),
  });

  function onSendEmail(data) {
    setLoading(true);
    setError(null);

    axios
      .post(
        "https://decopia-management-system.runasp.net/api/auth/forgot-password",
        {
          Email: data.email,
        },
      )
      .then(() => {
        setLoading(false);
        setEmail(data.email);
        setStep(2);

        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: "#1e2128",
          color: "#ffffff",
          iconColor: "#0f766e",
          customClass: {
            popup: "rounded-sm",
          },
        });

        Toast.fire({
          icon: "success",
          title: "Code sent to your email 📩",
        });
      })
      .catch((error) => {
        setLoading(false);

        const msg =
          error.response?.data?.message ||
          error.response?.data ||
          "Something went wrong";

        setError(msg);

        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  }

  function onResetPassword(data) {
    setLoading(true);
    setError(null);

    axios
      .post(
        "https://decopia-management-system.runasp.net/api/auth/reset-password",
        {
          Email: email,
          Code: data.code,
          NewPassword: data.newPassword,
        },
      )
      .then(() => {
        setLoading(false);
        setSuccess("Password reset successfully ");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((error) => {
        setLoading(false);

        const msg =
          error.response?.data?.message ||
          error.response?.data ||
          "Something went wrong";

        setError(msg);

        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  }

  return (
    <div className="bg-slate-950 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-sm p-6 rounded-sm bg-[#1e2128]">
        {/* HEADER */}
        <div className="flex justify-center m-1">
          <Link to={"/home"}>
            <img className="h-12" src={logo4} alt="logo" />
          </Link>
          <h5 className="text-4xl font-medium text-white">Decopia</h5>
        </div>

        <h2 className="text-neutral-400 text-center mt-2 text-xl mb-5">
          Forget Your Password ?
        </h2>

        {step === 1 && (
          <form onSubmit={handleSubmitEmail(onSendEmail)} className="space-y-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter email to receive reset code
            </label>
            <input
              {...registerEmail("email")}
              type="email"
              placeholder="enter your email"
              className={`bg-gray-50 text-gray-900 text-sm rounded-sm block w-full focus:ring-1 mb-0.5
              dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
              ${
                formStateEmail.errors.email
                  ? "border border-red-900 focus:border-red-900 focus:ring-red-900"
                  : "border border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              }`}
            />
            {formStateEmail.errors.email?.message && (
              <div className="flex justify-start items-center gap-2 mb-0.5  ">
                <i className="fa-solid fa-circle-exclamation text-red-900"></i>
                <p className="text-red-900">
                  {formStateEmail.errors.email?.message}
                </p>
              </div>
            )}
            <button
              type="submit"
              className="w-full text-white bg-teal-600 hover:bg-teal-700 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-teal-600 font-medium rounded-sm text-sm mt-4 px-5 py-2.5 text-center "
            >
              Send Code
            </button>
          </form>
        )}

        {step === 2 && (
          <form
            onSubmit={handleSubmitReset(onResetPassword)}
            className="space-y-4"
          >
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Reset Code
            </label>
            <input
              {...registerReset("code")}
              type="text"
              placeholder="enter code"
              className={`bg-gray-50 text-gray-900 text-sm rounded-sm block w-full mb-0.5
              focus:ring-1 
              dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
              ${
                formStateReset.errors.code
                  ? "border border-red-900 focus:border-red-900 focus:ring-red-900"
                  : "border border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              }`}
            />

            {formStateReset.errors.code?.message && (
              <div className="flex justify-start items-center gap-2 mb-0.5">
                <i className="fa-solid fa-circle-exclamation text-red-900"></i>
                <p className="text-red-900">
                  {formStateReset.errors.code?.message}
                </p>
              </div>
            )}

            <label
              htmlFor="email"
              className="block mb-2 mt-5  text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>

            <input
              {...registerReset("newPassword")}
              type="password"
              placeholder="enter new password"
              className={`bg-gray-50 text-gray-900 text-sm rounded-sm block w-full mb-0.5 
              focus:ring-1 
              dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
              ${
                formStateReset.errors.newPassword
                  ? "border border-red-900 focus:border-red-900 focus:ring-red-900"
                  : "border border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              }`}
            />

            {formStateReset.errors.newPassword?.message && (
              <div className="flex justify-start items-center gap-2 mt-0.5">
                <i className="fa-solid fa-circle-exclamation text-red-900"></i>
                <p className="text-red-900">
                  {formStateReset.errors.newPassword?.message}
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-teal-600 text-white p-2 mt-8 rounded"
            >
              Reset Password
            </button>
          </form>
        )}

        {loading && (
          <div className="flex justify-center mt-4">
            <PulseLoader color="#0f766e" size={10} />
          </div>
        )}

        {success && <p className="text-teal-700 text-center mt-3">{success}</p>}

        {error && (
          <div className="flex justify-center items-center gap-2 mt-3 animate-shake">
            <p className="text-red-900 text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="flex  justify-center">
          <Link
            to="/login"
            className="ms-2 text-sm font-medium hover:underline mt-5  text-teal-500"
          >
            <i className="fa-solid fa-arrow-left fa-s me-0.5"></i>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
