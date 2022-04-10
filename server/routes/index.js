import { Router } from "express";
const router = Router();
import api from "./api.js";

router.use("/api", api);

export default router;

