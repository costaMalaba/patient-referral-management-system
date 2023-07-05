import con from "../db/database.js";

export const addReferral = (req, res) => {
    // CHECKING EXISTING SCHEDULE
    const q = "INSERT INTO referral (`ref_id`, `patient_id`, `hospName`, `reason`, `problem_start`) VALUES (?)";
    const { ref_id, patient_id, hospName, pa_prblm, prlm_start } = req.body;
    const values = [ ref_id, patient_id, hospName, pa_prblm, prlm_start ];
  
    con.query(q, [values], (err, result) => {
      if (err) {
        return res.status(500).json({ Error: "Error", Message: err });
      } else {
        return res.status(200).json({
          Status: "Success",
          Message: "Request Has Been Made",
          Result: result,
        });
      }
    });
  };

  export const countReferrals = (req, res) => {
    const q = 'SELECT COUNT(*) AS referrals FROM referral WHERE hospName = ?';
    const q1 = 'SELECT COUNT(*) AS referrals FROM referral';
    const to = req.query.term;
    con.query(q, [to], (err, data) => {
      if (err) {
        return res.json({Error: err});
      } else if (to === "null") {
        con.query(q1, (err, data) => {
          if (err) {
            return res.json({Error: err});
          } else {
            return res.status(200).json({Status: "Success", Result: data});
          }
        })
      }else {
        return res.status(200).json({Status: "Success", Result: data});
      }
    });
  };