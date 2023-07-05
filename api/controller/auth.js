import con from "../db/database.js";

export const logIn = (req, res) => {
  const q = "SELECT * FROM hospital WHERE username = ? AND password = ? LIMIT 1";
  const { username, password } = req.body;

  con.query(q, [username, password], (error, data) => {
    if (error) {
      return res.json({Status: "Error", Error: "Error in running Query", Result: error });
    }
    if (data.length === 1) {
          return res.json({Status: "Success", Message: "Logged In successfully!!", Result: data});
        
    } else if (username === "Admin" && password === "admin1234") {
      return res.json({Status: "Success", Message: "Logged In successfully!!" , Result: data});
    }else {
        return res.json({Staus: "Erros", Error: "Wrong Username or Password"});
    }
  });
};



export const logOut = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).json({Satus: "Success", Message: "User has been logged out."});
};
