const Register = () => {
  return (
    <div className="container-fluid cover-1">
      <div className="text-primary text-center header-1">
        <h1 className="h-txt py-5">PRMS</h1>
      </div>

      <div className="row my-5">
        <div className="col-2"></div>

        <div className=" row col-8">
          <div className="card border-0 py-5 shadow-lg">
            <div className="card-body">
              <form className="text-center">
                <h1 className="login">Register Here</h1>
                <div className="mb-5 mt-5">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control-lg text-center fw-bold border-0 rounded-0"
                    id="name"
                    required
                  />
                </div>
                <div className="mb-5">
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
                  className="btn btn-outline-success btn-lg"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default Register;