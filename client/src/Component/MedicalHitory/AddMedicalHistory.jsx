import React, { useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";

const AddMedicalHistory = () => {
    const { id } = useParams();
    const navigate = useNavigate();

  const [medicalHistoryData, setMedicalHistorydata] = useState({
    historyId: uuid(),
    patientId: id,
    medicalCondition: "",
    date: "",
    notes: "",
  });

  const handleChange = (e) => {
    setMedicalHistorydata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:8800/md_history/add', medicalHistoryData).then(res => {
            if(res.data.Status === "Success") {
                toast.success(res.data.Message);
                setTimeout(() => {
                    navigate(`/dashboard/add/history/profile/${id}`);
                },1500);
            } else {
                navigate(`/dashboard/add/history/${id}`);
            }
        })
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="conatiner p-5 m-5">
      <Link to="/dashboard/view/patient" className="px-0">
        <button className="btn btn-sm btn-lg btn-primary mb-3">BACK</button>
      </Link>
      <h1 className="mb-3 text-center text-warning fs-3">No Medical History Found</h1>
      <div className="col-12">
        <form onSubmit={handleSubmit} className="form card shadow-lg border-0 bg-light">
          <h1 className="login mb-3">Medical History Form</h1>
          <div className="row g-5 mb-5">
            <div className="col-3"></div>

            <div className="col-6">
              <label for="patient_id" className="form-label fw-bold">
                Patient ID:
              </label>
              <input
                type="text"
                className="form-control"
                id="patient_id"
                name="patient_id"
                value={id}
                required
              />
            </div>

            <div className="col-3"></div>

            <div className="col-3"></div>

            <div className="col-6">
            <label for="medicalCondition" className="form-label fw-bold">
                  Medical Condtion:
                </label>
                <select
                  className="form-select"
                  id="medicalCondition"
                  name="medicalCondition"
                  onChange={handleChange}
                  required
                >
                  <option selected defaultValue={"Uknown"} disabled>
                    Select Here
                  </option>
                  <option value={"Cardiovascular"}>Cardiovascular</option>
                  <option value={"Cancer"}>Cancer</option>
                  <option value={"Chronic obstructive pulmonary diseases (COPD)"}>Chronic obstructive pulmonary diseases (COPD)</option>
                  <option value={"Diabetes"}>Diabetes</option>
                  <option value={"Mental health"}>Mental health</option>
                </select>
              </div>

            <div className="col-3"></div>

            <div className="col-3"></div>

            <div className="col-6">
              <label for="date" className="form-label fw-bold">
                Date:
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-3"></div>

            <div className="col-3"></div>

            <div className="col-6">
              <label for="notes" className="form-label fw-bold">
                Notes:
              </label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                name="notes"
                id="notes"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="text-center p-3">
            <button type="submit" className="btn btn-success btn-lg fw-bold">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicalHistory;
