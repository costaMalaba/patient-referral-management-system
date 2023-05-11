import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Component/Login";
import PatientRegister from "./Component/PatientPages/PatientRegister";
import EditPatient from "./Component/PatientPages/PatientEdit";
import DoctorRegister from "./Component/DoctorPages/DoctorRegister";
import DoctorDetails from "./Component/DoctorPages/DoctorDetails";
import PatientDetails from "./Component/PatientPages/PatientDetails"
import EditDoctor from "./Component/DoctorPages/EditDoctor";
import CreateReferral from "./Component/ReferralPages/CreateReferral";
import Dashboard from "./Component/Dashboard/Dashboard";
import Home from "./Component/Dashboard/Home";

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
        path: "/dashboard/view/patient",
        element: <PatientDetails />
      },
      {
        path: "/dashboard/view/patient/add",
        element: <PatientRegister />
      },
      {
        path: "/dashboard/view/patient/edit/:id",
        element: <EditPatient />
      },
      {
        path: "/dashboard/doctor",
        element: <DoctorRegister />,
      },
      {
        path: "/dashboard/editDoctor/:id",
        element: <EditDoctor />,
      },
      {
        path: "/dashboard/create/referral",
        element: <CreateReferral />,
      }
      
    ]
  }
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
