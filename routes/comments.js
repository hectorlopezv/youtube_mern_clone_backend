import { Router } from "express";
import testFn from "../controllers/comment.js";

const router = Router();

router.get("/test", testFn);
export default router;
