import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Doctor_Register = () => {
  const [inputs, setInputs] = useState({
    first_name: "",
    middle_name: "",
    surname: "",
    specialization: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8800/api/doctor/register/",
        inputs
      );
      console.log(res);
      toast.success("Doctor Addedd Successfully!!");
    } catch (error) {
      //console.log(error);
      setError(error.response.data);
    }
  };

  console.log(inputs);

  return (
    <div className="container-fluid bg-light">

      <div className="row">
        <div className="col-1"></div>

        <div className="col-10">
          <div className="card border-0 py-5 shadow-lg my-5 bg-light">
            <div className="card-body">
              <form className="text-center">
                <h1 className="login mb-5">Register Doctor Here</h1>
                {error && toast.error(error)}
                <div className="row mb-5">
                  <div className="col-6">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-control-lg text-center fw-bold border-0"
                      id="first_name"
                      name="first_name"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-6">
                    <input
                      type="text"
                      placeholder="Middle Name"
                      className="form-control-lg text-center fw-bold border-0"
                      id="middle_name"
                      name="middle_name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-5">
                  <div className="col-6">
                    <input
                      type="text"
                      placeholder="Surname"
                      className="form-control-lg text-center fw-bold border-0"
                      id="surname"
                      name="surname"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-6">
                    <input
                      type="number"
                      min={0}
                      placeholder="Age"
                      className="form-control-lg text-center fw-bold border-0"
                      id="age"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-5">
                  <div className="col-6">
                    <select className="form-select form-select-lg w-100 text-center">
                      <option selected defaultValue={"Uknown"} disabled>
                        Gender
                      </option>
                      <option value={"M"}>MALE</option>
                      <option value={"F"}>FEMALE</option>
                    </select>
                  </div>

                  <div className="col-6">
                    <input
                      type="text"
                      placeholder="Phone Number eg. 075444.."
                      className="form-control-lg text-center fw-bold border-0"
                      id="phone_no"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-5">
                  <div className="col-6">
                    <input
                      type="text"
                      placeholder="Specialization"
                      className="form-control-lg text-center fw-bold border-0"
                      id="specialization"
                      name="specialization"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-6">
                    <input
                      type="text"
                      placeholder="Username"
                      className="form-control-lg text-center fw-bold border-0"
                      id="username"
                      name="username"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <input
                      type="password"
                      placeholder="Pasword"
                      className="form-control-lg text-center fw-bold border-0"
                      id="password"
                      name="password"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button
                  className="btn btn-outline-success btn-lg fw-bold"
                  onClick={handleSubmit}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-1"></div>
      </div>
    </div>
  );
};

export default Doctor_Register;
