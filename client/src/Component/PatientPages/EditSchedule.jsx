import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditSchedule = () => {
  const [data, setData] = useState([]);

  // const [error, setError] = useState(null);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    getSchedule();
  }, []);

  const getSchedule = () => {
    try {
      axios.get(`http://localhost:8800/schedule/view/${id}`).then(res => {
        setData(res.data.Result[0]);
      })
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8800/schedule/edit/` + id,
        data
      );
      if (res.data.Status === "Success") {
        navigate("/dashboard/view/schedule");
        console.log(res);
        toast.success(res.data.Message);
      } else {
        navigate(`/dashboard/schedule/edit/` + id);
        console.log(res);
        toast.warning(res.data.Message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  return (
    <div className="conatiner p-5 m-5">
      <Link to="/dashboard/view/schedule" className="px-0">
        <button className="btn btn-sm btn-lg btn-primary">BACK</button>
      </Link>

      <div className="row">
        <div className="col-3"></div>
        <div className="card h-50 border-0 col-6">
          <div className="card-header p-3 fw-bold">
            <h1 className="text-center">Edit Schedule Here</h1>
          </div>
          <div className="card-body p-3">
            <form onSubmit={handleSubmit} className="form mx-5">
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
                  value={moment(data.date).format("YYY-MM-DD")}
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
                  id="time"
                  name="time"
                  value={data.time}
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
                  value={data.hospital}
                  required
                >
                  <option defaultValue={"Uknown"} disabled>
                    Select Here
                  </option>
                  <option value={"Amana"}>AMANA</option>
                  <option value={"Mwananyamala"}>MWANANYAMALA</option>
                  <option value={"Muhimbili"}>MUHIMBILI</option>
                  <option value={"Seketule"}>SEKETULE</option>
                  <option value={"Bugando"}>BUGANDO</option>
                </select>
              </div>

              <div className="text-center">
                <button className="btn btn-warning btn-lg fw-bold mb-5">
                  Update
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

export default EditSchedule;
