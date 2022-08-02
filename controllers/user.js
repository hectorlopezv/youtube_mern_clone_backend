import User from "../models/user.js";

export const updateUser = async (req, res, next) => {
  if (req.params.id == req.user.id) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You are not authorized"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id == req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You are not authorized"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successfull.")
  } catch (err) {
    next(err);
  }
};

export const unSubscribeUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });

    res.status(200).json("User has been subscribed");
  } catch (error) {
    next(error);
  }
};

export const likeaVideo = async (req, res) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const dislikeVideo = async (req, res) => {
  try {
  } catch (error) {
    next(error);
  }
};
