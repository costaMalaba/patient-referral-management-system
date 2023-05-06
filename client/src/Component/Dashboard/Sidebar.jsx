import React from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css"
import DoctorRegister from "../Doctor_register";

const Sidebar = () => {
    return(
        <div className="d-flex cover-2 justify-content-between flex-column bg-dark text-white py-3 ps-3 pe-5 p-3 vh-100">
            <div>
                    <i className="bi bi-heart-pulse-fill text-danger fs-4 me-4 p-3"></i>
                    <span className="fs-3 fw-bold">Make Life Safe</span>

                <hr className="text-white mt-2"/>

                <ul className="nav nav-pillss flex-column mt-2">
                    <li className="nav-item p-2">
                        <Link className="link p-1" to="">
                            <i className="bi bi-speedometer2 me-3 fs-4"></i>
                            <span className="fs-4"><strong>Dashboard</strong></span>
                        </Link>
                    </li>

                    <li className="nav-item p-2">                
                        <Link type="button" className="link p-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            <i className="bi bi-speedometer2 me-3 fs-4"></i>
                            <span className="fs-4"><strong>Doctor</strong></span>
                        </Link>


                        <div className="modal modal-xl fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 text-primary" id="staticBackdropLabel">Doctor Form</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body bg-light">
                                <DoctorRegister />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary btn-lg fw-bold" data-bs-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </li>

                    <li className="nav-item p-2">
                        <Link className="link p-1" to="/">
                            <i className="bi bi-table me-3 fs-4"></i>
                            <span className="fs-4"><strong>Table</strong></span>
                        </Link>
                    </li>

                    <li className="nav-item p-2">
                        <Link className="link p-1" to="">
                            <i className="bi bi-journal-medical me-3 fs-4"></i>
                            <span className="fs-4"><strong>Medical History</strong></span>
                        </Link>
                    </li>

                    <li className="nav-item p-2">
                        <Link className="link p-1" to="">
                            <i className="bi bi-grid me-3 fs-4"></i>
                            <span className="fs-4"><strong>Report</strong></span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <hr className="text-white"/>
                <div className="nav-item p-2">
                    <Link className="link p-1" to="">
                        <i className="bi bi-person-circle me-3 fs-4"></i>
                        <span className="fs-4"><strong>Admin</strong></span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;