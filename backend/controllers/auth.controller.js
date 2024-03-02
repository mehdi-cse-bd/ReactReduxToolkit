import asyncHandler from "express-async-handler";
import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";

export const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email == "" ||
    password === ""
  ) {
    res.status(400);
    throw new Error("Please, Fill all fields");
  }
  //   const userExist = await User.findOne({ email });
  //   if (userExist) {
  //     res.status(400);
  //     throw new Error("User Already Exists");
  //   }
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
    res.status(500).json({ message: error.message });
  }
});
