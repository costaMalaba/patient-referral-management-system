import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Component/Login";
import PatientRegister from "./Component/Patient_Register";
import DoctorRegister from "./Component/Doctor_register";
import DoctorDetails from "./Component/DoctorDetails";
import EditDoctor from "./Component/EditDoctor";
import Dashboard from "./Component/Dashboard/Dashboard";
import Home from "./Component/Dashboard/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/home",
        element: <Home />
      },
      {
        path: "/dashboard/view",
        element: <DoctorDetails />
      },
      {
        path: "/dashboard/doctor",
        element: <DoctorRegister />,
      },
      {
        path: "/dashboard/editDoctor/:id",
        element: <EditDoctor />,
      },
      
    ]
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
