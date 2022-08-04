import { Router } from "express";
import {
  addComments,
  deleteComments,
  getComments,
} from "../controllers/comment.js";
import { verifyToken } from "../veriftToken.js";

const router = Router();

router.post("/", verifyToken, addComments);
router.delete("/:id", verifyToken, deleteComments);
router.get("/:videoId", getComments);
export default router;
