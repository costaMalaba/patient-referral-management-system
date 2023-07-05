import { Link, Outlet, useNavigate } from "react-router-dom";
import "../../App.css";
import profile from "../../Component/Images/cym.jpeg";
import { toast } from "react-toastify";
import logo from "../Images/PRMS.png";

const Dashboard = () => {
    const username = sessionStorage.getItem('username');
    const navigate = useNavigate();

    const handleLogOut = () => {
        sessionStorage.clear();
        setTimeout(() => {
            navigate("/");
            toast.success("Logged Out");
        },1000)
    }

  return (
    <div className="container-fluid">
    <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebar">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <Link to="/dashboard/home" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <img src={logo} alt="Not found" style={{height: "10rem", width: "10rem"}}></img>
                </Link>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start fs-4 fw-semibold" id="menu">
                    <li className="nav-item">
                        <Link to="/dashboard/home" className="nav-link align-middle px-0 text-white">
                            <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-hospital"></i> <span className="ms-1 d-none d-sm-inline">Hospital</span></Link>
                        <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                            <li className="w-100">
                                <Link to="/dashboard/view/hospital" className="nav-link px-0"> <span className="d-none d-sm-inline">View Hospital</span></Link>
                            </li>
                            {username === "Admin" && <li>
                                <Link to="/dashboard/register/hospital" className="nav-link px-0"> <span className="d-none d-sm-inline">Add Hospital</span></Link>
                            </li>}
                            
                        </ul>
                    </li>

                    <li>
                        <Link to="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Doctor</span></Link>
                        <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                            <li className="w-100">
                                <Link to="/dashboard/view" className="nav-link px-0"> <span className="d-none d-sm-inline">View Doctor</span></Link>
                            </li>
                            {username === "Admin" && <li>
                                <Link to="/dashboard/doctor" className="nav-link px-0"> <span className="d-none d-sm-inline">Add Doctor</span></Link>
                            </li>}
                        </ul>
                    </li>
                                       
                    <li>
                        <Link to="#submenu" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Patient</span></Link>
                        <ul className="collapse nav flex-column ms-1" id="submenu" data-bs-parent="#menu">
                            <li className="w-100">
                                <Link to="/dashboard/view/patient" className="nav-link px-0"> <span className="d-none d-sm-inline">View Patient</span></Link>
                            </li>
                            <li>
                                <Link to="/dashboard/view/patient/add" className="nav-link px-0"> <span className="d-none d-sm-inline">Add Patient</span></Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="#submenu5" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-file-medical"></i> <span className="ms-1 d-none d-sm-inline">Schedule</span></Link>
                        <ul className="collapse nav flex-column ms-1" id="submenu5" data-bs-parent="#menu">
                            <li className="w-100">
                                <Link to="/dashboard/view/schedule" className="nav-link px-0"> <span className="d-none d-sm-inline">Received</span></Link>
                            </li>
                            <li>
                                <Link to="/dashboard/view/schedule/sent" className="nav-link px-0"> <span className="d-none d-sm-inline">Sent</span></Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/dashboard/history/view" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi bi-file-medical-fill"></i> <span className="ms-1 d-none d-sm-inline">Medical History</span> </Link>
                    </li>
                </ul>
            </div>
        </div>
        <div className="col p-0 m-0 dashboard_content">
            <div className="p-2 d-flex justify-content-center shadow text-white content">
              <h3 className="fw-bold text-primary mx-5 py-1">Patient Referral Management System</h3>
              <div className="dropdown ms-auto py-2">
                    <Link to="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={profile} alt="Not Found" width="30" height="30" className="rounded-circle" />
                        <span className="d-none d-sm-inline mx-2 text-primary fw-bold">{username}</span>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><Link className="dropdown-item" to="#">Your Profile</Link></li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li><button onClick={handleLogOut} className="dropdown-item btn">Log out</button></li>
                    </ul>
                </div>
            </div>
            <Outlet />
        </div>
    </div>
</div>
  )
}

export default Dashboard;
