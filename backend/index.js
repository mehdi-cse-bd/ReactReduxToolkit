import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

//importUser Route
import userRoutes from "./routes/user.routes.js";

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

//this is to test whether backend is running or not
app.use("/test", (req, res) => {
  return res.status(202).json({
    success: true,
    message: "This is test purpose only",
  });
});

// create route with spacific routes
app.use("/api/user", userRoutes);
