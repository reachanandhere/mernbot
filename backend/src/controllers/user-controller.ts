import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

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
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(201).json({
        message: "Email Id already exisis",
      });
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

  
     //creating a token when user sign up
     const token = createToken(user._id.toString(), user.email, "7d")

     //setting expiry date for cookie
     const expires = new Date()
     expires.setDate(expires.getDate()+7)
     res.cookie(COOKIE_NAME, token, {
       path: '/',
       domain: 'localhost',
       expires: expires,
       httpOnly: true,
       signed: true
     })  

    return res.status(201).json({
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

export const userSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get user details for signup
  try {
    const { email, password } = req.body;
   
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send({ message: "User not registered!" });
    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(403).send({ message: "Incorrect password!" });


    //clearning cookie if user logs in  
    res.clearCookie(COOKIE_NAME, {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      signed: true
    })

    //creating a token when user logs in
    const token = createToken(user._id.toString(), user.email, "7d")

    //setting expiry date for cookie
    const expires = new Date()
    expires.setDate(expires.getDate()+7)
    res.cookie(COOKIE_NAME, token, {
      path: '/',
      domain: 'localhost',
      expires: expires,
      httpOnly: true,
      signed: true
    })
      return res.status(200).json({
        message: "User signed in",
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
