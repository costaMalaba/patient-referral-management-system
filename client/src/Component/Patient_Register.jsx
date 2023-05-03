const Patient_Register = () => {
  return (
    <div className="container-fluid bg-light">
      <div className="text-primary text-center header-1">
        <h1 className="h-txt py-5">PRMS</h1>
      </div>

      <div className="row">
        <div className="col-1"></div>

        <div className="col-10">
          <div className="card border-0 py-5 shadow-lg my-5">
            <div className="card-body">
              <form className="text-center">
                <h1 className="login mb-5">Register Patient Here</h1>
                <div className="row mb-5">
                  <div className="col-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-control-lg text-center fw-bold border-0"
                      id="first_name"
                      required
                    />
                  </div>

                  <div className="col-4">
                    <input
                      type="text"
                      placeholder="Middle Name"
                      className="form-control-lg text-center fw-bold border-0"
                      id="middle_name"
                      required
                    />
                  </div>

                  <div className="col-4">
                    <input
                      type="text"
                      placeholder="Surname"
                      className="form-control-lg text-center fw-bold border-0"
                      id="surname"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-5">
                  <div className="col-4">
                    <input
                      type="number"
                      min={0}
                      placeholder="Age"
                      className="form-control-lg text-center fw-bold border-0"
                      id="age"
                      required
                    />
                  </div>

                  <div className="col-4">
                    <select className="form-select form-select-lg w-100 text-center">
                      <option defaultValue={'Uknown'} disabled>
                        Gender
                      </option>
                      <option value={"M"}>MALE</option>
                      <option value={"F"}>FEMALE</option>
                    </select>
                  </div>

                  <div className="col-4">
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
                  <div className="col-4">
                    <input
                      type="text"
                      placeholder="Health Insurance ID"
                      className="form-control-lg text-center fw-bold border-0"
                      id="health_ins_id"
                      required
                    />
                  </div>

                  <div className="col-4"></div>

                  <div className="col-4"></div>
                </div>

                <button
                  type="submit"
                  className="btn btn-outline-success btn-lg fw-bold"
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

export default Patient_Register;
