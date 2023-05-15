import express from "express";
import dotenv from "dotenv";
import logIn from "./routes/auth.js"
import getAllHospital from "./routes/hospital.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import doctor from "./routes/doctors.js"
import patient from "./routes/patient.js"

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

app.use("/api/doctor", doctor);
app.use("/api/doctor/", doctor);
app.use("/api/doctor", doctor);
app.use("/editDoctor/", doctor);
app.use("/delete/", doctor);

app.use("/hospital", getAllHospital);

app.use("/patient/add", patient);
app.use("/get", patient);
app.use("/edit/", patient);
app.use("/delete/", patient);

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.json("Hello PRMS");
});

app.listen(PORT, (
    console.log(`App listening on port ${PORT}`)
));