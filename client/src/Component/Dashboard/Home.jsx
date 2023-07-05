import React, { useEffect, useState } from "react";
import { HospitalBarChart, PatientBarChart, DoctorBarChart, ScheduleBarChart } from "./Charts";
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
  const username = sessionStorage.getItem('username');
  const to = sessionStorage.getItem('to');
  const [hospitalCount, setHospitalCount] = useState();
  const [patientCount, setPatientCount] = useState();
  const [scheduleCount, setScheduleCount] = useState();
  const [referallCount, setReferallCount] = useState();

  const getHospitalCount = async () => {
    await axios.get("http://localhost:8800/hospital/count").then((res) => {
      setHospitalCount(res.data.Result[0].hospitals);
    });
  };

  const getPatientCount = async () => {
    await axios.get(`http://localhost:8800/patient/count?term=${username}`).then((res) => {
      setPatientCount(res.data.Result[0].patients);
    });
  };

  const getScheduleCount = async () => {
    await axios.get(`http://localhost:8800/schedule/count?term=${to}`).then((res) => {
      setScheduleCount(res.data.Result[0].schedules);
    });
  };

  const getReferralCount = async () => {
    await axios.get(`http://localhost:8800/referral/count?term=${to}`).then((res) => {
      setReferallCount(res.data.Result[0].referrals);
    });
  };

  useEffect(() => {
    getHospitalCount();
    getPatientCount();
    getScheduleCount();
    getReferralCount();
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
              <h2 className="text-center">{hospitalCount}</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="d-flex justify-content-around align-items-center p-3 bg-light rounded-3 border-secondary shadow-lg">
            <i className="bi bi-file-medical fs-1 text-info"></i>
            <div>
              <p className="fs-1">
                <strong>Referrals</strong>
              </p>
              <h2 className="text-center">{referallCount}</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
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
          <HospitalBarChart />
        </div>
        <div className="col-12 col-md-6 p-3">
          <DoctorBarChart />
        </div>
        <div className="col-12 col-md-6 p-3">
          <PatientBarChart />
        </div>
        <div className="col-12 col-md-6 p-3">
          <ScheduleBarChart />
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
