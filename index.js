import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import commentRoutes from "./routes/comments.js";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
const app = express();
dotenv.config();
const connect = () => {
  const key = process.env.MONGO;
  mongoose
    .connect(key)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", commentRoutes);
app.listen(8800, () => {
  connect();
  console.log("Server is running on port 8800");
});
