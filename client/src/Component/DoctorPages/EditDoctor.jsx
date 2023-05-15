import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditDoctor = () => {
  const [data, setData] = useState({
    first_name: "",
    middle_name: "",
    surname: "",
    specialization: "",
    age: "",
    gender: "",
    phone_no: "",
    username: "",
    password: "",
    email: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8800/api/doctor/` + id)
      .then((res) => {
        setData({
          ...data,
          first_name: res.data.Result[0].first_name,
          middle_name: res.data.Result[0].middle_name,
          surname: res.data.Result[0].surname,
          specialization: res.data.Result[0].specialization,
          age: res.data.Result[0].age,
          gender: res.data.Result[0].gender,
          phone_no: res.data.Result[0].phone_no,
          username: res.data.Result[0].username,
          password: res.data.Result[0].password,
          email: res.data.Result[0].email,
        });
      })
      .catch((err) => console.log(err));
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8800/editDoctor/` + id,
        data
      );
      navigate("/dashboard/view");
      console.log(res);
      toast.success("Doctor Updated Successfully!!");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);

  return (
    <div className="conatiner p-5 m-5">
      <Link to="/dashboard/view" className="px-0">
        <button className="btn btn-sm btn-lg btn-primary">BACK</button>
      </Link>
      <div className="col-12">
        <form onSubmit={handleSubmit} className="form text-center">
          <h1 className="login mb-3">Update Doctor Here</h1>
          {error && toast.error(error)}
          <div className="row mb-5">
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

          <div className="row mb-5">
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

          <div className="row mb-5">
            <div className="col-6">
              <label for="gender" className="form-label fw-bold">
                Gender:
              </label>
              <select className="form-select text-center" id="gender" name="gender" value={data.gender} onChange={handleChange} required>
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
                onChange={handleChange}
                value={data.phone_no}
                required
              />
            </div>
          </div>

          <div className="row mb-5">
          <div className="col-6">
              <label for="specialization" className="form-label fw-bold">
                Specialization:
              </label>
              <select
                className="form-select text-center"
                id="specialization"
                name="specialization"
                value={data.specialization}
                onChange={handleChange}
                required
              >
                <option selected defaultValue={"Uknown"} disabled>
                  Select Here
                </option>
                <option value={"Cardiology"}>Cardiology</option>
                <option value={"Dermatology"}>Dermatology</option>
                <option value={"Endocrinology"}>Endocrinology</option>
                <option value={"Gastroenterology"}>Gastroenterology</option>
                <option value={"Neurology"}>Neurology</option>
              </select>
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

          <div className="row">
            <div className="col-6">
              <label for="username" className="form-label fw-bold">
                Username:
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="username"
                name="username"
                value={data.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-6">
              <label for="password" className="form-label fw-bold">
                Password:
              </label>
              <input
                type="password"
                className="form-control text-center"
                id="password"
                name="password"
                value={data.password}
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

export default EditDoctor;
