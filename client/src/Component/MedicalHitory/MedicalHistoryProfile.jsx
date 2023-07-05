import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import DP from "../Images/PRMS.png";

const MedicalHistoryProfile = () => {
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [name, setName] = useState([]);
  const { id } = useParams();
  const historyId = id;

  useEffect(() => {
    // Fetch the history's medical history when the component mounts
    fetchMedicalHistory();
  }, []);

  const fetchMedicalHistory = () => {
    axios
      .get(`http://localhost:8800/md_history/get/single/${historyId}`)
      .then((res) => {
        setMedicalHistory(res.data.Result);
        setName(
          `${res.data.Result[0].surname}, ${res.data.Result[0].first_name} ${res.data.Result[0].middle_name}`
        );
      })
      .catch((error) => {
        console.error("Error retrieving medical history:", error);
      });
  };

  return (
    <div className="container p-5">
      <table className="table table-striped fs-5 shadow bg-light">
        <thead>
          <tr className="text-center fs-4 text-dark">
            <th colSpan={4} className="p-3 bg-info">
              <b className="text-decoration-underline">Medical Historys</b>
              <br />
              <img src={DP} alt="Not Found" style={{height: "7rem", width: "7rem"}}></img>
              <br />
              <h1 className="text-capitalize">{name}</h1>
            </th>
          </tr>
          <tr className="text-dark">
            <th scope="col" className="p-3">
              #
            </th>
            <th scope="col" className="p-3">
              Condition
            </th>
            <th scope="col" className="p-3">
              Notes
            </th>
            <th scope="col" className="p-3">
              Last Time Created
            </th>
          </tr>
        </thead>
        <tbody>
          {medicalHistory.map((history, index) => {
            return (
              <tr key={history.id}>
                <td className="fw-bold p-3">{index + 1}</td>
                <td className="p-3">{history.condition}</td>
                <td className="p-3">{history.notes}</td>
                <td className="p-3">
                  {moment(history.updated_at).format("DD-MM-YYYY")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to={`/dashboard/add/history/${id}`} className="px-0">
        <button className="btn btn-lg btn-success">
          <i className="bi bi-plus-circle me-2"></i>Add History
        </button>
      </Link>
    </div>
  );
};

export default MedicalHistoryProfile;
