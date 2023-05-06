import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DoctorDetails = () => {
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8800/api/doctor")
        .then(res => {
            if(res.data.Status === "Success") {
                setDoctors(res.data.Result);
            }
        })
        .catch(err => console.log(err))
    },[])
    
  return (
    <div className="p-5 m-5">
      <table class="table table-striped fs-4 bg-light shadow">
        <thead>
            <tr className="text-center fs-4">
                <th colSpan={7}>List Of Doctors</th>
            </tr>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Specialization</th>
            <th scope="col">Age</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
         {doctors.map((doctor, index) => {
             return <tr key={index}>
             <td>{index + 1}</td>
             <td>{doctor.surname + ", " + doctor.first_name + " " + doctor.middle_name}</td>
             <td>{doctor.specialization}</td>
             <td>{doctor.age}</td>
             <td>{doctor.username}</td>
             <td>{doctor.email}</td>
             <td>
                <Link to={`/dashboard/editDoctor/`+doctor.id} className="btn btn-sm btn-warning me-3"><i class="bi bi-pencil-fill"></i></Link>
                <button className="btn btn-sm btn-danger"><i class="bi bi-trash3"></i></button>
             </td>
           </tr>
         })}
        </tbody>
      </table>
      <Link to="/dashboard/doctor" className="px-0"><button className="btn btn-lg btn-success"><i className="bi bi-plus-circle me-2"></i>Add Doctor</button></Link>
    </div>
  );
};

export default DoctorDetails;