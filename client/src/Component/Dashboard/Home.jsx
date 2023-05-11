import React from "react";
import PieChart from "./Pichart";
import LineChart from "./Linechart";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const handleHospital = async () => {
    try {
      const res = await axios.get("http://localhost:8800/hospital");
      console.log(res);
    } catch (error) {
      toast.success("Error");
    }
  }

  return (
    <div className="p-5 bg-light">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-6 colmd-4 col-lg-3">
            <div className="d-flex justify-content-around align-items-center p-3 bg-light rounded-3 border-secondary shadow-lg">
              <i className="bi bi-hospital fs-1 text-success"></i>
              <div  className="btn" onClick={handleHospital}>
                <p className="fs-1">
                  <strong>Hospital</strong>
                </p>
                <h2 className="text-center">14</h2>
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
                <h2 className="text-center">59</h2>
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
                <h2 className="text-center">24</h2>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 colmd-4 col-lg-3">
            <div className="d-flex justify-content-around align-items-center p-3 bg-light rounded-3 border-secondary shadow-lg">
              <i className="bi bi-person-fill-add text-danger fs-1"></i>
              <div>
                <p className="fs-1">
                  <strong>Patients</strong>
                </p>
                <h2 className="text-center">45</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-8 p-3">
            <LineChart />
          </div>

          <div className="col-12 col-md-8 p-3">
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;