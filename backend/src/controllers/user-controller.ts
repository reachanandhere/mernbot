import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get all users
  try {
    const users = await User.find();
    return res.status(200).json({
        message: "Users fetched", users
    });
  } catch (err) {
      console.log(err);
    return res.status(200).json({
        message: "Error", cause: err.message
    });
  }
};
