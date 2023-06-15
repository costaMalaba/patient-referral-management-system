import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const ScheduleForDashboard = () => {
    const [schedules, setSchedules] = useState([]);
    useEffect(() => {
        getSchedules();
      }, []);
    
      const getSchedules = async () => {
        await axios
          .get("http://localhost:8800/schedule/view")
          .then((res) => {
            if (res.data.Status === "Success") {
              setSchedules(res.data.Result);
            }
            console.log(res.data.Result);
          })
          .catch((err) => console.log(err));
      };

    return (
        <div className="container p-3">
          <table className="table table-striped fs-5 shadow-lg rounded-5">
            <thead>
              <tr className="text-center fs-4 text-dark">
                <th colSpan={7} className="p-3">Schedules</th>
              </tr>
              <tr className="text-dark">
                <th scope="col" className="p-3">#</th>
                <th scope="col" className="p-3">Patient Name</th>
                <th scope="col" className="p-3">To</th>
                <th scope="col" className="p-3">
                  Date
                </th>
                <th scope="col" className="p-3">
                  Time
                </th>
                <th scope="col" className="p-3 text-center">Last Time Created</th>
                <th scope="col" className="p-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule, index) => {
                return (
                  <tr key={index}>
                    <td className="fw-bold p-3">{index + 1}</td>
                    <td className="text-capitalize p-3">{schedule.surname + ", " + schedule.first_name + " " + schedule.middle_name}</td>
                    <td className="text-capitalize p-3">{schedule.to}</td>
                    <td className="p-3">
                      {moment(schedule.date).format("DD-MM-YYYY")}
                    </td>
                    <td className="p-3">{schedule.time}</td>
                    <td className="p-3 text-center">{moment(schedule.updated_at).format("DD-MM-YYYY")}</td>
                    {schedule.status === "Approved" && <td className="p-3 text-success fw-bold">{schedule.status}</td>}
                    {schedule.status === "Rejected" && <td className="p-3 text-danger fw-bold">{schedule.status}</td>}
                    {schedule.status === "Pending" && <td className="p-3 text-warning fw-bold">{schedule.status}</td>}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
}

export default ScheduleForDashboard;