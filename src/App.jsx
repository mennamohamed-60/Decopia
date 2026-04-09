import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

import Home from "./Components/Home/Home.jsx";
import Login from "./Components/Login/Login.jsx";
import Admin from "./Components/Admin/Admin.jsx";
import Customer from "./Components/Customer/Customer.jsx";
import Soc from "./Components/Soc/Soc.jsx";
import Pen from "./Components/Pen/Pen.jsx";
import PenReports from "./Components/Pen/PenReports/PenReports.jsx";
import ReportPayloads from "./Components/Pen/PenReports/ReportPayloads/ReportPayloads.jsx";
import TestPayload from "./Components/Pen/TestPayload/TestPayload.jsx";

import Security from "./Components/Security/Security.jsx";
import Front from "./Components/Front/Front.jsx";
import Back from "./Components/Back/Back.jsx";

import AdminFront from "./Components/AdminInterfaces/AdminFront/AdminFront.jsx";
import AdminCustomer from "./Components/AdminInterfaces/AdminCustomer/AdminCustomer.jsx";
import AdminPen from "./Components/AdminInterfaces/AdminPen/AdminPen.jsx";
import AdminSecurity from "./Components/AdminInterfaces/AdminSecurity/AdminSecurity.jsx";
import AdminSoc from "./Components/AdminInterfaces/AdminSoc/AdminSoc.jsx";
import AdminBack from "./Components/AdminInterfaces/AdminBack/AdminBack.jsx";
import AdminStart from "./Components/AdminInterfaces/AdminStart/AdminStart.jsx";
import Threat from "./Components/AdminInterfaces/Threat/Threat.jsx";
import UserManagement from "./Components/AdminInterfaces/UserManagement/UserManagement.jsx";

import Layout from "./Components/Layout/Layout.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import AuthRoute from "./Components/AuthRoute/AuthRoute.jsx";
import Error from "./Components/Error/Error.jsx";


function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthRoute
          redirectByRole={{
            Admin: "/admin",
            frontend: "/front",
            backend: "/back",
            security: "/security",
            customer: "/customer",
            soc: "/soc",
            pen: "/pen",
          }}
        >
          <Home></Home>
        </AuthRoute>
      ),
    },
    {
      path: "/home",
      element: (
        <AuthRoute
          redirectByRole={{
            Admin: "/admin",
            frontend: "/front",
            backend: "/back",
            security: "/security",
            customer: "/customer",
            soc: "/soc",
            pen: "/pen",
          }}
        >
          <Home></Home>
        </AuthRoute>
      ),
    },

    {
      path: "/login",
      element: (
        <AuthRoute
          redirectByRole={{
            Admin: "/admin",
            frontend: "/front",
            backend: "/back",
            security: "/security",
            customer: "/customer",
            soc: "/soc",
            pen: "/pen",
          }}
        >
          <Login></Login>
        </AuthRoute>
      ),
    },

    {
      path: "/admin",
      element: (
        <ProtectedRoute allowedRoles={["Admin", "admin"]}>
          <Admin></Admin>
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <AdminStart></AdminStart>,
        },
        {
          path: "front",
          element: <AdminFront></AdminFront>,
        },
        {
          path: "back",
          element: <AdminBack></AdminBack>,
        },
        {
          path: "customers",
          element: <AdminCustomer></AdminCustomer>,
        },
        {
          path: "soc",
          element: <AdminSoc></AdminSoc>,
        },
        {
          path: "security",
          element: <AdminSecurity></AdminSecurity>,
        },
        {
          path: "pen",
          element: <AdminPen></AdminPen>,
        },
        {
          path: "threat",
          element: <Threat></Threat>,
        },
        {
          path: "UserManagement",
          element: <UserManagement></UserManagement>,
        },
      ],
    },

    {
      path: "",
      element: <Layout></Layout>,
      children: [
        {
          path: "/customer",
          element: (
            <ProtectedRoute allowedRoles={["customer"]}>
              <Customer></Customer>
            </ProtectedRoute>
          ),
        },
        {
          path: "/soc",
          element: (
            <ProtectedRoute allowedRoles={["soc"]}>
              <Soc></Soc>
            </ProtectedRoute>
          ),
        },
        {
          path: "/pen",
          element: (
            <ProtectedRoute allowedRoles={["pen"]}>
              <Pen></Pen>
            </ProtectedRoute>
          ),
        },
        {
          path: "/pen",
          element: (
            <ProtectedRoute allowedRoles={["pen"]}>
              <Pen></Pen>
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: <PenReports></PenReports>,
            },
            {
              path: "testpayload",
              element: <TestPayload></TestPayload>,
            },
            {
              path: "attack/:attackName",
              element: <ReportPayloads></ReportPayloads>,
            },
          ],
        },
        {
          path: "/security",
          element: (
            <ProtectedRoute allowedRoles={["security"]}>
              <Security></Security>
            </ProtectedRoute>
          ),
        },
        {
          path: "/front",
          element: (
            <ProtectedRoute allowedRoles={["frontend"]}>
              <Front></Front>
            </ProtectedRoute>
          ),
        },
        {
          path: "/back",
          element: (
            <ProtectedRoute allowedRoles={["backend"]}>
              <Back></Back>
            </ProtectedRoute>
          ),
        },
      ],
    },

    {
      path: "*",
      element: <Error></Error>,
    },
  ]);

  return (
    <>
      <div className="min-h-screen bg-slate-950 text-gray-50">
        <RouterProvider router={routes}></RouterProvider>
      </div>
    </>
  );
}

export default App;
