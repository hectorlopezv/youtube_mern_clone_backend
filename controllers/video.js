import { createError } from "../errors.js";

import User from "../models/user.js";
import Video from "../models/video.js";

export const createVideo = async (req, res, next) => {
  const newVideo = new Video({
    userId: req.user.id,
    ...req.body,
  });

  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id);
    if (!video) {
      next(createError(404, "Video not found"));
    }
    if (req.user.id === video.userId) {
      const updatedUser = await Video.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else {
      next(createError(403, "You are not authorized"));
    }
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id);
    if (!video) {
      next(createError(404, "Video not found"));
    }
    if (req.user.id === video.userId) {
      const deleteVideo = await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("your video has been deleted");
    } else {
      next(createError(403, "You are not authorized"));
    }
  } catch (error) {
    next(error);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("the view has been increased");
  } catch (error) {
    next(error);
  }
};

export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);

    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });

    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        const video = await Video.find({ userId: channelId });

        return video;
      })
    );
    const flatList = list.flat().sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json(flatList);
  } catch (err) {
    next(err);
  }
};
export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
