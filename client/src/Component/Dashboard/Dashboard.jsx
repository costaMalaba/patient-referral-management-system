import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Home from "./Home";

const Dashboard = () => {
    return(
        <div className="d-flex">
            <div className="w-auto">
                <Sidebar />
            </div>
            <div className="col">
                <Navbar />
                <Home />
            </div>
        </div>
    )
}

export default Dashboard;