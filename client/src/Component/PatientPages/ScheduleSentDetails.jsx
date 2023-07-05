import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

const ScheduleSentDetails = () => {
  const username = sessionStorage.getItem('username');
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    getSchedules();
  }, []);

  const getSchedules = async () => {
    await axios
      .get(`http://localhost:8800/schedule/view/sent?term=${username}`)
      .then((res) => {
        if (res.data.Status === "Success") {
          setSchedules(res.data.Result);
        }
        console.log(res.data.Result);
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = async (e) => {
    let searchTerm = e.target.value;
    await axios
      .get(`http://localhost:8800/patient/search?term=${searchTerm}`)
      .then((res) => {
        if (res.data.Status === "Success") {
          setSchedules(res.data.Result);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid p-3">
      <input
        type=""
        onChange={handleSearch}
        placeholder="Search Schedule"
        className="form-control text-center my-3 fs-4"
      />
      <table className="table table-striped fs-5 bg-light shadow">
        <thead>
          <tr className="text-center fs-4 bg-info text-dark">
            <th colSpan={11}>List of Schedules</th>
          </tr>
          <tr className="text-dark">
            <th scope="col" className="p-3">#</th>
            <th scope="col" className="p-3">Patient Name</th>
            <th scope="col" className="p-3">Sex</th>
            <th scope="col" className="p-3">Age</th>
            <th scope="col" className="p-3">To</th>
            <th scope="col" className="p-3">Reasons</th>
            <th scope="col" className="p-3">Problem Start</th>
            <th scope="col" className="p-3">
              Date
            </th>
            <th scope="col" className="p-3">
              Time
            </th>
            <th scope="col" className="p-3">
              Scheduled Status
            </th>
            <th scope="col" className="p-3">Health Status</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => {
            return (
              <tr key={index}>
                <td className="fw-bold p-3">{index + 1}</td>
                <td className="text-capitalize p-3">{schedule.surname + ", " + schedule.first_name + " " + schedule.middle_name}</td>
                <td className="p-3">{schedule.sex}</td>
                <td className="p-3">{schedule.age}</td>
                <td className="text-capitalize p-3">{schedule.to}</td>
                <td className="p-3 text-capitalize">{schedule.reason}</td>
                <td className="text-capitalize p-3">{schedule.problem_start}</td>
                <td className="p-3">
                  {moment(schedule.date).format("DD-MM-YYYY")}
                </td>
                <td className="p-3">{schedule.time}</td>
                {schedule.status === "Approved & Assigned" && <td className="p-3 text-success fw-bold">{schedule.status}</td>}
                    {schedule.status === "Rejected" && <td className="p-3 text-danger fw-bold">{schedule.status}</td>}
                    {schedule.status === "Pending" && <td className="p-3 text-warning fw-bold">{schedule.status}</td>}
                    <td className="p-3">{schedule.healthStatus}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleSentDetails;
