import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import openai from "../shared/openai.png";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  } 
  return false;
  
}

const ChatItem = (props: { role: string; content: string }) => {
  const auth = useAuth();
  const messageBlocks = extractCodeFromString(props.content);

  return props.role == "assistant" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2,   borderRadius: 2, }}>
      <Avatar
        sx={{
          ml: "0",
        }}
      >
        <img src={openai} width={"30px"} />
      </Avatar>
      <Box sx={{ alignItems: "center" }}>
        {!messageBlocks && (
          <h3
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              fontSize: "18px",
            }}
          >
            {props.content}
          </h3>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={dracula} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", gap: 2, my: 1 }}>
      <Avatar
        sx={{
          ml: "0",
          bgcolor: "black",
          color: "white",
        }}
      >
        {auth?.user?.name[0]}
      </Avatar>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <h3 style={{ color: "white", fontSize: "18px" }}>{props.content}</h3>
      </Box>
    </Box>
  );
};

export default ChatItem;
