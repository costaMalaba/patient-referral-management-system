import React, { useEffect, useState } from "react";
import { PatientBarChart, PieChart, DoctorBarChart } from "./Charts";
// import PieChart from "./PieChart";
// import { Link } from "react-router-dom";
//import { toast } from "react-toastify";
import axios from "axios";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import PatientForDashboard from "../../services/PatientForDashboard";
import ScheduleForDashboard from "../../services/ScheduleForDashboard";

ChartJS.register(
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
);

const Home = () => {
  const [patientCount, setPatientCount] = useState();
  const [scheduleCount, setScheduleCount] = useState();

  const getPatientCount = async () => {
    await axios.get("http://localhost:8800/patient/count").then((res) => {
      setPatientCount(res.data.Result[0].patients);
    });
  };

  const getScheduleCount = async () => {
    await axios.get("http://localhost:8800/schedule/count").then((res) => {
      setScheduleCount(res.data.Result[0].schedules);
    });
  };

  useEffect(() => {
    getPatientCount();
    getScheduleCount();
  }, []);

  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="d-flex justify-content-around align-items-center p-3 bg-light rounded-3 border-secondary shadow-lg">
            <i className="bi bi-hospital fs-1 text-success"></i>
            <div>
              <p className="fs-1">
                <strong>Hospital</strong>
              </p>
              <h2 className="text-center">0</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 colmd-4 col-lg-3">
          <div className="d-flex justify-content-around align-items-center p-3 bg-light rounded-3 border-secondary shadow-lg">
            <i className="bi bi-file-medical fs-1 text-info"></i>
            <div>
              <p className="fs-1">
                <strong>Referrals</strong>
              </p>
              <h2 className="text-center">0</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 colmd-4 col-lg-3">
          <div className="d-flex justify-content-around align-items-center p-3 bg-light rounded-3 border-secondary shadow-lg">
            <i className="bi bi-stopwatch fs-1 text-warning"></i>
            <div>
              <p className="fs-1">
                <strong>Schedules</strong>
              </p>
              <h2 className="text-center">{scheduleCount}</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="d-flex justify-content-around align-items-center p-3 bg-light rounded-3 border-secondary shadow-lg">
            <i className="bi bi-person-fill-add text-danger fs-1"></i>
            <div>
              <p className="fs-1">
                <strong>Patients</strong>
              </p>
              <h2 className="text-center">{patientCount}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-5">
        <h1>Real-time Report</h1>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 p-3">
          <PatientBarChart />
        </div>
        <div className="col-12 col-md-6 p-3">
          <PieChart />
        </div>
        <div className="">
          <PatientForDashboard />
        </div>
        <div className="">
          <ScheduleForDashboard />
        </div>
      </div>
    </div>
  );
};

export default Home;
