import con from "../db/database.js";
import moment from "moment";

export const addSchedule = (req, res) => {
  // CHECKING EXISTING SCHEDULE
  const q = "INSERT INTO schedule (`id`, `date`, `time`, `to`, `patient_id`) VALUES (?)";
  const { schedule_id, date, time, hospital, patient_id } = req.body;
  const formattedDate = moment(date).format('YYYY-MM-DD');
  const schedule = [ schedule_id, formattedDate, time, hospital, patient_id ];

  con.query(q, [schedule], (err, result) => {
    if (err) {
      return res.status(500).json({ Error: "Error", Message: err });
    } else {
      return res.status(200).json({
        Status: "Success",
        Message: "Schedule Has Been Added",
        Result: result,
      });
    }
  });
};

export const getAllSchedules = (req, res) => {
  const q = "SELECT *, s.status, s.id AS s_id FROM schedule s, patient p WHERE p.id = s.patient_id";
  con.query(q, (err, data) => {
    if (err) {
      return res.json({ Error: err });
    } else {
      return res.status(200).json({ Status: "Success", Result: data });
    }
  });
};

export const getSearchedSchedules = (req, res) => {
  const searchTerm = req.query.term;
  const q = `SELECT * FROM schedule WHERE to LIKE '%${searchTerm}%' OR date LIKE '%${searchTerm}%' OR time LIKE '%${searchTerm}%'`;
  con.query(q, (err, data) => {
    if (err) {
      return res.json({ Error: err });
    } else {
      return res.status(200).json({ Status: "Success", Result: data });
    }
  });
};

export const getSingleSchedule = (req, res) => {
  const id = req.params.id;
  const q = "SELECT `date`,`time`, `to` FROM schedule WHERE id = ? LIMIT 1";
  con.query(q, [id], (err, data) => {
    if (err) {
      return res.json({ Error: err });
    } else {
      return res.status(200).json({ Status: "Success", Result: data });
    }
  });
};

export const reportSchedules = (req, res) => {
  const q = `SELECT MONTHNAME(created_at) AS month, COUNT(*) AS schedules FROM schedule GROUP BY month`;
  con.query(q, (err, data) => {
    if (err) {
      return res.json({Error: err});
    } else {
      return res.status(200).json({Status: "Success", Result: data});
    }
  });
};

export const countSchedules = (req, res) => {
  const q = `SELECT COUNT(*) AS schedules FROM schedule`;
  con.query(q, (err, data) => {
    if (err) {
      return res.json({Error: err});
    } else {
      return res.status(200).json({Status: "Success", Result: data});
    }
  });
};

export const editSchedule = (req, res) => {
  const id = req.params.id;
  const q = 'UPDATE schedule SET `date` = ?, `time` = ?, `to` = ? WHERE id = ?';

  con.query(q, [req.body.date, req.body.time, req.body.hospital, id], (err, data) => {
    if (err) return res.json({ Error: "Error", Message: "Error in Querying" });
    return res.json({ Status: "Success", Message: "Schedule Updated Successfully!!", Result: data });
  });
};

export const editScheduleStatus = (req, res) => {
  const q = 'UPDATE schedule SET `status` = ? WHERE id = ?';
  const id = req.params.id;
  const { status } = req.body;

  con.query(q, [status, id], (err, result) => {
    if (err) return res.json({ Error: "Error", Message: "Error in Querying", Result: err });
    return res.json({ Status: "Success", Message: "Status Updated Successfully", Result: result });
  });
};

export const deleteSchedule = (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM schedule WHERE id = ?";

  con.query(q, [id], (err, data) => {
    if (err) return res.json({ Error: "Error in Querying" });
    return res.json({
      Status: "Success",
      Message: "Schedule Deleted Successfully!!",
      Result: data,
    });
  });
};
