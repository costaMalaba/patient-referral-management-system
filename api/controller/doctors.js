import con from "../db/database.js";
import dotenv from "dotenv";
import sendMail from "../services/sendEmail.js";

dotenv.config();

export const getAllDoctor = (req, res) => {
  const q = "SELECT * FROM doctor";
  con.query(q, (err, data) => {
    if (err) {
      return res.json({ Error: err });
    } else {
      return res.status(200).json({ Status: "Success", Result: data });
    }
  });
};

export const getSearchedDoctors = (req, res) => {
  const searchTerm = req.query.term;
  const q = `SELECT * FROM doctor WHERE first_name LIKE '%${searchTerm}%' OR middle_name LIKE '%${searchTerm}%' OR email LIKE '%${searchTerm}%'`;
  con.query(q, (err, data) => {
    if (err) {
      return res.json({ Error: err });
    } else {
      return res.status(200).json({ Status: "Success", Result: data });
    }
  });
};

export const getSingleDoctor = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM doctor WHERE id = ? LIMIT 1";
  con.query(q, [id], (err, data) => {
    if (err) {
      return res.json({ Error: err });
    } else {
      return res.status(200).json({ Status: "Success", Result: data });
    }
  });
};

export const reportDoctors = (req, res) => {
  const q = `SELECT MONTHNAME(created_at) AS month, COUNT(*) AS doctors FROM doctor GROUP BY month`;
  con.query(q, (err, result) => {
    if (err) {
      return res.json({Error: err});
    } else {
      return res.status(200).json({Status: "Success", Result: result});
    }
  });
};

export const addDoctor = (req, res) => {
  // CHECKING EXISTING DOCTOR
  const q1 = "SELECT * FROM doctor WHERE email = ? OR username = ?";
  con.query(q1, [req.body.email, req.body.username], (error, data) => {
    if (error) res.json({ Message: "Error in Querying!!" });
    if (data.length > 0)
      return res.json({
        Status: "Error",
        Message: "Email or Username Already Used!!",
      });
    else {
      const q =
        "INSERT INTO doctor (`id`, `first_name`, `middle_name`, `surname`, `specialization`, `age`, `sex`, `username`, `password`, `email`, `phone_no`) VALUES (?)";

      const {
        doctor_id,
        first_name,
        middle_name,
        surname,
        specialization,
        age,
        gender,
        username,
        password,
        email,
        phone_no,
      } = req.body;

      const doctor = [ doctor_id, first_name, middle_name, surname, specialization, age, gender, username, password, email, phone_no ];

      const text = `Dear Dr. ${req.body.surname}, Now you are successfully registered in referral system.`;
      const subject = "PRMS - DOCTOR REGISTRATION";

      con.query(q, [doctor], (err, result) => {
        if (err) {
          return res.json({ Error: "Error in Query", Result: err });
        } else {
          sendMail(req.body.email, text, subject);
          return res.status(200).json({
            Status: "Success",
            Message: "Doctor Has Been Added",
            Result: result,
          });
        }
      });
    }
  });
};

export const editDoctor = (req, res) => {
  const id = req.params.id;
  const q =
    "UPDATE doctor SET first_name = ?, middle_name = ?, surname = ?, specialization = ?, age = ?, gender = ?, username = ?, email = ?, phone_no = ? WHERE id = ?";

  con.query(
    q,
    [
      req.body.first_name,
      req.body.middle_name,
      req.body.surname,
      req.body.specialization,
      req.body.age,
      req.body.gender,
      req.body.username,
      req.body.email,
      req.body.phone_no,
      id,
    ],
    (err, data) => {
      if (err) return res.json({ Error: "Error in Querying" });
      return res.json({ Status: "Success", Result: data });
    }
  );
};

export const deleteDoctor = (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM doctor WHERE id = ?";

  con.query(q, [id], (err, data) => {
    if (err) return res.json({ Error: "Error in Querying" });
    return res.json({
      Status: "Success",
      Message: "Doctor Deleted Successfully!!",
      Result: data,
    });
  });
};
