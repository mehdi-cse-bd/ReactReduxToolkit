import asyncHandler from "express-async-handler";
import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(req.body);
  if (!email || !password || email == "" || password === "") {
    next(errorHandler(400, "errorHandler TakingCareOfIt: Fill all fields"));
    //উপরে next () এর ভিতরের পরিবরতে নিচের ২ line লেখা যেতো
    // res.status(400);
    // throw new Error("Please, Fill all fields");
  }

  try {
    const userExist = await User.findOne({
      email,
    });
    if (!userExist) {
      return next(
        errorHandler(400, "errorHandler TakingCareOfIt: User do not exist")
      );
    }
    const validatePassword = bcryptjs.compareSync(password, userExist.password);
    if (!validatePassword) {
      return next(
        errorHandler(400, "errorHandler TakingCareOfIt: Wrong Credentials")
      );
    }
    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRETE, {
      expiresIn: "1d",
    });
    const { password: NameItAnythingToSeparateItFromMainFile, ...rest } =
      userExist._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({ success: true, rest });
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
