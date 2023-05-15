import con from "../db/database.js";

export const getAllPatients = (req, res) => {
  const q = "SELECT * FROM patient";
  con.query(q, (err, data) => {
    if (err) {
      return res.json({Error: err});
    } else {
      return res.status(200).json({Status: "Success", Result: data});
    }
  });
};

export const getSinglePatient = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM patient WHERE id = ? LIMIT 1";
  con.query(q, [id], (err, data) => {
    if (err) {
      return res.json({Error: err});
    } else {
      return res.status(200).json({Status: "Success", Result: data});
    }
  });
};

export const addPatient = (req, res) => {
  // CHECKING EXISTING PATIEBT
  const q1 =
    "SELECT * FROM patient WHERE email = ? OR health_id = ?";
  con.query(
    q1,
    [
      req.body.email,
      req.body.health_id,
    ],
    (error, data) => {
      if (error) return res.json({Error: "Error in Querying"});
      if (data.length > 0)
        return res.json({Status: "Error", Message: "Email or Health ID Already Used!!"});
      else {
        const q = "INSERT INTO patient VALUES (?)";
        const values = [
          ,
          req.body.first_name,
          req.body.middle_name,
          req.body.surname,
          req.body.age,
          req.body.gender,
          req.body.phone_no,
          req.body.health_id,
          req.body.email,
          req.body.status
        ];

        con.query(q, [values], (error, result) => {
          if (error) {
            return res.json({ Error: "Error in Querying" });
          } else {
            return res.status(200).json({ Status: "Success", Message: "Patient Has Been Added", Result: result });
          }
        });
      }
    }
  );
};

export const editPatient = (req, res) => {
  const id = req.params.id;
  const q= "UPDATE patient SET first_name = ?, middle_name = ?, surname = ?, age = ?, gender = ?, phone_no = ?, health_id = ?, email = ?, status = ? WHERE id = ?"

  con.query(q, [req.body.first_name, req.body.middle_name, req.body.surname, req.body.age, req.body.gender, req.body.phone_no, req.body.health_id, req.body.email, req.body.status, id], (err, data) => {
    if(err) return res.json({Error: "Error in Querying"});
    return res.json({Status: "Success", Result: data});
  })
}

export const deletePatient = (req, res) => {
  const id = req.params.id;
  const q= "DELETE FROM patient WHERE id = ?"

  con.query(q, [id], (err, data) => {
    if(err) return res.json({Error: "Error in Querying"});
    return res.json({Status: "Success", Message: "Patient Deleted Successfully!!", Result: data});
  })
}