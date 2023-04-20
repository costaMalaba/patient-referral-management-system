import express from "express";
import con from "./db/database.js"
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.json("Hello PRMS");
})

app.get("/patient", (req, res) => {    
    const q = "SELECT * FROM patient";
    con.query(q, (err, data) => {
        if(err)
        {
            return res.json(err)
        }
        else
        {
            return res.json(data);
        }
    });
})

app.listen(PORT, (
    console.log(`App listening on port ${PORT}`)
));
