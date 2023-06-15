import con from "../db/database.js";
import dotenv from "dotenv";
import sendMail from "../services/sendEmail.js";

dotenv.config();

export const getAllPatient = (req, res) => {
  const q = "SELECT p.*, s.status AS status FROM patient p LEFT JOIN schedule s ON p.id = s.patient_id";
  con.query(q, (err, data) => {
    if (err) {
      return res.json({ Error: err });
    } else {
      return res.status(200).json({ Status: "Success", Result: data });
    }
  });
};

export const getSearchedPatients = (req, res) => {
  const searchTerm = req.query.term;
  const q = `SELECT * FROM patient WHERE first_name LIKE '%${searchTerm}%' OR middle_name LIKE '%${searchTerm}%' OR surname LIKE '%${searchTerm}%' OR email LIKE '%${searchTerm}%'`;
  con.query(q, (err, data) => {
    if (err) {
      return res.json({ Error: err });
    } else {
      return res.status(200).json({ Status: "Success", Result: data });
    }
  });
};

export const getSinglePatient = (req, res) => {
  const id = req.params.id;
  const q = `SELECT * FROM patient WHERE id = ${id} LIMIT 1`;
  con.query(q, (err, data) => {
    if (err) {
      return res.json({ Error: err });
    } else {
      return res.status(200).json({ Status: "Success", Result: data });
    }
  });
};

export const reportPatients = (req, res) => {
  const q = `SELECT MONTHNAME(updated_at) AS month, COUNT(*) AS patients FROM patient GROUP BY month`;
  con.query(q, (err, result) => {
    if (err) {
      return res.json({ Error: err });
    } else {
      return res.status(200).json({ Status: "Success", Result: result });
    }
  });
};

export const countPatients = (req, res) => {
  const q = `SELECT COUNT(*) AS patients FROM patient`;
  con.query(q, (err, data) => {
    if (err) {
      return res.json({ Error: err });
    } else {
      return res.status(200).json({ Status: "Success", Result: data });
    }
  });
};

export const addPatient = (req, res) => {
  // CHECKING EXISTING PATIEBT
  const q1 = "SELECT * FROM patient WHERE email = ? OR health_id = ?";
  con.query(q1, [req.body.email, req.body.health_id], (error, data) => {
    if (error) return res.json({ Error: "Error in Querying" });
    if (data.length > 0)
      return res.json({
        Status: "Error",
        Message: "Email or Health ID Already Used!!",
      });
    else {
      const q = 'INSERT INTO patient(`first_name`, `middle_name`, `surname`, `age`, `gender`, `phone_no`, `health_id`, `email`) VALUES (?)';
      const values = [
        req.body.first_name,
        req.body.middle_name,
        req.body.surname,
        req.body.age,
        req.body.gender,
        req.body.phone_no,
        req.body.health_id,
        req.body.email,
      ];
      const text = `Ndugu ${req.body.first_name}, Umesajiliwa Kikamilifu katika mfumo wa rufaa`;
      const subject = "PRMS - PATIENT REGISTRATION";

      con.query(q, [values], (err, result) => {
        if (err) {
          return res.json({ Error: err });
        } else {
          sendMail(req.body.email, text, subject);
          return res.status(200).json({
            Status: "Success",
            Message: "Patient Has Been Added",
            Result: result,
          });
        }
      });
    }
  });
};

export const editPatient = (req, res) => {
  const id = req.params.id;
  const q =
    "UPDATE patient SET first_name = ?, middle_name = ?, surname = ?, age = ?, gender = ?, phone_no = ?, health_id = ?, email = ?, status = ? WHERE id = ?";

  con.query(
    q,
    [
      req.body.first_name,
      req.body.middle_name,
      req.body.surname,
      req.body.age,
      req.body.gender,
      req.body.phone_no,
      req.body.health_id,
      req.body.email,
      req.body.status,
      id,
    ],
    (err, data) => {
      if (err) return res.json({ Error: "Error in Querying" });
      return res.json({ Status: "Success", Result: data });
    }
  );
};

export const deletePatient = (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM patient WHERE id = ?";

  con.query(q, [id], (err, data) => {
    if (err) return res.json({ Error: "Error in Querying" });
    return res.json({
      Status: "Success",
      Message: "Patient Deleted Successfully!!",
      Result: data,
    });
  });
};
