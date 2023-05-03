import con from "../db/database.js";
import bcrypt from "bcryptjs";
import { json } from "express";
import jwt from "jsonwebtoken";

export const logIn = (req, res) => {
  const q = "SELECT * FROM doctor WHERE username = ? AND password = ?";

  con.query(q, [req.body.username, req.body.password], (error, data) => {
    if (error) {
      return res.json(error);
    }
    if (data.length > 0) {
        const username = data[0].username;
        const log_code = data[0].login_as;
        const token = jwt.sign({username}, "our-jsonwebtoken-secrety-key", {expiresIn: "3s"});
        res.cookie("token", token);
        if(log_code === 0) {
          return res.json({Status: "A_Success"});
        } else {
          return res.json({Status: "D_Success"});
        }
    } else {
        return res.json({Message: "User Not Found"});
    }
  });
};

export const logOut = (req, res) => {};
