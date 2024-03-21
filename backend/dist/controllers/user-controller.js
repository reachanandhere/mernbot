import User from "../models/user.js";
export const getAllUsers = async (req, res, next) => {
    //get all users
    try {
        const users = await User.find();
        return res.status(200).json({
            message: "Users fetched", users
        });
    }
    catch (err) {
        console.log(err);
        return res.status(200).json({
            message: "Error", cause: err.message
        });
    }
};
//# sourceMappingURL=user-controller.js.map