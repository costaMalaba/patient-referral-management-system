import express from 'express';
import { getAllDoctor, getSearchedDoctors, addDoctor, editDoctor, getSingleDoctor, deleteDoctor, reportDoctors } from '../controller/doctors.js';

const router = express.Router();

router.get("/doctor", getAllDoctor);
router.get("/search/", getSearchedDoctors);
router.get("/:id", getSingleDoctor);
router.route("/report/data").get(reportDoctors);
router.route("/register").post(addDoctor);
router.put("/:id", editDoctor);
router.delete("/doctor/:id", deleteDoctor);

export default router;