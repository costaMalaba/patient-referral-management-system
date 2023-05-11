import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";

const PatientRegister = () => {
  const [inputs, setInputs] = useState({
    first_name: "",
    middle_name: "",
    surname: "",
    age: "",
    gender: "",
    phone_no: "",
    health_id: "",
    email: "",
    status: "",
  });

  //const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePrint = () => {
    window.print();
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

  console.log(inputs);

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
              <label for="first_name" className="form-label fw-bold">
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
              <label for="middle_name" className="form-label fw-bold">
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
              <label for="surname" className="form-label fw-bold">
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
              <label for="age" className="form-label fw-bold">
                Age:
              </label>
              <input
                type="number"
                min={0}
                className="form-control text-center"
                name="age"
                id="age"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row g-5 mb-5">
            <div className="col-6">
              <label for="gender" className="form-label fw-bold">
                Gender:
              </label>
              <select
                className="form-select text-center"
                id="gender"
                name="gender"
                onChange={handleChange}
                required
              >
                <option selected defaultValue={"Uknown"} disabled>
                  Select Here
                </option>
                <option value={"M"}>MALE</option>
                <option value={"F"}>FEMALE</option>
              </select>
            </div>

            <div className="col-6">
              <label for="phone_no" className="form-label fw-bold">
                Phone Number:
              </label>
              <input
                type="text"
                placeholder="eg. 075444.."
                className="form-control text-center"
                id="phone_no"
                name="phone_no"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row g-5 mb-5">
            <div className="col-6">
              <label for="health_id" className="form-label fw-bold">
                Health Insuarance ID:
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="health_id"
                name="health_id"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-6">
              <label for="email" className="form-label fw-bold">
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

          <div className="row g-5">
            <div className="col-6">
              <label for="status" className="form-label fw-bold">
                Status:
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="status"
                name="status"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-6"></div>
          </div>

          <button className="btn btn-outline-success btn-lg fw-bold mt-4">
            Register
          </button>

          <button
            className="btn btn-outline-secondary ms-5 btn-lg fw-bold mt-4"
            onClick={handlePrint}
          >
            <i className="bi bi-printer-fill"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientRegister;
