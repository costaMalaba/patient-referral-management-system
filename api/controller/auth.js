import con from "../db/database.js";
import bcrypt from "bcryptjs";
import { json, response } from "express";
import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if(!token) {
      return res.json({Message: "We need token, please provide it!"})
  } else {
      jwt.verify(token, "our-jsonwebtoken-secrety-key", (err, decoded) => {
        if(err) {
          return res.json({Message: "Authentication Error"})
        } else {
          req.username = decoded.username;
          next();
        }
      })
  }
}

export const logIn = (req, res) => {
  const q = "SELECT * FROM doctor WHERE username = ?";

  con.query(q, [req.body.username], (error, data) => {
    if (error) {
      return res.json({Status: "Error", Error: "Error in running Query"});
    }
    if (data.length > 0) {
        bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
          if(err) return res.json({Error: "Password Error"});
          const id = data[0].id;
          const token = jwt.sign({id}, "jwtk-secrety-key", {expiresIn: "1d"});
          res.cookie("token", token);
          return res.json({Status: "Success"});
        })
    } else {
        return res.json({Staus: "Erros", Error: "Wrong Username or Password"});
    }
  });
};

export const logOut = (req, res) => {};
