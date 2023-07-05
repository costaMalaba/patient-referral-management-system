import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditHospital = () => {
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8800/hospital/get/single/${id}`)
      .then((res) => {
        setData(res.data.Result[0]);
      })
      .catch((err) => console.log(err));
  },[id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8800/hospital/edit/${id}`,
        data
      ).then(res => {
        if(res.data.Status === "Success") {
          toast.success(res.data.Message);
          setTimeout(() => {
            window.location.href = "/dashboard/view/hospital";
          },1000)
        } else {
          toast.warning(res.data.Message);
          navigate(`/dashboard/edit/hospital/${id}`);
        }
      })  
      
    } catch (error) {
      console.error(error);
    }
  };

  console.log(data);

  return (
    <div className="conatiner p-5 m-5">
      <Link to="/dashboard/view/hospital" className="px-0">
        <button className="btn btn-sm btn-lg btn-primary">BACK</button>
      </Link>
      <div className="col-12">
        <form onSubmit={handleSubmit} className="form text-center">
          <h1 className="login mb-3">Update Hospital Here</h1>
          <div className="row mb-5">
            <div className="col-6">
              <label for="name" className="form-label fw-bold">
                Name:
              </label>
              <input
                type="text"
                className="form-control text-center text-uppercase"
                id="name"
                name="name"
                value={data.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-6">
              <label for="location" className="form-label fw-bold">
                Location:
              </label>
              <input
                type="text"
                className="form-control text-center text-uppercase"
                id="location"
                name="location"
                value={data.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-6">
              <label for="phone_no" className="form-label fw-bold">
                Phone Number:
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="phone_no"
                name="phone_no"
                value={data.phone_no}
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

          <div className="row mb-5">
          <div className="col-6">
              <label for="address" className="form-label fw-bold">
                Address:
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="address"
                name="address"
                value={data.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-6">
              <label for="websiteURL" className="form-label fw-bold">
                Website URL: <i>(Optional)</i>
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="websiteURL"
                name="websiteURL"
                value={data.websiteURL}
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

          <button className="btn btn-warning btn-lg fw-bold mt-4">
            UPDATE
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditHospital;
