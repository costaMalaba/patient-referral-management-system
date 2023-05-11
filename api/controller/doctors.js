import con from "../db/database.js";
import bcrypt from "bcryptjs";

export const getDoctor = (req, res) => {
  const q = "SELECT * FROM doctor";
  con.query(q, (err, data) => {
    if (err) {
      return res.json({Error: err});
    } else {
      return res.status(200).json({Status: "Success", Result: data});
    }
  });
};

export const getSingleDoctor = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM doctor WHERE id = ?";
  con.query(q, [id], (err, data) => {
    if (err) {
      return res.json({Error: err});
    } else {
      return res.status(200).json({Status: "Success", Result: data});
    }
  });
};

export const addDoctor = (req, res) => {
  // CHECKING EXISTING DOCTOR
  const q1 =
    "SELECT * FROM doctor WHERE email = ? OR username = ?";
  con.query(
    q1,
    [
      req.body.email,
      req.body.username,
    ],
    (error, data) => {
      if (error) res.json({Message: "Error in Querying!!"});
      if (data.length > 0)
        return res.json({Status: "Error", Message: "Email or Username Already Used!!"});
      else {
        // Hash the password
        // const salt = bcrypt.genSaltSync(10);
        // const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO doctor VALUES (?)";
        // bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        //   if(err) return res.json({Error: "Error in hashing password"});
          const values = [
            ,
            req.body.first_name,
            req.body.middle_name,
            req.body.surname,
            req.body.specialization,
            req.body.age,
            req.body.gender,
            req.body.username,
            req.body.password,
            req.body.email,
            req.body.phone_no,
          ];

          con.query(q, [values], (error, result) => {
            if (error) {
              return res.json({Error: "Error in Query"});
            } else {
              return res.status(200).json({Status: "Success", Message: "Doctor Has Been Added", Result: result});
            }
          });
      
      }
    }
  );
};

export const editDoctor = (req, res) => {
  const id = req.params.id;
  const q= "UPDATE doctor SET first_name = ?, middle_name = ?, surname = ?, specialization = ?, age = ?, gender = ?, username = ?, email = ?, phone_no = ? WHERE id = ?"

  con.query(q, [req.body.first_name, req.body.middle_name, req.body.surname, req.body.specialization, req.body.age, req.body.gender, req.body.username, req.body.email, req.body.phone_no, id], (err, data) => {
    if(err) return res.json({Error: "Error in Querying"});
    return res.json({Status: "Success", Result: data});
  })
}

export const deleteDoctor = (req, res) => {
  const id = req.params.id;
  const q= "DELETE FROM doctor WHERE id = ?"

  con.query(q, [id], (err, data) => {
    if(err) return res.json({Error: "Error in Querying"});
    return res.json({Status: "Success", Message: "Doctor Deleted Successfully!!", Result: data});
  })
}