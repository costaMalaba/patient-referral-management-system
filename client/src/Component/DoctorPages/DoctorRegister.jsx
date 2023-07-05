import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import "bootstrap-icons/font/bootstrap-icons.css";

const Doctor_Register = () => {
  const [hospitals, setHospitals] = useState([]);

  const [inputs, setInputs] = useState({
    doctor_id: uuid(),
    hospital_id: "",
    first_name: "",
    middle_name: "",
    surname: "",
    specialization: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:8800/doctor/register',
        inputs
      );
      if (res.data.Status === "Success") {
        navigate("/dashboard/view");
        toast.success(res.data.Message);
      } else {
        navigate("/dashboard/doctor");
        toast.warning(res.data.Message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="conatiner p-5 m-5">
      <Link to="/dashboard/view" className="px-0">
        <button className="btn btn-sm btn-lg btn-primary">BACK</button>
      </Link>
      <div className="col-12">
        <form onSubmit={handleSubmit} className="form text-center">
          <h1 className="login mb-3">Doctor Registration Form</h1>
          <div className="row mb-5">
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
                Midlle Name:
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

          <div className="row mb-5">
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
          </div>

          <div className="row mb-5">
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
                <option className="text-muted" defaultValue={"Unknown"}>
                  Select Here
                </option>
                <option value={"M"}>MALE</option>
                <option value={"F"}>FEMALE</option>
              </select>
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

          <div className="row mb-5">
            <div className="col-6">
            <label htmlFor="hospital_id" className="form-label fw-bold">
                  Hospital:
                </label>
                <select
                  className="form-select text-center"
                  id="hospital_id"
                  name="hospital_id"
                  onChange={handleChange}
                  required
                >
                  <option className="text-muted" defaultValue={"Unknown"}>
                  Select Here
                </option>
                  {hospitals.map((hospital) => {
                    return (
                      <option
                        key={hospital.id}
                        value={hospital.id}
                        className="text-uppercase"
                      >
                        {hospital.name}
                      </option>
                    );
                  })}
                </select>
            </div>

            <div className="col-6">
            <label htmlFor="specialization" className="form-label fw-bold">
                Specialization:
              </label>
              <select
                className="form-select text-center"
                id="specialization"
                name="specialization"
                onChange={handleChange}
                required
              >
                <option className="text-muted" defaultValue={"Unknown"}>
                  Select Here
                </option>
                <option value={"Cardiology"}>Cardiology</option>
                <option value={"Dermatology"}>Dermatology</option>
                <option value={"Endocrinology"}>Endocrinology</option>
                <option value={"Gastroenterology"}>Gastroenterology</option>
                <option value={"Neurology"}>Neurology</option>
              </select>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-6">
            <label htmlFor="phone_no" className="form-label fw-bold">
                Phone Number:
              </label>
              <input
                type="text"
                placeholder="Start with: 255"
                className="form-control text-center"
                id="phone_no"
                name="phone_no"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button className="btn btn-outline-success btn-lg fw-bold mt-4">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Doctor_Register;
