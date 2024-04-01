import { Avatar, Box } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";
import openai from "../shared/openai.png";

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
  } else return false;
  
}

const ChatItem = (props: { role: string; content: string }) => {
  const auth = useAuth();
  const messageBlocks = extractCodeFromString(props.content);

  return props.role == "assistant" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}>
      <Avatar
        sx={{
          ml: "0",
        }}
      >
        <img src={openai} width={"30px"} />
      </Avatar>
      <Box sx={{ display: "flex", alignItems: "center" }}>
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
              <SyntaxHighlighter style={coldarkCold} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <h3 style={{ color: "white", fontSize: "18px" }}>
                {props.content}
              </h3>
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
