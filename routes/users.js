import { Router } from "express";
import {
  deleteUser,
  dislikeVideo,
  getUser,
  likeaVideo,
  subscribeUser,
  unSubscribeUser,
  updateUser,
} from "../controllers/user.js";

const router = Router();

//Update User
router.put("/:id", updateUser);

//Delete User
router.delete("/:id", deleteUser);

//Get a User
router.get("/find/:id", getUser);

//Subscribe User
router.put("/sub/:id", subscribeUser);

//unSubscribe User
router.put("/unsub/:id", unSubscribeUser);

//Like  A Video
router.put("/like/:id", likeaVideo);

//Dislike a Video
router.put("/dislike/:id", dislikeVideo);

export default router;
