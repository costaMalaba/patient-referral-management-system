import express from "express";
const router = express.Router();

import { addSchedule, getAllSchedules, getSearchedSchedules, reportSchedules, getSingleSchedule, countSchedules, editSchedule, editScheduleStatus, deleteSchedule, getAllSchedulesSent } from "../controller/schedule.js";

router.route("/add").post(addSchedule);
router.route("/view").get(getAllSchedules);
router.route("/view/sent").get(getAllSchedulesSent);
router.route("/count").get(countSchedules);
router.route("/report").get(reportSchedules);
router.route("/view/:id").get(getSingleSchedule);
router.route("/delete/:id").delete(deleteSchedule);
router.route("/edit/:id").put(editSchedule);
router.route("/edit/status/:id").put(editScheduleStatus);

export default router;