import React from "react";
import { Link } from "react-router-dom";
import openai from "./openai.png";
import { Typography } from "@mui/material";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Link to={"/"}>
        <img
          src={openai}
          alt="Logo"
          width={"40px"}
          height={"40px"}
          className="image-inverted"
        />
      </Link>
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          ml : '5px',
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <span style={{ fontSize: "20px" }}>MERN</span>-BOT
      </Typography>
    </div>
  );
};

export default Logo;
