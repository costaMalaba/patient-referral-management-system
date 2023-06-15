import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditPatient = () => {
  const [data, setData] = useState({
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
        setData({
          ...data,
          first_name: res.data.Result[0].first_name,
          middle_name: res.data.Result[0].middle_name,
          surname: res.data.Result[0].surname,
          age: res.data.Result[0].age,
          gender: res.data.Result[0].gender,
          phone_no: res.data.Result[0].phone_no,
          health_id: res.data.Result[0].health_id,
          email: res.data.Result[0].email,
          status: res.data.Result[0].status,
        });
      })
      .catch((err) => console.log(err));
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8800/edit/patient/` + id,
        data
      );
      navigate("/dashboard/view/patient");
      console.log(res);
      toast.success("Patient Updated Successfully!!");
    } catch (error) {
      console.log(error);
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
              <label for="first_name" className="form-label fw-bold">
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
              <label for="middle_name" className="form-label fw-bold">
                Midlle Name:
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
              <label for="surname" className="form-label fw-bold">
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
              <label for="age" className="form-label fw-bold">
                Age:
              </label>
              <input
                type="number"
                min={0}
                className="form-control text-center"
                name="age"
                id="age"
                value={data.age}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row g-5 mb-5">
            <div className="col-6">
              <label for="gender" className="form-label fw-bold">
                Gender:
              </label>
              <select className="form-select text-center" id="gender" name="gender" onChange={handleChange} value={data.gender} required>
                <option defaultValue={"Uknown"} disabled>
                  Select Here
                </option>
                <option value={"M"}>MALE</option>
                <option value={"F"}>FEMALE</option>
              </select>
            </div>

            <div className="col-6">
              <label for="phone_no" className="form-label fw-bold">
                Phone Number:
              </label>
              <input
                type="text"
                placeholder="eg. 075444.."
                className="form-control text-center"
                id="phone_no"
                name="phone_no"
                value={data.phone_no}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row g-5 mb-5">
          <div className="col-6">
              <label for="health_id" className="form-label fw-bold">
                Health Insuarance ID:
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="health_id"
                name="health_id"
                value={data.health_id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-6">
              <label for="email" className="form-label fw-bold">
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

          <div className="row g-5">
          <div className="col-6">
              <label for="status" className="form-label fw-bold">
                Status:
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="status"
                name="status"
                value={data.status}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button className="btn btn-outline-warning btn-lg fw-bold mt-4">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPatient;
