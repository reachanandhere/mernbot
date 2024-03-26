import { Box } from "@mui/material";
import React from "react";
import airobot from "../components/shared/airobot.png";
import CustomizedInout from "../components/shared/CustomizedInout";

const Login = () => {
  return (
    <Box display="flex" flex={1} height={"100%"} width={"100%"}>
      <Box
        padding={8}
        margin={8}
        display={{ md: "flex", sm: "none", xs: "none" }}
      >
        <img src={airobot} style={{ width: "40vh" }} />
      </Box>
     
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 1 }}
        justifyContent={"center"}
        alignItems={"center"}
        ml={"auto"}
        mt={16}
        padding={2}
      >
        <form
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            border: "none",
            borderRadius: "10px",
          }}
        >
          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
            <h2 style={{textAlign: 'center'}}>Login</h2>
            <CustomizedInout type="email" name='email' label="Email" />
            <CustomizedInout type="password" name='password' label="Password" />
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
