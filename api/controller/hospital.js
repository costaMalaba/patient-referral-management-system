import con from "../db/database.js";

export const addHospital = (req, res) => {
  // CHECKING EXISTING PHOSPITAL
  const q = "SELECT * FROM hospital WHERE email = ? OR password = ? OR username = ?";

  const {
    hos_id,
    hos_name,
    hos_location,
    phone_no,
    email,
    address,
    url,
    username,
    password,
  } = req.body;

  const hosptal = [
    hos_id,
    hos_name,
    hos_location,
    email,
    phone_no,
    address,
    url,
    username,
    password,
  ];

  con.query(q, [email, password, username], (err, result) => {
    if (err) return res.json({ Error: "Error in Querying", Message: err });

    if (result.length > 0)
      return res.json({
        Status: "Fail",
        Message: "Hospital Already Exist!!",
        Result: result,
      });
    else {
      const q =
        "INSERT INTO hospital (`id`, `name`, `location`, `email`, `phone_no`, `address`, `websiteURL`, `username`, `password`) VALUES (?)";

      con.query(q, [hosptal], (err, result) => {
        if (err) {
          return res.json({ Error: err });
        } else {
          // Send SMS to Patient
          const options = {
            to: [`+${phone_no}`],
            message: `${hos_name}, imesajiliwa kikamilifu katita mfumo wa wa wagonjwa wa rufaa. Sasa inaweza kuanza kutumia rasmi mfumo`,
          };

          // sendSMS(options);

          // Send Email to Patient
          const text = `${hos_name}, welcome to Patient Referral Management System (PRMS), Now you can start using the system`;
          const subject = "PRMS - HOSPITAL REGISTRATION";

          // sendMail(email, text, subject);

          return res.status(201).json({
            Status: "Success",
            Message: "Hosptal Added Successfully!!",
            Result: result,
          });
        }
      });
    }
  });
};

export const editHospital = (req, res) => {
  const q =
    `UPDATE hospital SET name=?, location=?, email=?, phone_no=?, username=?, password=?, address=?, websiteURL=? WHERE id=?`;
  const id = req.params.id;
  const { name, location, email, phone_no, username, password, address, websiteURL } = req.body;

  con.query(
    q,
    [name, location, email, phone_no, username, password, address, websiteURL, id],
    (err, result) => {
      if (err) return res.json({ Message: "Error in Querying", Result: err });
      return res.json({ Status: "Success", Message: "Hospital Updated Successfully!!", Result: result });
    }
  );
};

export const getAllHospitals = (req, res) => {
  const q = "SELECT * FROM hospital";
  con.query(q, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.status(200).json({ Status: "Success", Result: result });
    }
  });
};

export const getSingleHospital = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM hospital WHERE id = ? LIMIT 1";
  con.query(q, [id], (err, data) => {
    if (err) {
      return res.json({ Error: err });
    } else {
      return res.status(200).json({ Status: "Success", Result: data });
    }
  });
};

export const getSingleHospitalCredentials = (req, res) => {
  const q = "SELECT email, phone_no FROM hospital WHERE name=?";
  const hospName = req.query.term;
  con.query(q, [hospName], (err, data) => {
    if (err) {
      return res.json({ Error: err });
    } else {
      return res.json({ Status: "Success", Result: data });
    }
  });
};

export const deleteHospital = (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM hospital WHERE id = ?";

  con.query(q, [id], (err, result) => {
    if (err) return res.json({ Message: "Error in Querying", Result: err });
    return res.json({
      Status: "Success",
      Message: "Hospital Deleted Successfully!!",
      Result: result,
    });
  });
};

export const countHospitals = (req, res) => {
  const q = `SELECT COUNT(*) AS hospitals FROM hospital`;
  con.query(q, (err, result) => {
    if (err) {
      return res.json({ Error: err });
    } else {
      return res.status(200).json({ Status: "Success", Result: result });
    }
  });
};

export const reportHospitals = (req, res) => {
  const q = `SELECT MONTHNAME(updated_at) AS month, COUNT(*) AS hospitals FROM hospital GROUP BY month`;
  con.query(q, (err, result) => {
    if (err) {
      return res.json({ Error: err });
    } else {
      return res.status(200).json({ Status: "Success", Result: result });
    }
  });
};
