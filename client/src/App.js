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
import Schedule from "./Component/PatientPages/Schedule";
import RegisterHospital from "./Component/HospitalPages/RegisterHospital";
import EditHospital from "./Component/HospitalPages/EditHospital";
import HospitalDetails from "./Component/HospitalPages/HospitalDetails";
import ScheduleDetails from "./Component/PatientPages/ScheduleDetails";
import EditSchedule from "./Component/PatientPages/EditSchedule";
import AddMedicalHistory from "./Component/MedicalHitory/AddMedicalHistory";
import MedicalHistoryProfile from "./Component/MedicalHitory/MedicalHistoryProfile";
import MedicalHistoryDetails from "./Component/MedicalHitory/MedicalHistoryDetails";
import ScheduleSentDetails from "./Component/PatientPages/ScheduleSentDetails";

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

      // Schedules Paths
      {
        path: "/dashboard/view/schedule",
        element: <ScheduleDetails />
      },
      {
        path: "/dashboard/view/schedule/sent",
        element: <ScheduleSentDetails />
      },
      {
        path: "/dashboard/schedule/edit/:id",
        element: <EditSchedule />
      },
      {
        path: "/dashboard/patient/schedule/:id",
        element: <Schedule />
      },

      // Patients Paths
      {
        path: "/dashboard/view/patient/add",
        element: <PatientRegister />
      },
      {
        path: "/dashboard/view/patient",
        element: <PatientDetails />
      },
      {
        path: "/dashboard/view/patient/edit/:id",
        element: <EditPatient />
      },

      // Doctors Paths
      {
        path: "/dashboard/doctor",
        element: <DoctorRegister />,
      },
      {
        path: "/dashboard/editDoctor/:id",
        element: <EditDoctor />,
      },

      // Hospitals Paths
      {
        path: "/dashboard/register/hospital",
        element: <RegisterHospital />
      },
      {
        path: "/dashboard/edit/hospital/:id",
        element: <EditHospital />,
      },
      {
        path: "/dashboard/view/hospital",
        element: <HospitalDetails />,
      },

      // Referrals Paths
      {
        path: "/dashboard/create/referral/:id",
        element: <CreateReferral />,
      },

      // Medical Hitories Paths
      {
        path: "/dashboard/add/history/:id",
        element: <AddMedicalHistory />,
      },
      {
        path: "/dashboard/history/view",
        element: <MedicalHistoryDetails />,
      },
      {
        path: "/dashboard/add/history/profile/:id",
        element: <MedicalHistoryProfile />,
      },
      
    ]
  }
]);

const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" theme="light" />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
