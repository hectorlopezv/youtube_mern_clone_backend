import { Router } from "express";
import testFn from "../controllers/user.js";

const router = Router();

router.get("/test", testFn);
export default router;
