import User from "../models/user.js";
import { hash, compare } from "bcrypt";
export const getAllUsers = async (req, res, next) => {
    //get all users
    try {
        const users = await User.find();
        return res.status(200).json({
            message: "Users fetched",
            users,
        });
    }
    catch (err) {
        //console.log(err);
        return res.status(200).json({
            message: "Error",
            cause: err.message,
        });
    }
};
export const userSignUp = async (req, res, next) => {
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
        return res.status(201).json({
            message: "Users signed up",
            id: user._id.toString(),
        });
    }
    catch (err) {
        // console.log(err);
        return res.status(200).json({
            message: "Error",
            cause: err.message,
        });
    }
};
export const userSignIn = async (req, res, next) => {
    //get user details for signup
    try {
        const { email, password } = req.body;
        console.log("here", req.body);
        const user = await User.findOne({ email });
        if (!user)
            return res.status(401).send({ message: "User not registered!" });
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect)
            return res.status(403).send({ message: "Incorrect password!" });
        return res.status(200).json({
            message: "User signed in",
            id: user._id.toString(),
        });
    }
    catch (err) {
        // console.log(err);
        return res.status(200).json({
            message: "Error",
            cause: err.message,
        });
    }
};
//# sourceMappingURL=user-controller.js.map