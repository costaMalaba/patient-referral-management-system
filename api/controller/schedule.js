import con from "../db/database.js";
import moment from "moment";
import sendMail from "../services/sendEmail.js";
import sendSMS from "../services/sendSMS.js";

export const addSchedule = (req, res) => {
  // CHECKING EXISTING SCHEDULE
  const q = "INSERT INTO schedule (`id`, `date`, `time`, `to`, `patient_id`) VALUES (?)";
  const { schedule_id, date, time, hospital, patient_id, phone_no, email, hospitalFrom, patientName } = req.body;
  const formattedDate = moment(date).format('YYYY-MM-DD');
  const schedule = [ schedule_id, formattedDate, time, hospital, patient_id ];

  con.query(q, [schedule], (err, result) => {
    if (err) {
      return res.status(500).json({ Error: "Error", Message: err });
    } else {
      // Send SMS to Hospital
      const options = {
        to: [`+${phone_no}`],
        message: `Hello ${hospital} Team, we are Requesting a Referral for Patient ${patientName} from ${hospitalFrom}`,
      };

      sendSMS(options);

      // Send Email to Hospital
      const text = `Hello ${hospital} Team, we are Requesting a Referral for Patient ${patientName} from ${hospitalFrom}`;
      const subject = "PRMS - REFERRAL REQUEST";
      
      sendMail(email, text, subject);

      return res.status(200).json({
        Status: "Success",
        Message: "Schedule Has Been Added",
        Result: result,
      });
    }
  });
};

export const getAllSchedules = (req, res) => {
  const q = "SELECT *, s.status, s.id AS s_id, h.name As name, h.email AS hosEmail, h.phone_no AS hosPhone, FLOOR(DATEDIFF(CURDATE(), dob)/365) AS age FROM schedule s, hospital h, patient p, referral r WHERE p.pat_id = s.patient_id AND h.username=p.hospUsername AND r.patient_id=s.patient_id AND s.to=? ORDER BY s.status";
  const q1 = "SELECT *, s.status, s.id AS s_id, h.name As name, h.email AS hosEmail, h.phone_no AS hosPhone, FLOOR(DATEDIFF(CURDATE(), dob)/365) AS age FROM schedule s, patient p, hospital h, referral r WHERE p.pat_id = s.patient_id AND h.username=p.hospUsername AND r.patient_id=s.patient_id ORDER BY s.status";
  const to = req.query.term;
  con.query(q, [to], (err, data) => {
    if (err) {
      return res.json({ Error: err });
    } else if (to === "null") {
      con.query(q1, (err, data) => {
        if (err) {
          return res.json({ Error: err });
        } else {
          return res.json({ Status: "Success", Result: data });
        }
      })
    }else {
      return res.status(200).json({ Status: "Success", Result: data });
    }
  });
};

export const getAllSchedulesSent = (req, res) => {
  const q = "SELECT *, s.status, s.id AS s_id, FLOOR(DATEDIFF(CURDATE(), dob)/365) AS age FROM schedule s, patient p, referral r WHERE p.pat_id = s.patient_id AND r.patient_id=s.patient_id AND p.hospUsername=? ORDER BY s.status";
  const q1 = "SELECT *, s.status, s.id AS s_id, FLOOR(DATEDIFF(CURDATE(), dob)/365) AS age FROM schedule s, patient p, referral r WHERE p.pat_id = s.patient_id AND r.patient_id=s.patient_id ORDER BY s.status";
  const to = req.query.term;
  con.query(q, [to], (err, data) => {
    if (err) {
      return res.json({ Error: err });
    } else if (to === "Admin") {
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
  const q = 'SELECT MONTHNAME(created_at) AS month, COUNT(*) AS schedules FROM schedule WHERE `to`=? GROUP BY month';
  const q1 = 'SELECT MONTHNAME(created_at) AS month, COUNT(*) AS schedules FROM schedule GROUP BY month';
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

export const countSchedules = (req, res) => {
  const q = 'SELECT COUNT(*) AS schedules FROM schedule WHERE `to`=?';
  const q1 = 'SELECT COUNT(*) AS schedules FROM schedule'
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

export const editSchedule = (req, res) => {
  const id = req.params.id;
  const q = 'UPDATE schedule SET `date` = ?, `time` = ?, `to` = ? WHERE id = ?';
  const { date, time, hospital } = req.body;
  const formattedDate = moment(date).format('YYYY-MM-DD');

  con.query(q, [formattedDate, time, hospital, id], (err, data) => {
    if (err) return res.json({ Error: "Error", Message: "Error in Querying", Result: err });
    return res.json({ Status: "Success", Message: "Schedule Updated Successfully!!", Result: data });
  });
};

export const editScheduleStatus = (req, res) => {
  const q = 'UPDATE schedule SET `status` = ? WHERE id = ?';
  const id = req.params.id;
  const { status, hosEmail, hosPhone_no, hosToName, hosFromName, patEmail, patPhone_no, patName } = req.body;

  con.query(q, [status, id], (err, result) => {
    if (err) {
      return res.json({ Error: "Error", Message: "Error in Querying", Result: err });
    } else if (status === "Rejected") {
      // Send SMS to Hospital
      const options = {
        to: [`+${hosPhone_no}`],
        message: `Hello ${hosToName} Team, We are Rejecting your Referral of Patient ${patName} because of problems beyonds our control \nFrom ${hosFromName} \nThanks.`,
      };

      sendSMS(options);

      // Send Email to Hospital
      const text = `Hello ${hosToName} Team, We are Rejecting your Referral of Patient ${patName} because of problems beyonds our control \nFrom ${hosFromName} \nThanks.`;
      const subject = "PRMS - REFERRAL STATUS";
      
      sendMail(hosEmail, text, subject);
      return res.json({ Status: "Success", Message: "Status Updated Successfully", Result: result });
    }else {
      // Send SMS to Hospital and Patients
      const options = {
        to: [`+${hosPhone_no}`],
        message: `Hello ${hosToName} Team, Your Referral Request for Patient ${patName} Has Been Accepted and Approved \nFrom ${hosFromName} \nThanks.`,
      };

      const paOptions = {
        to: [`+${patPhone_no}`],
        message: `Habari ndugu ${patName}, Rufaa yako ya kuhamishiwa ${hosFromName} Imekubaliwa. \nKutoka ${hosToName} \nAhsante na Karibu kwa Matibabu zaidi.`,
      };

      // sendSMS(options);
      sendSMS(paOptions);

      // Send Email to Hospital and Patient
      const text = `Hello ${hosToName} Team, Your Referral Request for Patient ${patName} Has Been Accepted and Approved \nFrom ${hosFromName} \nThanks.`;
      const subject = "PRMS - REFERRAL STATUS";

      const text1 = `Habari ndugu ${patName}, Rufaa yako ya kuhamishiwa ${hosFromName} Imekubaliwa. \nKutoka ${hosToName} \nAhsante na Karibu kwa Matibabu zaidi.`;
      const subject1 = "PRMS - HALI YA RUFAA";
      
      sendMail(hosEmail, text, subject);
      sendMail(patEmail, text1, subject1);
      return res.json({ Status: "Success", Message: "Status Updated Successfully", Result: result });
    }
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
