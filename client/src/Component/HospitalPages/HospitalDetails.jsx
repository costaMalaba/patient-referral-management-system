import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const HospitalDetails = () => {
  const [doctors, setDoctors] = useState([]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure that you want to delete that hospital?")) {
      try {
        await axios
          .delete(`http://localhost:8800/delete/doctor/` + id)
          .then((res) => {
            if (res.data.Status === "Success") {
              toast.success(res.data.Message);  
              setTimeout(() => {
                window.location.reload(true);
              },5000)
            } else {
              alert("Error");
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    await axios
      .get("http://localhost:8800/get/doctor")
      .then((res) => {
        if (res.data.Status === "Success") {
          setDoctors(res.data.Result);
        }
      })
      .catch((err) => console.log(err));
  }

  const handleSearch = async (e) => {
    let searchTerm = e.target.value;
    await axios
      .get(`http://localhost:8800/doctor/search?term=${searchTerm}`)
      .then((res) => {
        if (res.data.Status === "Success") {
          setDoctors(res.data.Result);
        }
      })
      .catch((err) => console.log(err));
  }
  
  return (
    <div className="p-5 m-5">
        <input type="" onChange={handleSearch} placeholder="Search Hospital" className="form-control text-center my-3 fs-4" />
      <table className="table table-striped fs-4 bg-light shadow">
        <thead>
          <tr className="text-center fs-4 bg-primary shadow-sm text-white">
            <th colSpan={10}>List Of Hospitals</th>
          </tr>
          <tr className="bg-primary text-white">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Gender</th>
            <th scope="col">Specialization</th>
            <th scope="col">Phone No.</th>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => {
            return (
              <tr key={index}>
                <td className="fw-bold">{index + 1}</td>
                <td className="text-capitalize">
                  {doctor.surname +
                    ", " +
                    doctor.first_name +
                    " " +
                    doctor.middle_name}
                </td>
                <td className="text-center">{doctor.age}</td>
                <td className="text-center">{doctor.gender}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.phone_no}</td>
                <td>{doctor.email}</td>
                <td>{doctor.username}</td>
                <td>
                  <Link
                    to={`/dashboard/editDoctor/` + doctor.id}
                    className="btn btn-sm btn-warning me-3"
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </Link>
                  <button
                    onClick={(e) => handleDelete(doctor.id)}
                    className="btn btn-sm btn-danger"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to="/dashboard/register/hospital" className="px-0">
        <button className="btn btn-lg btn-success">
          <i className="bi bi-plus-circle me-2"></i>Add Hospital
        </button>
      </Link>
    </div>
  );
};

export default HospitalDetails;
