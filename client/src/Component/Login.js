import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="container-fluid cover-1">
      <div className="text-primary text-center header-1">
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
              <form className="text-center">
                <h1 className="login">Login Here</h1>
                <div className="mb-5 mt-5">
                  <input
                    type="text"
                    placeholder="Username"
                    className="form-control-lg text-center fw-bold border-0 rounded-0"
                    id="username"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control-lg text-center fw-bold border-0 rounded-0"
                    id="password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-success btn-lg mb-3"
                >
                  Login
                </button> <br />
                <span className="fw-bold">Don't Have an Account? <Link to="/register">Register</Link></span>
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