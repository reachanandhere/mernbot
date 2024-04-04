import { Router } from "express";
import { getAllUsers, userSignIn, userSignUp, verifyLogin, verifyLogout } from "../controllers/user-controller.js";
import { signUpValidator, signInValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";


const userRoutes = Router()


userRoutes.get('/',getAllUsers)
userRoutes.post('/signup', validate(signUpValidator), userSignUp)
userRoutes.post('/signin', validate(signInValidator), userSignIn)
userRoutes.get('/auth-status', verifyToken, verifyLogin  )
userRoutes.get('/logout',verifyToken, verifyLogout)
export default userRoutes;