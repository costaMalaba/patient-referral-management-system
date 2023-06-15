import { useEffect,useState } from "react";
import axios from "axios";
import moment from "moment";

const PatientForDashboard = () => {
    const [patients, setPatients] = useState([]);
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

    return (
        <div className="container p-3">
          <table className="table table-striped fs-5 shadow-lg rounded-5">
            <thead>
              <tr className="text-center fs-4 text-dark">
                <th colSpan={8} className="p-3">Patients</th>
              </tr>
              <tr className="text-dark">
                <th scope="col" className="p-3">#</th>
                <th scope="col" className="p-3">Name</th>
                <th scope="col" className="p-3">Age</th>
                <th scope="col" className="p-3">Sex</th>
                <th scope="col" className="p-3">Phone No.</th>
                <th scope="col" className="p-3">Email</th>
                <th scope="col" className="p-3">Last Time Created</th>
                <th scope="col" className="p-3">Status</th>
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
                    <td className="p-3">{patient.age}</td>
                    <td className="p-3">{patient.gender}</td>
                    <td className="p-3">{patient.phone_no}</td>
                    <td className="p-3">{patient.email}</td>
                    <td className="p-3 text-center">{moment(patient.updated_at).format("DD-MM-YYYY")}</td>
                    {patient.status === "Approved" && <td className="p-3 text-success fw-bold">{patient.status}</td>}
                    {patient.status === "Rejected" && <td className="p-3 text-danger fw-bold">{patient.status}</td>}
                    {patient.status === "Pending" && <td className="p-3 text-warning fw-bold">{patient.status}</td>}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
}

export default PatientForDashboard;