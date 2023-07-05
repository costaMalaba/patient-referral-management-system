import express from "express";
import dotenv from "dotenv";
import logIn from "./routes/auth.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import hospital from "./routes/hospital.js";
import doctor from "./routes/doctors.js"
import patient from "./routes/patient.js"
import schedule from "./routes/schedule.js";
import md_history from "./routes/md_history.js";
import referral from "./routes/referral.js";

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}))

app.use("/login", logIn);

// Hospitals
app.use("/hospital", hospital);

// Doctors
app.use("/get", doctor);
app.use("/doctor", doctor);
app.use("/editDoctor/", doctor);
app.use("/delete/", doctor);

// Patients
app.use("/result", patient);
app.use("/patient/add", patient);
app.use("/patient", patient);
app.use("/edit/", patient);
app.use("/delete/", patient);

// Schedules
app.use("/schedule", schedule);

// Medical Histories
app.use("/md_history", md_history);

// Referral
app.use("/referral", referral);

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.json("Hello PRMS");
});

app.listen(PORT, (
    console.log(`App listening on port ${PORT}`)
));