import { Router } from "express";
import {
  addView,
  createVideo,
  deleteVideo,
  getByTag,
  getVideo,
  random,
  search,
  sub,
  trend,
} from "../controllers/video.js";

import { verifyToken } from "../veriftToken.js";

const router = Router();

//Create a Video
router.post("/", verifyToken, createVideo);

//Update Video
router.put("/:id", verifyToken, getVideo);

//Delete Video
router.delete("/:id", verifyToken, deleteVideo);

//Get a Video
router.get("/find/:id", getVideo);

router.put("/view/:id", addView);

router.get("/trend", trend);

router.get("/random", random);

router.get("/sub", verifyToken, sub);

router.get("/tags", getByTag);

router.get("/search", search);

export default router;
