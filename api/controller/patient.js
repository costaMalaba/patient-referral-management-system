import con from "../db/database.js";
import dotenv from "dotenv";
import moment from "moment";

dotenv.config();

export const getAllPatient = (req, res) => {
  const q =
    "SELECT p.*, s.status AS status, FLOOR(DATEDIFF(CURDATE(), dob)/365) AS age FROM patient AS p LEFT JOIN schedule AS s ON p.pat_id=s.patient_id LEFT JOIN hospital AS h ON h.username=p.hospUsername WHERE p.hospUsername=?";
    const q1 =
    "SELECT p.*, s.status AS status, FLOOR(DATEDIFF(CURDATE(), dob)/365) AS age, h.name AS name FROM patient AS p LEFT JOIN schedule AS s ON p.pat_id=s.patient_id LEFT JOIN hospital AS h ON h.username=p.hospUsername";
    const username = req.query.term;
  con.query(q, [username], (err, data) => {
    if (err) {
      return res.json({ Error: err });
    } else if (username === "Admin") {
      con.query(q1, (err, data) => {
        if(err) {
          return res.json({ Error: err });
        } else {
          return res.status(200).json({ Status: "Success", Result: data });
        }
      })
    }else {
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
  const q = `SELECT * FROM patient WHERE pat_id = ? LIMIT 1`;
  const { id } = req.params;
  con.query(q, [id], (err, data) => {
    if (err) {
      return res.json({ Error: err });
    } else {
      return res.status(200).json({ Status: "Success", Result: data });
    }
  });
};

export const reportPatients = (req, res) => {
  const q = `SELECT COUNT(s.status) AS patients, s.status AS status FROM patient p LEFT JOIN schedule s ON p.pat_id = s.patient_id WHERE p.hospUsername = ? GROUP BY status`;
  const q1 = `SELECT COUNT(s.status) AS patients, s.status AS status FROM patient p LEFT JOIN schedule s ON p.pat_id = s.patient_id GROUP BY status`;
  const username= req.query.term;
  con.query(q, [username], (err, result) => {
    if (err) {
      return res.json({ Error: err });
    } else if (username === "Admin") {
      con.query(q1, (err, result) => {
        if (err) {
          return res.json({ Error: err });
        } else {
          return res.status(200).json({ Status: "Success", Result: result });
        }
      })
    }else {
      return res.status(200).json({ Status: "Success", Result: result });
    }
  });
};

export const countPatients = (req, res) => {
  const q = 'SELECT COUNT(*) AS patients FROM patient WHERE hospUsername= ?';
  const q1 = 'SELECT COUNT(*) AS patients FROM patient';
  const username = req.query.term;
  con.query(q, [username], (err, data) => {
    if (err) {
      return res.json({ Error: err });
    } else if (username === "Admin") {
      con.query(q1, (err, data) => {
        if (err) {
          return res.json({ Error: err });
        } else {
          return res.status(200).json({ Status: "Success", Result: data });
        }
      })
    }else {
      return res.status(200).json({ Status: "Success", Result: data });
    }
  });
};

export const addPatient = (req, res) => {
  // CHECKING EXISTING PATIENT
  const q1 = "SELECT * FROM patient WHERE email = ? OR phone_no = ?";
  const { pat_id, hospUsername, first_name, middle_name, surname, parent, dob, sex, phone_no, email } = req.body;
  con.query(q1, [email, phone_no], (err, result) => {
    if (err) return res.json({ Status: "Error", Message: "Error in Querying", Result: result });
    if (result.length > 0)
      return res.json({
        Status: "Error",
        Message: "Email or Phone No Already Used!!",
      });
    else {
      const q =
        "INSERT INTO patient(`pat_id`, `hospUsername`, `first_name`, `middle_name`, `surname`, `parent`, `dob`, `sex`, `phone_no`, `email`) VALUES (?)";
      const values = [ pat_id, hospUsername, first_name, middle_name, surname, parent, dob, sex, phone_no, email ];

      con.query(q, [values], (err, result) => {
        if (err) {
          return res.json({ Error: err });
        } else {
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
  const q =
    "UPDATE patient SET first_name = ?, middle_name = ?, surname = ?, parent = ?, dob = ?, sex = ?, phone_no = ?, email = ? WHERE pat_id = ?";
    const { first_name, middle_name, surname, parent, dob, sex, phone_no, email } = req.body;
    const formattedDob = moment(dob).format('YYYY-MM-DD');
    const { id } = req.params;

  con.query(
    q,
    [
      first_name,
      middle_name,
      surname,
      parent,
      formattedDob,
      sex,
      phone_no,
      email,
      id,
    ],
    (err, data) => {
      if (err) return res.json({ Status: "Error", Message: "Error in Querying", Result: err });
      return res.json({ Status: "Success", Message: "Patient Updated Successfully!!", Result: data });
    }
  );
};

export const editPatientHealthStatus = (req, res) => {
  const q = 'UPDATE patient SET healthStatus = ? WHERE pat_id = ?'
  const { healthStatus  } = req.body;
  const { id } = req.params;

  con.query(q, [healthStatus, id], (err, result) => {
    if (err) {
      return res.json({ Status: "Error", Message: "Error in Querying", Result: err });
    } else {
      return res.json({ Status: "Success", Message: "Health status Changed", Result: result });
    }
  })
}

export const deletePatient = (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM patient WHERE pat_id = ?";

  con.query(q, [id], (err, data) => {
    if (err) return res.json({ Error: "Error in Querying" });
    return res.json({
      Status: "Success",
      Message: "Patient Deleted Successfully!!",
      Result: data,
    });
  });
};
