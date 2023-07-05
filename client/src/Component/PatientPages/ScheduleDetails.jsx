import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ScheduleDetails = () => {
  const to = sessionStorage.getItem("to");
  const [schedules, setSchedules] = useState([]);
  const [healthStatus, setHealthStatus] = useState('');
  console.log(healthStatus)

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
      .get(`http://localhost:8800/schedule/view?term=${to}`)
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

  const handleStatusChange = async (id, status, hosEmail, hosPhone_no, hosToName, hosFromName, patEmail, patPhone_no, patName) => {
    try {
      await axios
        .put(`http://localhost:8800/schedule/edit/status/${id}`, { status, hosEmail, hosPhone_no, hosToName, hosFromName, patEmail, patPhone_no, patName })
        .then((res) => {
          if (res.data.Result.changedRows === 1) {
            toast.success("Status Updated Successfully");
            setTimeout(() => {
              window.location.reload(true);
            }, 5000);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setHealthStatus((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    
  };

  const handleSubmit = async (id) => {
    try {
      await axios.put(`http://localhost:8800/edit/patient/status/${id}`, healthStatus).then(res => {
        if(res.data.Status === "Success") {
          toast.success(res.data.Message);
        } else {
          toast.warning(res.data.Message);
        }
      })
    } catch (error) {
      console.error(error);
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
      <table className="table table-striped fs-5 bg-light shadow">
        <thead>
          <tr className="text-center fs-4 bg-info text-dark">
            <th colSpan={12}>List of Schedules</th>
          </tr>
          <tr className="text-dark">
            <th scope="col" className="p-3">
              #
            </th>
            <th scope="col" className="p-3">
              Patient Name
            </th>
            <th scope="col" className="p-3">
              Sex
            </th>
            <th scope="col" className="p-3">
              Age
            </th>
              <th scope="col" className="p-3">
                From
              </th>
            <th scope="col" className="p-3">
              Reasons
            </th>
            <th scope="col" className="p-3">
              Problem Start
            </th>
            <th scope="col" className="p-3">
              Date
            </th>
            <th scope="col" className="p-3">
              Time
            </th>
            <th scope="col" className="p-3">
              Scheduled Status
            </th>
            <th scope="col" className="p-3">
              Health status
            </th>
            <th scope="col" className="p-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => {
            return (
              <tr key={index}>
                <td className="fw-bold p-3">{index + 1}</td>
                <td className="text-capitalize p-3">
                  {schedule.surname +
                    ", " +
                    schedule.first_name +
                    " " +
                    schedule.middle_name}
                </td>
                <td className="p-3">{schedule.sex}</td>
                <td className="p-3">{schedule.age}</td>
                  <td className="p-3 text-capitalize">{schedule.name}</td>
                <td className="p-3">{schedule.reason}</td>
                <td className="p-3">{schedule.problem_start}</td>
                <td className="p-3">
                  {moment(schedule.date).format("DD-MM-YYYY")}
                </td>
                <td className="p-3">{schedule.time}</td>
                {schedule.status === "Approved & Assigned" && (
                  <td className="p-3 text-success fw-bold">
                    {schedule.status}
                  </td>
                )}
                {schedule.status === "Rejected" && (
                  <td className="p-3 text-danger fw-bold">{schedule.status}</td>
                )}
                {schedule.status === "Pending" && (
                  <td className="p-3 text-warning fw-bold">
                    {schedule.status}
                  </td>
                )}
                <td className="p-3">{schedule.healthStatus}</td>
                <td className="p-3">
                  <Link
                    to={`/dashboard/schedule/edit/${schedule.s_id}`}
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
                  {schedule.status === "Approved & Assigned" && (
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() =>
                        handleStatusChange(schedule.s_id, "Rejected", schedule.hosEmail, schedule.hosPhone, schedule.name, schedule.hospName, schedule.email, schedule.phone_no, `${schedule.surname + ", " + schedule.first_name + " " + schedule.middle_name}`)
                      }
                    >
                      Reject
                    </button>
                  )}
                  {schedule.status === "Rejected" && (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() =>
                        handleStatusChange(schedule.s_id, "Approved & Assigned", schedule.hosEmail, schedule.hosPhone, schedule.name, schedule.hospName, schedule.email, schedule.phone_no, `${schedule.surname + ", " + schedule.first_name + " " + schedule.middle_name}`)
                      }
                    >
                      Approve
                    </button>
                  )}
                  {schedule.status === "Pending" && (
                    <>
                      <button
                        className="btn btn-sm btn-success me-3"
                        onClick={() =>
                          handleStatusChange(schedule.s_id, "Approved & Assigned", schedule.hosEmail, schedule.hosPhone, schedule.name, schedule.hospName, schedule.email, schedule.phone_no, `${schedule.surname + ", " + schedule.first_name + " " + schedule.middle_name}`)
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() =>
                          handleStatusChange(schedule.s_id, "Rejected", schedule.name, schedule.hosEmail, schedule.hosPhone, schedule.name, schedule.hospName, schedule.email, schedule.phone_no, `${schedule.surname + ", " + schedule.first_name + " " + schedule.middle_name}`)
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <form>
                <div className="btn-group">
                  <select
                className="form-select mt-3 w-75 fw-bold text-dark"
                id="healthStatus"
                name="healthStatus"
                onChange={handleChange}
                required
              >
                <option className="text-muted" defaultValue="Undetermined" >
                  Change Health Status
                </option>
                <option value={"Excellent"}>Excellent</option>
                <option value={"Good"}>Good</option>
                <option value={"Fair"}>Fair</option>
                <option value={"Serious"}>Serious</option>
                <option value={"Critical"}>Critical</option>
              </select>
              <button type="submit" onClick={() => handleSubmit(schedule.pat_id)} className="btn btn-info btn-sm mt-3">Change</button>
              </div>
              </form>
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
