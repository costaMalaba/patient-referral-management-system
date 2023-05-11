import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:8800/login/auth/", inputs)
        .then((res) => {
          if (res.data.Status === "Success") {
            setTimeout(() => {
              navigate("/dashboard/home");
              toast.success(res.data.Message);
            }, 500);
          } else {
            toast.warning(res.data.Error);
          }
        });
      //console.log(res);
    } catch (error) {
      console.log(error);
      //setError(error.response.data)
    }
  };

  console.log(inputs);

  return (
    <div className="container-fluid cover-1">
      <div className="text-primary text-center shadow-lg rounded-bottom header-1">
        <h1 className="h-txt py-5">PRMS</h1>
      </div>

      <div className="txt text-center mt-4">
        <h1 className="welcome">Welcome</h1>
      </div>

      <div className="row my-5">
        <div className="col-3"></div>

        <div className="col-6">
          <div className="card border-0 py-5 shadow-lg">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="text-center">
                <h1 className="login">Login Here</h1>
                <div className="mb-5 mt-5">
                  <input
                    type="text"
                    placeholder="Username"
                    className="form-control-lg text-center fw-bold border-top-0 border-start-0 border-end-0 border-success rounded-0"
                    id="username"
                    name="username"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control-lg text-center fw-bold border-top-0 border-start-0 border-end-0 border-success rounded-0"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </div>
                <button className="btn btn-outline-success btn-lg fw-bold mb-3 w-25">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default Login;
