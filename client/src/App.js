import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Component/Login";
import PatientRegister from "./Component/Patient_Register";
import DoctorRegister from "./Component/Doctor_register";
import Dashboard from "./Component/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/register/patient",
    element: <PatientRegister />,
  },
  {
    path: "/register/doctor",
    element: <DoctorRegister />,
  },
]);

const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" theme="dark" />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
