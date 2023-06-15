import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const PatientDetails = () => {
  const [patients, setPatients] = useState([]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete that patient ?")) {
      try {
        await axios
          .delete(`http://localhost:8800/delete/patient/${id}`)
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
    getPatients();
  }, []);

  const getPatients = async () => {
    await axios
      .get("http://localhost:8800/result/patient")
      .then((res) => {
        if (res.data.Status === "Success") {
          setPatients(res.data.Result);
        }
      })
      .catch((err) => console.log(err));
  }

  const handleSearch = async (e) => {
    let searchTerm = e.target.value;
    await axios
      .get(`http://localhost:8800/patient/search?term=${searchTerm}`)
      .then((res) => {
        if (res.data.Status === "Success") {
          setPatients(res.data.Result);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid p-3">
        <input type="" onChange={handleSearch} placeholder="Search Patient" className="form-control text-center my-3 fs-4" />
      <table className="table table-striped fs-4 bg-light shadow">
        <thead>
          <tr className="text-center fs-4 bg-primary shadow-sm text-white">
            <th colSpan={9}>List Of Patients</th>
          </tr>
          <tr className="bg-primary text-white">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Sex</th>
            <th scope="col">Phone No.</th>
            <th scope="col">Health Ins. ID</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => {
            return (
              <tr key={index}>
                <td className="fw-bold p-3">{index + 1}</td>
                <td className="text-capitalize p-3">
                  {patient.surname +
                    ", " +
                    patient.first_name +
                    " " +
                    patient.middle_name}
                </td>
                <td className="text-center p-3">{patient.age}</td>
                <td className="text-center p-3">{patient.gender}</td>
                <td className="p-3">{patient.phone_no}</td>
                <td className="p-3">{patient.health_id}</td>
                <td className="p-3">{patient.email}</td>
                {patient.status === "Approved" && <td className="p-3 text-success fw-bold">{patient.status}</td>}
                {patient.status === "Rejected" && <td className="p-3 text-danger fw-bold">{patient.status}</td>}
                {patient.status === "Pending" && <td className="p-3 text-warning fw-bold">{patient.status}</td>}
                <td className="p-3">
                  <Link
                    to={`/dashboard/view/patient/edit/` + patient.id}
                    title="Edit"
                    className="btn btn-sm btn-warning me-3"
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </Link>
                  <button
                    onClick={(e) => handleDelete(patient.id)}
                    title="Delete"
                    className="btn btn-sm btn-danger me-3"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <Link
                    to={`/dashboard/patient/schedule/` + patient.id}
                    title="Schedule"
                    className="btn btn-sm btn-success"
                  >
                    <i className="bi bi-bell"></i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to="/dashboard/view/patient/add" className="px-0">
        <button className="btn btn-lg btn-success">
          <i className="bi bi-plus-circle me-2"></i>Add patient
        </button>
      </Link>
    </div>
  );
};

export default PatientDetails;
