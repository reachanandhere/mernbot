import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { generateChatCompletion, sendUserChats } from "../controllers/chat-controller.js";
const chatRoutes = Router()

//P{rotected route}
chatRoutes.post("/new", validate(chatCompletionValidator),  verifyToken, generateChatCompletion )
chatRoutes.get("/all-chats",  verifyToken, sendUserChats )
export default chatRoutes;