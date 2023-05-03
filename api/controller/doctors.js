import con from "../db/database.js";
import bcrypt from "bcryptjs";

export const getDoctor = (req, res) => {
  const q = "SELECT * FROM doctor";
  con.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.status(200).json(data);
    }
  });
};

export const addDoctor = (req, res) => {
  // CHECKING EXISTING DOCTOR
  const q1 =
    "SELECT * FROM doctor WHERE (first_name = ? AND middle_name = ? AND surname = ?) OR username = ?";
  con.query(
    q1,
    [
      req.body.first_name,
      req.body.middle_name,
      req.body.surname,
      req.body.username,
    ],
    (error, data) => {
      if (error) throw error;
      if (data.length > 0)
        return res.status(409).json("Doctor Already Created!!");
      else {
        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO doctor VALUES (?)";
        const values = [
          ,
          req.body.first_name,
          req.body.middle_name,
          req.body.surname,
          req.body.specialization,
          req.body.username,
          hash,
        ];

        con.query(q, [values], (error, result) => {
          if (error) {
            return res.json(error);
          } else {
            return res.status(200).json("Doctor Has Been Added");
          }
        });
      }
    }
  );
};