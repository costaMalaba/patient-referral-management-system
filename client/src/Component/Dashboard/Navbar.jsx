import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand text-white fs-4 fw-bold" to="">
          Dashboard
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item border rounded">
              <Link className="nav-link text-white fs-4" aria-current="page" to="">
                <i className="bi bi-search me-2"></i>
                Search
              </Link>
            </li>

            <li className="nav-item border rounded mx-3 border rounded-3">
              <Link className="nav-link text-white fs-4" aria-current="page" to="">
                Account
              </Link>
            </li>

            <li className="nav-item border rounded">
              <Link className="nav-link text-white fs-4" aria-current="page" to="">
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;