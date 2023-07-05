import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";

const PatientRegister = () => {
  const [inputs, setInputs] = useState({
    pat_id: uuid(),
    first_name: "",
    middle_name: "",
    surname: "",
    hospUsername: sessionStorage.getItem('username'),
    parent: "",
    dob: "",
    sex: "",
    phone_no: "",
    email: "",
  });
  console.log(inputs)

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8800/patient/add/",
        inputs
      );
      if (res.data.Status === "Success") {
        navigate("/dashboard/view/patient");
        toast.success(res.data.Message);
      } else {
        navigate("/dashboard/view/patient/add");
        toast.warning(res.data.Message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="conatiner p-5 m-5">
      <Link to="/dashboard/view/patient" className="px-0">
        <button className="btn btn-sm btn-lg btn-primary">BACK</button>
      </Link>
      <div className="col-12">
        <form onSubmit={handleSubmit} className="form text-center">
          <h1 className="login mb-3">Patient Registration Form</h1>
          <div className="row g-5 mb-5">
            <div className="col-6">
              <label htmlFor="first_name" className="form-label fw-bold">
                First Name:
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="first_name"
                name="first_name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-6">
              <label htmlFor="middle_name" className="form-label fw-bold">
                Middle Name:
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="middle_name"
                name="middle_name"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row g-5 mb-5">
            <div className="col-6">
              <label htmlFor="surname" className="form-label fw-bold">
                Surname:
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="surname"
                name="surname"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-6">
              <label htmlFor="parent" className="form-label fw-bold">
                Patient/Gurdian:
              </label>
              <input
                type="text"
                className="form-control text-center"
                name="parent"
                id="parent"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row g-5 mb-5">
          <div className="col-6">
              <label htmlFor="dob" className="form-label fw-bold">
                Date of Birth:
              </label>
              <input
                type="date"
                className="form-control text-center"
                name="dob"
                id="dob"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-6">
              <label htmlFor="sex" className="form-label fw-bold">
                Sex:
              </label>
              <select
                className="form-select text-center"
                id="sex"
                name="sex"
                onChange={handleChange}
                required
              >
                <option className="text-muted" defaultValue={"Uknown"}>
                  Select Here
                </option>
                <option value={"M"}>MALE</option>
                <option value={"F"}>FEMALE</option>
              </select>
            </div>

            <div className="col-6">
              <label htmlFor="phone_no" className="form-label fw-bold">
                Phone Number:
              </label>
              <input
                type="text"
                placeholder="start with: 255"
                className="form-control text-center"
                id="phone_no"
                name="phone_no"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-6">
              <label htmlFor="email" className="form-label fw-bold">
                Email:
              </label>
              <input
                type="email"
                className="form-control text-center"
                id="email"
                name="email"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-outline-success btn-lg fw-bold mt-4">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientRegister;
