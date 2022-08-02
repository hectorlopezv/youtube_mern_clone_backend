import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
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

app.listen(8800, () => {
  connect();
  console.log("Server is running on port 8800");
});
