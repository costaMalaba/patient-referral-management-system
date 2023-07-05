import con from "../db/database.js";

export const addMdHistory = (req, res) => {
  // CHECKING EXISTING PATIEBT
  const q = "SELECT * FROM medicalHistory WHERE id = ?";
  const { historyId, patientId, medicalCondition, date, notes } = req.body;

  con.query(q, [historyId], (err, result) => {
    if (err) return res.json({ Status: "Fail", Error: err });
    if (result.length > 0)
      return res.json({
        Status: "Error",
        Message: "History Already Exit!!",
      });
    else {
      const q =
        "INSERT INTO medicalHistory (`id`, `patient_id`, `condition`, `date`, `notes`) VALUES (?, ?, ?, ?, ?)";

      con.query(
        q,
        [historyId, patientId, medicalCondition, date, notes],
        (err, result) => {
          if (err) {
            return res.json({ Error: err });
          } else {
            return res.json({
              Status: "Success",
              Message: "MD History Added Successfuly!!",
              Result: result,
            });
          }
        }
      );
    }
  });
};

export const getAllMedicalHistories = (req, res) => {
  const q =
    "SELECT DISTINCT first_name, middle_name, surname, p.pat_id AS pat_id FROM medicalHistory m JOIN patient p ON m.patient_id=p.pat_id WHERE p.hospUsername=? ORDER BY surname";
    const q1 =
    "SELECT DISTINCT first_name, middle_name, surname, p.pat_id AS pat_id, h.name AS name FROM medicalHistory m JOIN patient p ON m.patient_id=p.pat_id JOIN hospital h ON h.username=p.hospUsername ORDER BY name";
    const username = req.query.term;
  con.query(q, [username], (err, result) => {
    if (err) {
      return res.json({ Error: err });
    } else if (username === "Admin") {
      con.query(q1, (err, result) => {
        if(err) {
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

export const getSingleMdHistory = (req, res) => {
  const { id } = req.params;
    const q = 'SELECT m.*, first_name, middle_name, surname FROM medicalHistory m JOIN patient p ON m.patient_id=p.pat_id WHERE p.pat_id = ?';
    con.query(q, [id], (err, result) => {
      if (err) {
        return res.json({ Error: err });

      } if(result.length >= 1) {
        return res.status(200).json({ Status: "Success", Result: result });
      } else {
        return res.json({ Status: "Not Found" });
      }
    });
}
