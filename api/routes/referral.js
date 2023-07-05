import express from 'express';
import { addReferral, countReferrals } from '../controller/referral.js';


const router = express.Router();

router.route("/add").post(addReferral);
router.route("/count").get(countReferrals);


export default router;