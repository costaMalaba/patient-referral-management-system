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
          .delete(`http://localhost:8800/delete/patient/` + id)
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
    axios
      .get("http://localhost:8800/get/patient")
      .then((res) => {
        if (res.data.Status === "Success") {
          setPatients(res.data.Result);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-5 m-5">
      <table className="table table-striped fs-4 bg-light shadow">
        <thead>
          <tr className="text-center fs-4 bg-primary shadow-sm text-white">
            <th colSpan={9}>List Of Patients</th>
          </tr>
          <tr className="bg-primary text-white">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Gender</th>
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
                <td className="fw-bold">{index + 1}</td>
                <td className="text-capitalize">
                  {patient.surname +
                    ", " +
                    patient.first_name +
                    " " +
                    patient.middle_name}
                </td>
                <td className="text-center">{patient.age}</td>
                <td className="text-center">{patient.gender}</td>
                <td>{patient.phone_no}</td>
                <td>{patient.health_id}</td>
                <td>{patient.email}</td>
                <td>{patient.status}</td>
                <td>
                  <Link
                    to={`/dashboard/view/patient/edit/` + patient.id}
                    className="btn btn-sm btn-warning me-3"
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </Link>
                  <button
                    onClick={(e) => handleDelete(patient.id)}
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
      <Link to="/dashboard/view/patient/add" className="px-0">
        <button className="btn btn-lg btn-success">
          <i className="bi bi-plus-circle me-2"></i>Add patient
        </button>
      </Link>
    </div>
  );
};

export default PatientDetails;
