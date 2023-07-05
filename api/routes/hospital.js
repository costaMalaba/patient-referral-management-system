import express from 'express';
import { addHospital, countHospitals, deleteHospital, editHospital, getAllHospitals, getSingleHospital, getSingleHospitalCredentials, reportHospitals } from '../controller/hospital.js';

const router = express.Router();

router.route("/add").post(addHospital);
router.route("/get/all").get(getAllHospitals);
router.route("/get/single/:id").get(getSingleHospital);
router.route("/get/credentials").get(getSingleHospitalCredentials);
router.route("/edit/:id").put(editHospital);
router.route("/delete/:id").delete(deleteHospital);
router.route("/count").get(countHospitals);
router.route("/report").get(reportHospitals);

export default router;