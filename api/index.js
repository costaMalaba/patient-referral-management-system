import express from "express";
import dotenv from "dotenv";
import getDoctor from "./routes/doctors.js";
import addDoctor from "./routes/doctors.js";
import logIn from "./routes/auth.js"
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST, GET"],
    credentials: true
}))
app.use("/api/doctor",getDoctor);
app.use("/api/doctor", addDoctor);
app.use("/login", logIn);

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.json("Hello PRMS");
});

app.listen(PORT, (
    console.log(`App listening on port ${PORT}`)
));