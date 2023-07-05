import con from "../db/database.js";
import dotenv from "dotenv";
import moment from "moment";
import sendMail from "../services/sendEmail.js";
import sendSMS from "../services/sendSMS.js";

dotenv.config();

export const getAllDoctor = (req, res) => {
  const q = "SELECT *, d.email AS email, d.phone_no AS phone_no, FLOOR(DATEDIFF(CURDATE(), dob)/365) AS age, d.id As id FROM doctor d JOIN hospital h ON d.hospital_id=h.id";
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
  const q1 = "SELECT * FROM doctor WHERE email = ?";
  con.query(q1, [req.body.email], (error, data) => {
    if (error) res.json({ Message: "Error in Querying!!", Result: error });
    if (data.length > 0)
      return res.json({
        Status: "Error",
        Message: "Email or Username Already Used!!",
      });
    else {
      const q =
        "INSERT INTO doctor (`id`, `hospital_id`, `first_name`, `middle_name`, `surname`, `specialization`, `dob`, `sex`, `email`, `phone_no`) VALUES (?)";

      const {
        doctor_id,
        hospital_id,
        first_name,
        middle_name,
        surname,
        specialization,
        dob,
        sex,
        email,
        phone_no,
      } = req.body;

      const doctor = [ doctor_id, hospital_id, first_name, middle_name, surname, specialization, dob, sex, email, phone_no ];

      con.query(q, [doctor], (err, result) => {
        if (err) {
          return res.json({ Error: "Error in Query", Result: err });
        } else {
          // Send SMS to Doctor
          const options = {
            to: [`+${phone_no}`],
            message: `Dear Dr. ${req.body.surname}, Now you are successfully registered in referral system.`,
          };

          sendSMS(options);

          // Send Email to Doctor
          const text = `Dear Dr. ${req.body.surname}, Now you are successfully registered in referral system.`;
          const subject = "PRMS - DOCTOR REGISTRATION";

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
  const q =
    "UPDATE doctor SET first_name = ?, middle_name = ?, surname = ?, specialization = ?, dob = ?, sex = ?, email = ?, phone_no = ? WHERE id = ?";
    const { id } = req.params;
    const { first_name, middle_name, surname, specialization, dob, sex, email, phone_no } = req.body;
    const formattedDob = moment(dob).format('YYYY-MM-DD');

  con.query(
    q,
    [
      first_name,
      middle_name,
      surname,
      specialization,
      formattedDob,
      sex,
      email,
      phone_no,
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
