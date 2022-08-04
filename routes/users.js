import { Router } from "express";
import {
  deleteUser,
  dislikeVideo,
  getUser,
  likeaVideo,
  subscribe,
  unSubscribeUser,
  updateUser,
} from "../controllers/user.js";
import { verifyToken } from "../veriftToken.js";

const router = Router();

//Update User
router.put("/:id", verifyToken, updateUser);

//Delete User
router.delete("/:id", verifyToken, deleteUser);

//Get a User
router.get("/find/:id", getUser);

//Subscribe User
router.put("/sub/:id", verifyToken, subscribe);

//unSubscribe User
router.put("/unsub/:id", verifyToken, unSubscribeUser);

//Like  A Video
router.put("/like/:videoId", verifyToken, likeaVideo);

//Dislike a Video
router.put("/dislike/:videoId", verifyToken, dislikeVideo);


export default router;
