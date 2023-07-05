import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

const EditPatient = () => {
  const [data, setData] = useState([]);

  // const [error, setError] = useState(null);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8800/result/patient/` + id)
      .then((res) => {
        setData(res.data.Result[0]);
      })
      .catch((err) => console.log(err));
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8800/edit/patient/${id}`,
        data
      ).then(res => {
        if (res.data.Status === "Success") {
          navigate("/dashboard/view/patient");
        toast.success(res.data.Message);
        } else {
          navigate(`/dashboard/view/patient/edit/${id}`);
          toast.warning(res.data.Message);
        }
      })
    } catch (error) {
      console.error(error);
    }
  };

  console.log(data);

  return (
    <div className="conatiner p-5 m-5">
      <Link to="/dashboard/view/patient" className="px-0">
        <button className="btn btn-sm btn-lg btn-primary">BACK</button>
      </Link>
      <div className="col-12">
      <form onSubmit={handleSubmit} className="form text-center">
          <h1 className="login mb-3">Update Patient Here</h1>
          <div className="row g-5 mb-5">
            <div className="col-6">
              <label htmlFor="first_name" className="form-label fw-bold">
                First Name:
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="first_name"
                name="first_name"
                value={data.first_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-6">
              <label htmlFor="middle_name" className="form-label fw-bold">
                Middle Name:
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="middle_name"
                name="middle_name"
                value={data.middle_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row g-5 mb-5">
            <div className="col-6">
              <label htmlFor="surname" className="form-label fw-bold">
                Surname:
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="surname"
                name="surname"
                value={data.surname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-6">
              <label htmlFor="parent" className="form-label fw-bold">
                Patient/Gurdian:
              </label>
              <input
                type="text"
                className="form-control text-center"
                name="parent"
                id="parent"
                value={data.parent}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row g-5 mb-5">
          <div className="col-6">
              <label htmlFor="dob" className="form-label fw-bold">
                Date of Birth:
              </label>
              <input
                type="date"
                className="form-control text-center"
                name="dob"
                id="dob"
                value={moment(data.dob).format('YYYY-MM-DD')}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-6">
              <label htmlFor="sex" className="form-label fw-bold">
                Sex:
              </label>
              <select
                className="form-select text-center"
                id="sex"
                name="sex"
                value={data.sex}
                onChange={handleChange}
                required
              >
                <option className="text-muted" defaultValue={"Uknown"}>
                  Select Here
                </option>
                <option value={"M"}>MALE</option>
                <option value={"F"}>FEMALE</option>
              </select>
            </div>

            <div className="col-6">
              <label htmlFor="phone_no" className="form-label fw-bold">
                Phone Number:
              </label>
              <input
                type="text"
                placeholder="start with: 255"
                className="form-control text-center"
                id="phone_no"
                name="phone_no"
                value={data.phone_no}
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
                value={data.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-warning btn-lg fw-bold mt-4">
            EDIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPatient;
