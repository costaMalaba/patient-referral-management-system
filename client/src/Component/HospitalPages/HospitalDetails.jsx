import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const HospitalDetails = () => {
  const username = sessionStorage.getItem('username');
  const [hospitals, setHospitals] = useState([]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure that you want to delete that hospital?")) {
      try {
        await axios
          .delete(`http://localhost:8800/hospital/delete/${id}`)
          .then((res) => {
            if (res.data.Status === "Success") {
              toast.success(res.data.Message);
              setTimeout(() => {
                window.location.href = "/dashboard/view/hospital";
              },3000)
            } else {
              alert("Error");
            }
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getHospitals();
  }, []);

  const getHospitals = async () => {
    await axios
      .get("http://localhost:8800/hospital/get/all")
      .then((res) => {
        if (res.data.Status === "Success") {
          setHospitals(res.data.Result);
        }
      })
      .catch((err) => console.log(err));
  }

  const handleSearch = async (e) => {
    let searchTerm = e.target.value;
    await axios
      .get(`http://localhost:8800/hospital/search?term=${searchTerm}`)
      .then((res) => {
        if (res.data.Status === "Success") {
          setHospitals(res.data.Result);
        }
      })
      .catch((err) => console.log(err));
  }
  
  return (
    <div className="container-fluid p-3">
        <input type="" onChange={handleSearch} placeholder="Search Hospital" className="form-control text-center my-3 fs-4" />
      <table className="table table-striped fs-5 bg-light shadow">
        <thead>
          <tr className="text-center fs-4 bg-info text-dark">
            <th colSpan={9} className="p-3">List of Hospitals</th>
          </tr>
          <tr className="text-dark">
            <th scope="col" className="p-3">#</th>
            <th scope="col" className="p-3">Name</th>
            <th scope="col" className="p-3">Location</th>
            <th scope="col" className="p-3">Address</th>
            <th scope="col" className="p-3">Email</th>
            <th scope="col" className="p-3">Phone No.</th>
            <th scope="col" className="p-3">Website URL</th>
            <th scope="col" className="p-3">Username</th>
            {username ==="Admin" && <th scope="col" className="p-3">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital, index) => {
            return (
              <tr key={index}>
                <td className="fw-bold p-3">{index + 1}</td>
                <td className="text-uppercase p-3">{hospital.name}</td>
                <td className="p-3 text-capitalize">{hospital.location}</td>
                <td className="p-3">{hospital.address}</td>
                <td className="p-3">{hospital.email}</td>
                <td className="p-3">{hospital.phone_no}</td>
                <td className="p-3">{hospital.websiteURL}</td>
                <td className="p-3">{hospital.username}</td>
                {username === "Admin" &&
                <td>
                  <Link
                    to={`/dashboard/edit/hospital/${hospital.id}`}
                    className="btn btn-sm btn-warning me-3"
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </Link>
                  <button
                    onClick={(e) => handleDelete(hospital.id)}
                    className="btn btn-sm btn-danger"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </td>}
              </tr>
            );
          })}
        </tbody>
      </table>
      {username === "Admin" && <Link to="/dashboard/register/hospital" className="px-0">
        <button className="btn btn-lg btn-success">
          <i className="bi bi-plus-circle me-2"></i>Add Hospital
        </button>
      </Link>}
      
    </div>
  );
};

export default HospitalDetails;
