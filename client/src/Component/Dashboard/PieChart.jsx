import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from "react-chartjs-2";

const PieChart = () => {
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
      // Fetch the report data from the server
      axios.get('http://localhost:8800/schedule/report')
        .then((res) => {
          setReportData(res.data.Result);
          console.log(res.data.Result);
        })
        .catch((err) => {
          console.error('Error fetching report data:', err);
        });
    }, []);
  
    const barChartData = {
      labels: reportData.map((item) => item.date),
      datasets: [
        {
          label: 'Schedule Count',
          data: reportData.map((item) => item.schedules),
          backgroundColor: 'rgba(75, 192, 192, 0.3)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 0.5,
        },
      ],
    };
  
    return (
      <div>
        <Pie data={barChartData} />
      </div>
    );
}
export default PieChart;