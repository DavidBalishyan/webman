import express from "express";
import { logRequest } from "../controllers/request.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/log", authenticateToken, logRequest);

export default router;
