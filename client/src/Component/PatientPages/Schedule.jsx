import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

const Schedule = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [hospitals, setHospitals] = useState([]);

  const [inputs, setInputs] = useState({
    schedule_id: uuid(),
    date: "",
    time: "",
    hospital: "",
    patient_id: id,
  });

  sessionStorage.setItem("schedule_id", inputs.schedule_id);
  sessionStorage.setItem("date", inputs.date);
  sessionStorage.setItem("time", inputs.time);
  sessionStorage.setItem("hospName", inputs.hospital);
  sessionStorage.setItem("patientName", `${data.surname + ", " + data.first_name + " " + data.middle_name}`);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8800/result/patient/${id}`)
      .then((res) => {
        setData(res.data.Result[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    getHospitals();
  }, []);

  const getHospitals = async () => {
    await axios
      .get("http://localhost:8800/hospital/get/all")
      .then((res) => {
        if (res.data.Status === "Success") {
          setHospitals(res.data.Result);
        }
      })
      .catch((err) => console.log(err));
  };

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  const currentTime = new Date().toISOString().slice(11, 16);

  return (
    <div className="conatiner p-5 m-5">
      <Link to="/dashboard/view/patient" className="px-0">
        <button className="btn btn-sm btn-lg btn-primary">BACK</button>
      </Link>

      <div className="row g-0">
        <div className="col-3"></div>
        <div className="card h-50 border-0 col-6">
          <div className="card-header bg-info">
            <h1 className="text-center fs-2 fw-bold">
              Schedule Appointment Here
            </h1>
          </div>
          <div className="card-body p-3 shadow-lg border-0 bg-light">
            <form className="form mx-5">
              <div className="col mb-5">
                <label htmlFor="patientName" className="form-label fw-bold">
                  Patient Name:
                </label>
                <input
                  type="text"
                  className="form-control text-uppercase"
                  id="patientName"
                  value={
                    data.surname +
                    ", " +
                    data.first_name +
                    " " +
                    data.middle_name
                  }
                  readOnly
                  required
                />
              </div>

              <div className="col mb-5">
                <label htmlFor="date" className="form-label fw-bold">
                  Date:
                </label>
                <input
                  type="date"
                  className="form-control"
                  min={today}
                  id="date"
                  name="date"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col mb-5">
                <label htmlFor="time" className="form-label fw-bold">
                  Time:
                </label>
                <input
                  type="time"
                  className="form-control"
                  defaultValue={currentTime}
                  min={currentTime}
                  id="time"
                  name="time"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col mb-5">
                <label htmlFor="hospital" className="form-label fw-bold">
                  Hospital:
                </label>
                <select
                  className="form-select"
                  id="hospital"
                  name="hospital"
                  onChange={handleChange}
                  required
                >
                  <option className="text-muted" defaultValue={"Uknown"}>
                    Select Here
                  </option>
                  {hospitals.map((hospital) => {
                    return (
                      <option
                        key={hospital.id}
                        value={hospital.name}
                        className="text-uppercase"
                      >
                        {hospital.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="text-center">
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center">
                    <li className="page-item">
                      <Link
                        to={`/dashboard/create/referral/${inputs.patient_id}`}
                        className="btn btn-info fw-bold btn-lg"
                      >
                        Add Reasons
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </form>
          </div>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default Schedule;
