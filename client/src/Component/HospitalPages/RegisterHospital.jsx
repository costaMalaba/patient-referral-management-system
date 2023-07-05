import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";
import { v4 as uuid } from "uuid";

const RegisterHospital = () => {
  const [inputs, setInputs] = useState({
    hos_id: uuid(),
    hos_name: "",
    hos_location: "",
    phone_no: "",
    email: "",
    address: "",
    url: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8800/hospital/add",
        inputs
      ).then(res => {
        if (res.data.Status === "Success") {
          toast.success(res.data.Message);
          setTimeout(() => {
            navigate("/dashboard/view/hospital");
          },1500)
        } else {
          toast.warning(res.data.Message);
          navigate("/dashboard/register/hospital");
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="conatiner p-5 m-5">
      <Link to="/dashboard/view/hospital" className="px-0">
        <button className="btn btn-sm btn-lg btn-primary">BACK</button>
      </Link>
      <div className="col-12">
        <form onSubmit={handleSubmit} className="form text-center">
          <h1 className="login mb-3">Hospital Registration Form</h1>
          <div className="row mb-5">
            <div className="col-6">
              <label htmlFor="hos_name" className="form-label fw-bold">
                Name:
              </label>
              <input
                type="text"
                className="form-control text-center text-uppercase"
                id="hos_name"
                name="hos_name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-6">
              <label htmlFor="hos_location" className="form-label fw-bold">
                Location:
              </label>
              <input
                type="text"
                className="form-control text-center text-uppercase"
                id="hos_location"
                name="hos_location"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-6">
              <label htmlFor="phone_no" className="form-label fw-bold">
                Phone Number:
              </label>
              <input
                type="text"
                placeholder="start with: 255.."
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

          <div className="row mb-5">
          <div className="col-6">
              <label htmlFor="address" className="form-label fw-bold">
                Address:
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="address"
                name="address"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-6">
              <label htmlFor="url" className="form-label fw-bold">
                Website URL: <i>(Optional)</i>
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="url"
                name="url"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label htmlFor="username" className="form-label fw-bold">
                Username:
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="username"
                name="username"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-6">
              <label htmlFor="password" className="form-label fw-bold">
                Password:
              </label>
              <input
                type="password"
                className="form-control text-center"
                id="password"
                name="password"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button className="btn btn-success btn-lg fw-bold mt-4">
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterHospital;
