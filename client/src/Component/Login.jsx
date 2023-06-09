import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "./Images/PRMS.png";

const Login = () => {
  const [name, setName] = useState('');
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  sessionStorage.setItem('username', inputs.username);
  sessionStorage.setItem('to', name);
  const username = sessionStorage.getItem('username');

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
            username === "Admin" ? setName(null) : setName(res.data.Result[0].name)
            setTimeout(() => {
              navigate("/dashboard/home");
              toast.success(res.data.Message);
            }, 500);
          } else {
            toast.warning(res.data.Error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className="card border-0 card-1 shadow-lg">
            <div className="card-header p-0 m-0 text-center">
              <img className="card-img-top" src={logo} alt="Not found" style={{height: "14rem", width: "14rem"}}></img>
            </div>
            <div className="card-body py-5">
              <form onSubmit={handleSubmit} className="text-center">
                <div className="mb-5">
                  <input
                    type="text"
                    placeholder="Username"
                    className="form-control-lg text-center fw-bold border-top-0 border-start-0 border-end-0 border-success rounded"
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
                    className="form-control-lg text-center fw-bold border-top-0 border-start-0 border-end-0 border-success rounded"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </div>
                <button className="btn btn-outline-primary text-dark fw-bold mb-3 w-25">
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
