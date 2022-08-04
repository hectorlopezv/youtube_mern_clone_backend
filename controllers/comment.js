import { createError } from "../errors.js";
import Comment from "../models/comments.js";
import Video from "../models/video.js";

export const addComments = async (req, res, next) => {
  try {
    const newComment = new Comment({ ...req.body, userId: req.user.id });
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComments = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    if (req.user.id !== req.params.id || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("comment deleted");
    } else {
      return next(
        createError(403, "You are not authorized to delete this comment")
      );
    }
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
