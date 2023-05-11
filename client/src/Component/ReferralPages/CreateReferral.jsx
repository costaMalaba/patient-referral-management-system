import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";
import Write from "../ReferralPages/Write";

const CreateReferral = () => {
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

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="conatiner p-5 m-5">
      <div className="col-12">
        <form onSubmit={handleSubmit} className="form">
          <h1 className="text-center">Patient Referral Form</h1> <br />
          <h2 className="text-primary text-start mb-4">Patient Information</h2>
          <div className="row g-5 mb-5">
            <div className="col-2">
              <label for="first_name" className="col-form-label fw-bold">
                First Name:
              </label>
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control text-center"
                id="first_name"
                name="first_name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-2">
              <label for="middle_name" className="col-form-label fw-bold">
                Middle Name:
              </label>
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control text-center"
                id="middle_name"
                name="middle_name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-2">
              <label for="surname" className="col-form-label fw-bold">
                Surname:
              </label>
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control text-center"
                id="surname"
                name="surname"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row g-5 mb-5">
            <div className="col-2">
              <label for="dob" className="col-form-label fw-bold">
                Date Of Birth:
              </label>
            </div>
            <div className="col-2">
              <input
                type="date"
                className="form-control text-center"
                name="dob"
                id="dob"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-2">
              <label for="age" className="col-form-label fw-bold">
                Age:
              </label>
            </div>
            <div className="col-2">
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

            <div className="col-2">
              <label for="gender" className="col-form-label fw-bold">
                Gender:
              </label>
            </div>
            <div className="col-2">
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
          </div>
          <div className="row g-5 mb-5">
            <div className="col-2">
              <label for="parent" className="col-form-label fw-bold">
                Parent/Gurdian:
              </label>
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control text-center"
                id="parent"
                name="parent"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row g-5 mb-5">
            <div className="col-2">
              <label for="address" className="col-form-label fw-bold">
                Address:
              </label>
            </div>
            <div className="col-2">
              <input
                type="text"
                placeholder="P.O.Box 145"
                className="form-control text-center"
                id="address"
                name="address"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row g-5 mb-5">
            <div className="col-2">
              <label for="region" className="col-form-label fw-bold">
                Region:
              </label>
            </div>
            <div className="col-2">
              <select
                className="form-select text-center"
                id="region"
                name="region"
                onChange={handleChange}
                required
              >
                <option selected defaultValue={"Uknown"} disabled>
                  Select Region
                </option>
                <option value={"Dar Es Salaam"}>Dar Es Salaam</option>
                <option value={"Mwanza"}>Mwanza</option>
                <option value={"Mtwara"}>Mtwara</option>
                <option value={"Arusha"}>Arusha</option>
              </select>
            </div>

            <div className="col-2">
              <label for="district" className="col-form-label fw-bold">
                District:
              </label>
            </div>
            <div className="col-2">
              <select
                className="form-select text-center"
                id="district"
                name="district"
                onChange={handleChange}
                required
              >
                <option selected defaultValue={"Uknown"} disabled>
                  Select District
                </option>
                <option value={"Ubungo"}>Ubungo</option>
                <option value={"Temeke"}>Temeke</option>
                <option value={"Nyamagana"}>Nyamagana</option>
                <option value={"Sengerema"}>Sengerema</option>
              </select>
            </div>

            <div className="col-2">
              <label for="village" className="col-form-label fw-bold">
                Village:
              </label>
            </div>
            <div className="col-2">
              <select
                className="form-select text-center"
                id="village"
                name="village"
                onChange={handleChange}
                required
              >
                <option selected defaultValue={"Uknown"} disabled>
                  Select Village
                </option>
                <option value={"Segerea"}>Segerea</option>
                <option value={"Chanika"}>Chanika</option>
                <option value={"Mikoroshini"}>Mikoroshini</option>
                <option value={"Igogo B"}>Igogo "B"</option>
              </select>
            </div>
          </div>
          <div className="row g-5 mb-5">
            <div className="col-2">
              <label for="phone_no" className="col-form-label fw-bold">
                Phone Number:
              </label>
            </div>
            <div className="col-2">
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
            <div className="col-2">
              <label for="phone_no_1" className="col-form-label fw-bold">
                Phone Number: <br /> <i>(Optional)</i>
              </label>
            </div>
            <div className="col-2">
              <input
                type="text"
                placeholder="eg. 075444.."
                className="form-control text-center"
                id="phone_no_1"
                name="phone_no_1"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row g-5 mb-5">
            <div className="col-2">
              <label for="org_name" className="col-form-label fw-bold">
                Referral made by: <br /> <i>(Name or Organization)</i>
              </label>
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control text-center"
                id="org_name"
                name="org_name"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <h2 className="text-primary text-start mb-4">Reason for Referral</h2>
          <div className="row g-5 mb-5">
            <div className="col-2">
              <label for="pa_prblm" className="col-form-label fw-bold">
                Problems the Patient Has:
              </label>
            </div>
            <div className="col-10">
              <Write />
            </div>
          </div>
          <div className="row g-5 mb-5">
            <div className="col-2">
              <label for="prlm_start" className="col-form-label fw-bold">
                When did the problem start:
              </label>
            </div>
            <div className="col-2">
              <select
                className="form-select text-center"
                id="prlm_start"
                name="prlm_start"
                onChange={handleChange}
                required
              >
                <option selected defaultValue={"Uknown"} disabled>
                  Select Here
                </option>
                <option value={"M"}>Wakati wa Kuzaliwa</option>
                <option value={"F"}>Baada ya Kuzaliwa</option>
              </select>
            </div>
          </div>
          <h2 className="text-primary text-start mb-4">Contact</h2>
          <div className="row g-5 mb-5">
            <div className="col-2">
              <label for="contact" className="col-form-label fw-bold">
                Phone No.:
              </label>
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control text-center"
                id="contact"
                name="contact"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row g-5 mb-5">
            <div className="col-2">
              <label for="email" className="col-form-label fw-bold">
                Email:
              </label>
            </div>
            <div className="col-2">
              <input
                type="email"
                className="form-control text-center"
                id="email"
                name="email"
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="text-center">
            <button className="btn btn-outline-success btn-lg fw-bold mt-4">
              Register
            </button>
            <button
              className="btn btn-outline-secondary ms-5 btn-lg fw-bold mt-4"
              onClick={handlePrint}
            >
              <i className="bi bi-printer-fill"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReferral;
