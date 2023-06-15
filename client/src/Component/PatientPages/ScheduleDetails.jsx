import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ScheduleDetails = () => {
  const [schedules, setSchedules] = useState([]);

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete that Schedule ?`)) {
      try {
        await axios
          .delete(`http://localhost:8800/schedule/delete/` + id)
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

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:8800/schedule/edit/status/${id}`, { status }).then(res => {
        if(res.data.Result.changedRows === 1) {
          toast.success('Status Updated Successfully');
          setTimeout(() => {
            window.location.reload(true);
          }, 5000)
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid p-3">
      <input
        type=""
        onChange={handleSearch}
        placeholder="Search Schedule"
        className="form-control text-center my-3 fs-4"
      />
      <table className="table table-striped fs-4 bg-light shadow">
        <thead>
          <tr className="text-center fs-4 bg-primary shadow-sm text-white">
            <th colSpan={9}>List Of Schedules</th>
          </tr>
          <tr className="bg-primary text-white">
            <th scope="col">#</th>
            <th scope="col">Patient Name</th>
            <th scope="col" className="text-center">To</th>
            <th scope="col" className="text-center">
              Date
            </th>
            <th scope="col" className="text-center">
              Time
            </th>
            <th scope="col" className="text-center">
              Status
            </th>
            <th scope="col" className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => {
            return (
              <tr key={index}>
                <td className="fw-bold p-3">{index + 1}</td>
                <td className="text-capitalize p-3">{schedule.surname + ", " + schedule.first_name + " " + schedule.middle_name}</td>
                <td className="text-capitalize p-3">{schedule.to}</td>
                <td className="text-center p-3">
                  {moment(schedule.date).format("DD-MM-YYYY")}
                </td>
                <td className="text-center p-3">{schedule.time}</td>
                <td className="text-center p-3">{schedule.status}</td>
                <td className="text-center p-3">
                  <Link
                    to={`/dashboard/schedule/edit/` + schedule.s_id}
                    title="Edit"
                    className="btn btn-sm btn-warning me-3"
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </Link>
                  <button
                    onClick={(e) => handleDelete(schedule.s_id)}
                    title="Delete"
                    className="btn btn-sm btn-danger me-3"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-success me-3"
                    onClick={() => handleStatusChange(schedule.s_id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleStatusChange(schedule.s_id, "Rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleDetails;
