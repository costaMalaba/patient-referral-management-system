import express from 'express';
import { getAllHospital } from '../controller/hospital.js';

const router = express.Router();

router.get("/", getAllHospital);

export default router;