import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

export const PatientBarChart = ({ data }) => {
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    // Fetch the report data from the server
    getPatientReport();
  }, []);

  const getPatientReport = async () => {
    await axios
      .get('http://localhost:8800/patient/report')
      .then((res) => {
        setPatientData(res.data.Result);
        console.log(res.data.Result);
      })
      .catch((err) => {
        console.error('Error fetching report data:', err);
      });
  }

  const barChartData = {
    labels: patientData.map((item) => item.month),
    datasets: [
      {
        label: 'Patients',
        data: patientData.map((item) => item.patients),
        backgroundColor: 'rgba(200, 19, 20, 0.8)',
        borderColor: 'rgba(75, 192, 192, 0.1)',
        borderWidth: 0.5,
      },
    ],
  };

  return (
    <div>
      <Bar data={barChartData} options={{responsive: true, scales: {y: {ticks: {stepSize: 1}}}}} />
    </div>
  );
}

export const DoctorBarChart = ({ data }) => {
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    // Fetch the report data from the server
    getDoctorReport();
  }, []);

  const getDoctorReport = async () => {
    await axios
      .get('http://localhost:8800/doctor/report/data')
      .then((res) => {
        setDoctorData(res.data.Result);
        console.log(res.data.Result);
      })
      .catch((err) => {
        console.error('Error fetching report data:', err);
      });
  }

  const barChartData = {
    labels: doctorData.map((item) => item.month),
    datasets: [
      {
        label: 'Doctors',
        data: doctorData.map((item) => item.doctors),
        backgroundColor: 'rgba(255, 19, 100, 0.8)',
        borderColor: 'rgba(75, 192, 192, 0.1)',
        borderWidth: 0.5,
      },
    ],
  };

  return (
    <div>
      <Bar data={barChartData} options={{responsive: true, scales: {y: {ticks: {stepSize: 1}}}}} />
    </div>
  );
}

export const PieChart = ({ data }) => {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    // Fetch the report data from the server
    getScheduleReport();
  }, []);

  const getScheduleReport = async () => {
    await axios
      .get('http://localhost:8800/schedule/report')
      .then((res) => {
        setScheduleData(res.data.Result);
      })
      .catch((err) => {
        console.error('Error fetching report data:', err);
      });
  }

  const pieChartData = {
    labels: scheduleData.map((item) => item.month),
    datasets: [
      {
        label: 'Schedules',
        data: scheduleData.map((item) => item.schedules),
        backgroundColor: 'rgba(255, 170, 10, 0.8)',
        borderColor: 'rgba(75, 192, 192, 0.1)',
        borderWidth: 0.5,
      },
    ],
  };

  return (
    <div>
      <Bar data={pieChartData} options={{responsive: true, scales: {y: {ticks: {stepSize: 1}}}}} />
    </div>
  );
}
