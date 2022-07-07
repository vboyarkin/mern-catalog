import { Router } from "express";
import api from "./api.js";
const router = Router();

router.use("/api", api);

export default router;

