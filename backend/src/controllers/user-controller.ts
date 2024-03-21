import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
import { hash } from "bcrypt";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get all users
  try {
    const users = await User.find();
    return res.status(200).json({
      message: "Users fetched",
      users,
    });
  } catch (err) {
    //console.log(err);
    return res.status(200).json({
      message: "Error",
      cause: err.message,
    });
  }
};

export const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get user details for signup
  try {
    console.log(req.body)
    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return res.status(200).json({
      message: "Users signed up",
      id: user._id.toString(),
    });
  } catch (err) {
    // console.log(err);
    return res.status(200).json({
      message: "Error",
      cause: err.message,
    });
  }
};
