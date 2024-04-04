import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          padding: 20,
          minHeight: "5vh",
        
          marginTop: 50,
        }}
      >
        <p style={{fontSize:'30px', textAlign:'center'}}>
            Built by <span className="nav-link"><Link to={'https://github.com/reachanandhere'}>Anand Verma </Link></span>💛
        </p>
      </div>
    </footer>
  );
};

export default Footer;
