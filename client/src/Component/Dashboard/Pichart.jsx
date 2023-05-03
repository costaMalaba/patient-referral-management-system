import React from "react";
import chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const PieChart = () => {
    const  labels = ["January", "February", "March", "April", "May", "June"];

    const data = {
        label: labels,
        datasets: [
            {
                label: "Patient Report",
                backgroundColor: ["rgb(100, 150, 25)", "rgb(250, 150, 255)", "rgb(10, 150, 25)", "rgb(200, 150, 255)"],
                data: [10, 32, 45, 65],
            }
        ]
    };

    return(
        <div className="bg-white border border-secondary">
            <Pie data={data} ></Pie>
        </div>
    )
}
export default PieChart;