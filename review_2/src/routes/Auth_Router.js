import express from "express";

import { authorization } from "../controllers/AuthController.js";

const router = express.Router();

router.post('/' , authorization)

export { router };