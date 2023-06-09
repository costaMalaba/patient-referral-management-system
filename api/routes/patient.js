import express from 'express';
import { getAllPatient, getSearchedPatients, getSinglePatient, reportPatients, countPatients, addPatient, editPatient, deletePatient, editPatientHealthStatus } from '../controller/patient.js';

const router = express.Router();

router.get("/patients", getAllPatient);
router.get("/patient/:id", getSinglePatient);
router.get("/search/", getSearchedPatients);
router.route("/count").get(countPatients);
router.route("/report").get(reportPatients);
router.post("/", addPatient);
router.put("/patient/:id", editPatient);
router.put("/patient/status/:id", editPatientHealthStatus);
router.delete("/patient/:id", deletePatient);
export default router;