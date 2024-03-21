import { Router } from "express";
import { getAllUsers, userSignIn, userSignUp } from "../controllers/user-controller.js";
import { signUpValidator, signInValidator, validate } from "../utils/validators.js";


const userRoutes = Router()


userRoutes.get('/',getAllUsers)
userRoutes.post('/signup', validate(signUpValidator), userSignUp)
userRoutes.post('/signin', validate(signInValidator), userSignIn)

export default userRoutes;