import asyncHandler from "express-async-handler";
import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  //   console.log(req.body);
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email == "" ||
    password === ""
  ) {
    next(errorHandler(400, "errorHandler TakingCareOfIt: Fill all fields"));
    //উপরে next () এর ভিতরের পরিবরতে নিচের ২ line লেখা যেতো
    // res.status(400);
    // throw new Error("Please, Fill all fields");
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  try {
    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    }).save();
    res.status(200).json({
      success: true,
      message: newUser,
    });
  } catch (error) {
    next(error);
    //শুধু নিচের ৩ line লিখলে হতো
    // res.status(500).json({
    //   FullErrorMessage: error,
    //   MainErrorMessage: error.message,
    // });

    //শুদুহ নিচের line টা লিখলে কাজ করতো
    // throw new Error(error);
  }
});
