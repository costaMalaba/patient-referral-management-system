import express from 'express';
import { getAllPatients, getSinglePatient, addPatient, editPatient, deletePatient } from '../controller/patient.js';

const router = express.Router();

router.get("/patient", getAllPatients);
router.get("/patient/:id", getSinglePatient);
router.post("/", addPatient);
router.put("/patient/:id", editPatient);
router.delete("/patient/:id", deletePatient);
export default router;