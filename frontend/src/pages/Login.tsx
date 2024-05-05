import { Box, Button } from "@mui/material";
import { IoIosLogIn } from "react-icons/io";
import airobot from "../components/shared/airobot.png";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate =  useNavigate()
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      // toast.loading("Signing in!", { id: "login" });
      await auth?.login(email, password);
      //toast.success("Signed in successfully!", { id: "login" });
      navigate('/chat')
    } catch (err) {
      toast.error("Sign in failed!", { id: "login" });
    }
  };


  useEffect(()=>{
    if(auth?.isLoggedIn) return navigate('/chat')
  },[auth])


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
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            border: "none",
            borderRadius: "10px",
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <h2 style={{ textAlign: "center" }}>Login</h2>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 2,
                mt: 2,
                width: "100%",
                borderRadius: 2,
                bgcolor: "#51538f",
                color: "white",
              }}
              endIcon={<IoIosLogIn />}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
