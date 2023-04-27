import express from "express";
import dotenv from "dotenv";
import doctorRoutes from "./routes/doctors.js";

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use("/api/doctor", doctorRoutes);

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.json("Hello PRMS");
})

app.listen(PORT, (
    console.log(`App listening on port ${PORT}`)
));
