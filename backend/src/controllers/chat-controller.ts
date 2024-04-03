import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
import { configureOpenAi } from "../config/openai-config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try{
    const { message } = req.body;
  const user = await User.findById(res.locals.jwtData.id);
  if (!user)
    return res
      .status(401)
      .json({ message: "User not registered or Token malfunctioned." });
  //grab chats of user
  //send all chats with the new one
  const chats = user.chats.map(({ role, content }) => ({ role, content })) as ChatCompletionRequestMessage[];
  chats.push({
    role: "user",
    content: message,
  });
  user.chats.push({ role: "user", content: message });
  const config = configureOpenAi();
  const openAI = new OpenAIApi(config)
  const chatResponse = await openAI.createChatCompletion({
    model: 'gpt-3.5-turbo-16k',
    messages: chats
  })
  user.chats.push(chatResponse.data.choices[0].message)
  await user.save()
  return res.status(200).json({chats: user.chats})
  } catch(err){
    return res.status(200).json({message: "Something went wrong!"})
  }
};

export const sendUserChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get user details for signup
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .send({ message: "User not registered or Token malfunctioned" });

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send({ message: "User and Token didnt match" });
    }
    return res.status(200).json({
      message: "Chats",
      chats: user.chats,
    });
  } catch (err) {
    return res.status(200).json({
      message: "Error",
      cause: err.message,
    });
  }
};
