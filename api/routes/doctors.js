import express from 'express';
import { getDoctor, addDoctor, editDoctor, getSingleDoctor } from '../controller/doctors.js';

const router = express.Router();

router.get("/", getDoctor);
router.get("/:id", getSingleDoctor);
router.post("/register", addDoctor);
router.put("/:id", editDoctor)

export default router;