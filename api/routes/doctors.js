import express from 'express';
import { getDoctor, addDoctor } from '../controller/doctors.js';

const router = express.Router();

router.get("/", getDoctor);
router.post("/register", addDoctor);

export default router;