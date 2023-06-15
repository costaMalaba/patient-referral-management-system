import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

const Schedule = () => {
  const { id } = useParams();

  const [inputs, setInputs] = useState({
    schedule_id: uuid(),
    date: "",
    time: "",
    hospital: "",
    patient_id: `${id}`,
  });

  const [data, setData] = useState([]);

  // const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8800/result/patient/${id}`)
      .then((res) => {
        setData(res.data.Result[0]);
      })
      .catch((err) => console.log(err));
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8800/schedule/add",
        inputs
      );
      if (res.data.Status === "Success") {
        navigate("/dashboard/view/schedule");
        console.log(res);
        toast.success(res.data.Message);
      } else {
        navigate(`/dashboard/patient/schedule/` + id);
        console.log(res);
        toast.warning(res.data.Message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  console.log(inputs);

  const currentTime = new Date().toISOString().slice(11, 16);

  return (
    <div className="conatiner p-5 m-5">
      <Link to="/dashboard/view/patient" className="px-0">
        <button className="btn btn-sm btn-lg btn-primary">BACK</button>
      </Link>

      <div className="row">
        <div className="col-3"></div>
        <div className="card h-50 border-0 col-6">
          <div className="card-header p-0 m-0">
            <h1 className="text-center">Schedule Appointment Here</h1>
          </div>
          <div className="card-body p-3">
            <form onSubmit={handleSubmit} className="form mx-5">
              <div className="col mb-5">
                <label for="patientName" className="form-label fw-bold">
                  Patient Name:
                </label>
                <input
                  type="text"
                  className="form-control text-uppercase"
                  id="patientName"
                  // name="patientName"
                  value={
                    data.surname +
                    ", " +
                    data.first_name +
                    " " +
                    data.middle_name
                  }
                  // onChange={handleChange}
                  // required
                />
              </div>

              <div className="col mb-5">
                <label for="date" className="form-label fw-bold">
                  Date:
                </label>
                <input
                  type="date"
                  className="form-control"
                  min={today}
                  id="date"
                  name="date"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col mb-5">
                <label for="time" className="form-label fw-bold">
                  Time:
                </label>
                <input
                  type="time"
                  className="form-control"
                  defaultValue={currentTime}
                  min={currentTime}
                  id="time"
                  name="time"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col mb-5">
                <label for="hospital" className="form-label fw-bold">
                  Hospital:
                </label>
                <select
                  className="form-select"
                  id="hospital"
                  name="hospital"
                  onChange={handleChange}
                  required
                >
                  <option selected defaultValue={"Uknown"} disabled>
                    Select Here
                  </option>
                  <option value={"Amana"}>AMANA</option>
                  <option value={"Mwananyamala"}>MWANANYAMALA</option>
                  <option value={"Muhimbili"}>MUHIMBILI</option>
                  <option value={"Bugando"}>BUGANDO</option>
                </select>
              </div>

              <div className="text-center">
                <button className="btn btn-success btn-lg fw-bold mb-5">
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default Schedule;
