import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

const MedicalHistoryDetails = () => {
  const username = sessionStorage.getItem('username');
  const [medicalHistory, setMedicalHistory] = useState([]);

  useEffect(() => {
    // Fetch the history's medical history when the component mounts
    fetchMedicalHistory();
  }, []);

  const fetchMedicalHistory = () => {
    axios
      .get(`http://localhost:8800/md_history/get/all?term=${username}`)
      .then((res) => {
        setMedicalHistory(res.data.Result);
      })
      .catch((error) => {
        console.error("Error retrieving medical history:", error);
      });
  };

  const handleSearch = async (e) => {
    let searchTerm = e.target.value;
    await axios
      .get(`http://localhost:8800/patient/search?term=${searchTerm}`)
      .then((res) => {
        if (res.data.Status === "Success") {
          setMedicalHistory(res.data.Result);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container p-5">
        <input
        type=""
        onChange={handleSearch}
        placeholder="Search History"
        className="form-control text-center my-3 fs-4"
      />
      <table className="table table-striped fs-5 shadow bg-light">
        <thead>
          <tr className="text-center fs-4 text-dark bg-info">
            <th colSpan={5} className="p-3">Medical Historys</th>
          </tr>
          <tr className="text-dark">
            <th scope="col" className="p-3">#</th>
            <th scope="col" className="p-3">Name</th>
            {username === "Admin" && <th scope="col" className="p-3">From</th>}
            <th scope="col" className="p-3 text-center">Actions</th>
            <th scope="col" className="p-3 text-center">Last Time Created</th>
          </tr>
        </thead>
        <tbody>
          {medicalHistory.map((history, index) => {
            return (
              <tr key={history.id}>
                <td className="fw-bold p-3">{index + 1}</td>
                <td className="p-3 text-capitalize">{history.surname + ", " + history.first_name + " " + history.middle_name}</td>
                {username === "Admin" && <td className="p-3">{history.name}</td>}
                <td className="p-3 text-center">
                <Link
                    to={`/dashboard/add/history/profile/${history.pat_id}`}
                    title={`${history.first_name} Medical History`}
                    className="btn btn-sm btn-info fw-bold"
                  >
                    View
                  </Link>
                </td>
                <td className="p-3 text-center">{moment(history.updated_at).format("DD-MM-YYYY")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalHistoryDetails;
