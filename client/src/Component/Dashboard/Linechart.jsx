import React from "react";
import { chart } from "chart.js";
import { Line } from "react-chartjs-2";

const LineChart = () => {
    const  labels = ["January", "February", "March", "April", "May", "June"];

    const data = {
        label: labels,
        datasets: [
            {
                label: "Patient Report Summary",
                backgroundColor: "rgb(10, 150, 25)",
                data: [10, 32, 45, 65, 34, 56]
            }
        ]
    };

    return(
        <div className="bg-white border border-secondary">
            <Line data={data} ></Line>
        </div>
    )
}
export default LineChart;