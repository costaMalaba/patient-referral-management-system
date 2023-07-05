import express from 'express';
import { addMdHistory, getAllMedicalHistories, getSingleMdHistory } from '../controller/md_history.js';

const router = express.Router();

router.route("/add").post(addMdHistory);
router.route("/get/all").get(getAllMedicalHistories);
router.route("/get/Single/:id").get(getSingleMdHistory);

export default router;