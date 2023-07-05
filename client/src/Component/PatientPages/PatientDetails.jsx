import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const PatientDetails = () => {
  const username = sessionStorage.getItem('username');
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
              }, 5000);
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
      .get(`http://localhost:8800/result/patients?term=${username}`)
      .then((res) => {
        if (res.data.Status === "Success") {
          setPatients(res.data.Result);
        }
      })
      .catch((err) => console.log(err));
  };

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
  };

  const handleMdHistory = async (patientId) => {
    try {
      await axios.get(`http://localhost:8800/md_history/get/single/${patientId}`).then(res => {
        if(res.data.Status === "Success") {
          window.location.href = `/dashboard/add/history/profile/${patientId}`
        } else {
          console.log(res.data.Status);
          window.location.href = `/dashboard/add/history/${patientId}`
          
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container-fluid p-3">
      <input
        type=""
        onChange={handleSearch}
        placeholder="Search Patient"
        className="form-control text-center my-3 fs-4"
      />
      <table className="table table-striped fs-5 bg-light shadow">
        <thead>
          <tr className="text-center fs-4text-dark bg-info">
            <th colSpan={11} className="p-3">List 0f Patients</th>
          </tr>
          <tr className="text-dark">
            <th scope="col" className="p-3">#</th>
            <th scope="col" className="p-3">Name</th>
            <th scope="col" className="p-3 text-center">Sex</th>
            <th scope="col" className="p-3 text-center">Age</th>
            {username === "Admin" && <th scope="col" className="p-3">From</th>}
            <th scope="col" className="p-3">Parent/Gurdian</th>
            <th scope="col" className="p-3">Phone No.</th>
            <th scope="col" className="p-3">Email</th>
            <th scope="col" className="p-3">History</th>
            <th scope="col" className="p-3">Status</th>
            <th scope="col" className="p-3">Actions</th>
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
                <td className="p-3 text-center">{patient.sex}</td>
                <td className="p-3 text-center">{patient.age}</td>
                {username === "Admin" && <td className="p-3 text-capitalize">{patient.name}</td>}
                <td className="p-3 text-capitalize">{patient.parent}</td>             
                <td className="p-3">{patient.phone_no}</td>
                <td className="p-3">{patient.email}</td>
                <td className="p-3 text-center">
                <button
                    type="button"
                    onClick={(e) => handleMdHistory(patient.pat_id)}
                    
                    className="btn btn-sm btn-info"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`${patient.first_name} Medical History`}
                  >
                    <i className="bi bi-clock-history"></i>
                  </button>
                </td>
                {patient.status === "Approved & Assigned" && (
                  <td className="p-3 text-success fw-bold">{patient.status}</td>
                )}
                {patient.status === "Rejected" && (
                  <td className="p-3 text-danger fw-bold">{patient.status}</td>
                )}
                {patient.status === "Pending" && (
                  <td className="p-3 text-warning fw-bold">{patient.status}</td>
                )}
                {patient.status === null && (
                  <td className="p-3 text-warning fw-bold">Not Scheduled</td>
                )}
                <td className="p-3">
                  <Link
                    to={`/dashboard/view/patient/edit/${patient.pat_id}`}
                    title="Edit"
                    className="btn btn-sm btn-warning me-3"
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </Link>
                  <button
                    onClick={(e) => handleDelete(patient.pat_id)}
                    title="Delete"
                    className="btn btn-sm btn-danger me-3"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <Link
                    to={`/dashboard/patient/schedule/${patient.pat_id}`}
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
