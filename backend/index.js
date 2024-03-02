import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

//importUser Route
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

//create express app
const app = express();

//allows front end json to reach to backend
app.use(express.json());

//tells you which path did client hit
app.use(morgan("dev"));

// cors , connects backend with frontend
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//     methods: ["GET", "POST", "DELETE", "PUT"],
//   })
// );

// cors , connects backend with frontend
//এখানে সব সময় frontend এর port number বশবে
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

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
app.use("/api/auth", authRoutes);

// এটা সব ধরনের error এর final destination । মানে জে কোন error ধরার পর এখানে এসে শেষ হয়। try catch এখানে এসে শেষ হয়।
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
