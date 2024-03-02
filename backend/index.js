import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

//create express app
const app = express();
//create .env file connector with app
dotenv.config();

//Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/BookStore")
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

//Create backend listening port
app.listen(3000, () => {
  console.log(`Server is running in port  ${process.env.PORT} `);
});

//this is to test whether backend is runing or not
app.use("/test", (req, res) => {
  return res.status(202).json({
    success: true,
    message: "This is test purpose only",
  });
});
