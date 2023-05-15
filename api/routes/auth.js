import express from 'express';
import {logIn, logOut} from '../controller/auth.js';

const router = express.Router();

router.post("/auth", logIn);
router.post("/auth", logOut);


export default router;