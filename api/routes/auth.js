import express from 'express';
import {logIn, logOut} from '../controller/auth.js';
import { verifyUser } from '../controller/auth.js';

const router = express.Router();

router.post("/auth", logIn);

export default router;