import React, { useRef, useState } from "react";
import { Avatar, Box, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { sendChatRequest } from "../helpers/api-communicator";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const auth = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState([] as Message[]);
  const handleSubmit = async () => {
    const content = inputRef?.current?.value as string;
    if (inputRef && inputRef.current) inputRef.current.value = "";
    const newMessage: Message = { role: "user", content };
    setChatMessages((prevState) => [...prevState, newMessage]);

    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          mx: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
            p: 2,
            textAlign: "center",
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgColor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
          </Avatar>
          <h3>You are talking to a ChatBOT</h3>
          <p style={{ marginTop: "10px" }}>
            You can ask some anything related to knowledge, business, advices,
            education etc. Avoid sharing personal information.
          </p>

          <Button
            sx={{
              width: "100%",
              my: "auto",
              color: "white",
              fontWeight: 700,
              borderRadius: 3,
              bgcolor: red[400],
              ":hover": { bgcolor: red.A400 },
            }}
          >
            CLEAR CONVERSATION
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          width: "100%",
          flexDirection: "column",
          padding: { md: "0", xs: "0 10px", sm: "0 10px" },
        }}
      >
        <h1
          style={{
            fontWeight: "700",
            fontSize: "32px",
            margin: "0 auto 20px auto",
          }}
        >
          Model - GPT 3.5 Turbo
        </h1>
        <Box
          sx={{
            height: "60vh",
            width: "99%",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            scrollBehavior: "smooth",
            overflowY: "auto",
          }}
        >
          {chatMessages &&
            chatMessages.map((chat, index) => {
              return (
                //@ts-ignore
                <ChatItem
                  role={chat?.role}
                  content={chat?.content}
                  key={index}
                ></ChatItem>
              );
            })}
        </Box>

        <div
          style={{
            width: "98%",
            padding: "10px",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            margin: "10px 0",
          }}
        >
          <label style={{ position: "relative" }}>
            <svg
              viewBox="0 0 24 24"
              style={{ position: "absolute", right: 20, cursor: "pointer" }}
              width="40px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleSubmit}
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M15.5 16.5L12 13L8.5 16.5"
                  stroke="#ffffff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M15.5 10.5L12 7L8.5 10.5"
                  stroke="#ffffff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z"
                  stroke="#ffffff"
                  stroke-width="1.5"
                ></path>{" "}
              </g>
            </svg>
            <input
              type="text"
              ref={inputRef}
              style={{
                width: "100%",
                backgroundColor: "transparent",
                padding: "10px",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "20px",
              }}
            />
          </label>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
