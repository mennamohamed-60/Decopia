import React, { useEffect } from "react";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function EditCustomerModal({ isOpen, onClose, publicId }) {
  const queryClient = useQueryClient();

  const schema = zod.object({
    companyName: zod
      .string()
      .nonempty("Company name is required")
      .min(3, "At least 3 characters"),
    industry: zod.string().nonempty("Industry is required"),
    subscriptionPlan: zod.string().nonempty("Plan is required"),
    startDate: zod.string().nonempty("Start date is required"),
    endDate: zod.string().nonempty("End date is required"),
    contactEmail: zod
      .string()
      .nonempty("Email is required")
      .email("Invalid email"),
    contactPhone: zod.string().nonempty("Phone is required"),
    contactPersonName: zod.string().nonempty("Contact person is required"),
    managementType: zod.string().nonempty("Please select a management type"),
    isActive: zod.boolean(),
  });

  // ─── Fetch customer by publicId ──────────────────────────────────────────
  const { data: customer, isLoading: fetching } = useQuery({
    queryKey: ["customer", publicId],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `https://decopia-management-system.runasp.net/api/customers/${publicId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    enabled: isOpen && !!publicId,
  });

  const { handleSubmit, register, formState, reset } = useForm({
    defaultValues: {
      companyName: "",
      industry: "",
      subscriptionPlan: "",
      startDate: "",
      endDate: "",
      contactEmail: "",
      contactPhone: "",
      contactPersonName: "",
      managementType: "0",
      isActive: true,
    },
    resolver: zodResolver(schema),
  });

  // ─── Populate form when customer data arrives ────────────────────────────
  useEffect(() => {
    if (customer) {
      reset({
        companyName: customer.companyName || "",
        industry: customer.industry || "",
        subscriptionPlan: customer.subscriptionPlan || "",
        startDate: customer.startDate ? customer.startDate.slice(0, 10) : "",
        endDate: customer.endDate ? customer.endDate.slice(0, 10) : "",
        contactEmail: customer.contactEmail || "",
        contactPhone: customer.contactPhone || "",
        contactPersonName: customer.contactPersonName || "",
        managementType: customer.managementType === "AdminManaged" ? "1" : "0",
        isActive: customer.isActive ?? true,
      });
    }
  }, [customer, reset]);

  const mutation = useMutation({
    mutationFn: (data) => {
      const token = localStorage.getItem("token");
      return axios.put(
        `https://decopia-management-system.runasp.net/api/customers/${publicId}`,
        {
          ...data,
          managementType: Number(data.managementType),
          startDate: new Date(data.startDate).toISOString(),
          endDate: new Date(data.endDate).toISOString(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
      queryClient.invalidateQueries(["customer", publicId]);
      setTimeout(() => { reset(); onClose(); }, 1500);
    },
    onError: () => {
      setTimeout(() => { mutation.reset(); }, 3000);
    },
  });

  function MyHandleSubmit(data) {
    mutation.mutate(data);
  }

  if (!isOpen) return null;

  const inputClass = (hasError) =>
    `bg-gray-600 text-white text-sm rounded-sm block w-full px-3 py-2 leading-6
     outline-none focus:outline-none focus:ring-1
     dark:placeholder-gray-400
     ${
       hasError
         ? "border border-red-900 focus:border-red-900 focus:ring-red-900"
         : "border border-gray-500 focus:border-teal-500 focus:ring-teal-500"
     }`;

  const ErrorMsg = ({ message }) =>
    message ? (
      <div className="flex justify-start items-center gap-2 m-1">
        <i className="fa-solid fa-circle-exclamation text-red-900"></i>
        <p className="text-red-900">{message}</p>
      </div>
    ) : null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-6 rounded-sm w-[800px] text-white max-h-[90vh] overflow-y-auto">

        {fetching ? (
          <div className="flex justify-center items-center py-16">
            <PulseLoader color="#0f766e" size={10} />
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit(MyHandleSubmit)}>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Company Information */}
              <div>
                <h3 className="flex font-mono items-center gap-2 text-xl font-extralight text-white mb-3">
                  <i className="fa-regular fa-building text-teal-400 text-xl"></i>
                  <span className="tracking-wide">Company Information</span>
                </h3>

                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Company Name
                  </label>
                  <input
                    {...register("companyName")}
                    className={inputClass(formState.errors.companyName)}
                    placeholder="Enter company name"
                  />
                  <ErrorMsg message={formState.errors.companyName?.message} />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-bold">Industry</label>
                  <input
                    {...register("industry")}
                    className={inputClass(formState.errors.industry)}
                    placeholder="Enter industry"
                  />
                  <ErrorMsg message={formState.errors.industry?.message} />
                </div>
              </div>

              {/* Subscription Details */}
              <div>
                <h3 className="flex font-mono items-center gap-2 text-xl font-extralight text-white mb-3">
                  <i className="fa-solid fa-briefcase text-teal-400 text-xl"></i>
                  <span className="tracking-wide">Subscription Details</span>
                </h3>

                <div>
                  <label className="block mb-2 text-sm font-bold">Plan</label>
                  <input
                    {...register("subscriptionPlan")}
                    className={inputClass(formState.errors.subscriptionPlan)}
                    placeholder="Enter subscription plan"
                  />
                  <ErrorMsg message={formState.errors.subscriptionPlan?.message} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-bold">Start Date</label>
                    <input
                      type="date"
                      {...register("startDate")}
                      className={inputClass(formState.errors.startDate)}
                    />
                    <ErrorMsg message={formState.errors.startDate?.message} />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-bold">End Date</label>
                    <input
                      type="date"
                      {...register("endDate")}
                      className={inputClass(formState.errors.endDate)}
                    />
                    <ErrorMsg message={formState.errors.endDate?.message} />
                  </div>
                </div>
              </div>
            </div>

            {/* Management & Control */}
            <div>
              <h3 className="flex font-mono items-center gap-2 text-xl font-extralight text-white mb-2">
                <i className="fa-solid fa-sliders text-teal-400 text-xl"></i>
                <span className="tracking-wide">Management & Control</span>
              </h3>

              <div className="flex items-center gap-10">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="0"
                    {...register("managementType")}
                    className="w-4 h-4 text-teal-500 bg-gray-400 border-gray-300 focus:ring-teal-500"
                  />
                  <span className="text-white text-m">Customer Control (Self-managed)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="1"
                    {...register("managementType")}
                    className="w-4 h-4 text-teal-500 bg-gray-400 border-gray-300 focus:ring-teal-500"
                  />
                  <span className="text-white text-m">Admin-Managed (Full Service)</span>
                </label>
              </div>

              <ErrorMsg message={formState.errors.managementType?.message} />
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="flex font-mono items-center gap-2 text-xl font-extralight text-white mb-2">
                <i className="fa-regular fa-address-card text-teal-400 text-xl"></i>
                <span className="tracking-wide">Contact Information</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-bold">Email</label>
                  <input
                    {...register("contactEmail")}
                    type="email"
                    className={inputClass(formState.errors.contactEmail)}
                    placeholder="Enter contact email"
                  />
                  <ErrorMsg message={formState.errors.contactEmail?.message} />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-bold">Phone</label>
                  <input
                    {...register("contactPhone")}
                    className={inputClass(formState.errors.contactPhone)}
                    placeholder="Enter phone number"
                  />
                  <ErrorMsg message={formState.errors.contactPhone?.message} />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-bold">Name</label>
                  <input
                    {...register("contactPersonName")}
                    className={inputClass(formState.errors.contactPersonName)}
                    placeholder="Enter contact person name"
                  />
                  <ErrorMsg message={formState.errors.contactPersonName?.message} />
                </div>
              </div>
            </div>

            {/* Status */}
            <div>
              <h3 className="flex font-mono items-center gap-2 text-xl font-extralight text-white mb-2">
                <i className="fa-solid fa-toggle-on text-teal-400 text-xl"></i>
                <span className="tracking-wide">Account Status</span>
              </h3>

              <div className="flex items-center gap-10">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="true"
                    {...register("isActive", { setValueAs: (v) => v === "true" })}
                    defaultChecked={customer?.isActive === true}
                    className="w-4 h-4 text-teal-500 bg-gray-400 border-gray-300 focus:ring-teal-500"
                  />
                  <span className="text-white text-m">Active</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="false"
                    {...register("isActive", { setValueAs: (v) => v === "true" })}
                    defaultChecked={customer?.isActive === false}
                    className="w-4 h-4 text-teal-500 bg-gray-400 border-gray-300 focus:ring-teal-500"
                  />
                  <span className="text-white text-m">Inactive</span>
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mb-0">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-700 px-4 py-2 rounded-sm"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 px-5 py-2 rounded-sm"
              >
                Save Changes
              </button>
            </div>

            {/* Status feedback */}
            <div className="flex flex-col items-center justify-center w-full gap-2 mt-2">
              {mutation.isPending && <PulseLoader color={"#0f766e"} size={10} />}

              {mutation.isSuccess && (
                <p className="text-teal-700 animate-fade-in">
                  Customer updated successfully
                </p>
              )}

              {mutation.isError && (
                <p className="text-red-700 animate-shake">
                  {mutation.error?.response?.data?.error || "Something went wrong"}
                </p>
              )}
            </div>

          </form>
        )}
      </div>
    </div>
  );
}