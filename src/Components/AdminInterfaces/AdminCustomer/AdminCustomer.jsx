import React from "react";
import { useState } from "react";
import AddCustomerModal from "./AddCustomerModal";
import CustomerTable from "./CustomersTable";

export default function AdminCustomer() {
   const [openModal, setOpenModal] = useState(false);
  return (
    <>
     

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Customers</h2>
          <p className="text-gray-400 mt-2">Manage customer information</p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="text-white bg-teal-600 hover:bg-teal-700 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-teal-600 font-medium rounded-sm text-sm px-5 py-2.5 text-center"
        >
          <i className="fa-solid fa-plus me-2"></i>
          Add Customer
        </button>
      </div>

      <AddCustomerModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />


        <CustomerTable></CustomerTable>
    </>
  );
}
