import express from 'express';
import { getDoctor } from '../controller/doctors.js';

const router = express.Router();

router.get("/", getDoctor);

export default router;