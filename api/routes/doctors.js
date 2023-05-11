import express from 'express';
import { getDoctor, addDoctor, editDoctor, getSingleDoctor, deleteDoctor } from '../controller/doctors.js';

const router = express.Router();

router.get("/", getDoctor);
router.get("/:id", getSingleDoctor);
router.post("/register", addDoctor);
router.put("/:id", editDoctor);
router.delete("/doctor/:id", deleteDoctor);

export default router;