import React from "react";
import TextField from "@mui/material/TextField";
type Props = {
  name: string;
  type: string;
  label: string;
};
const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"

      InputLabelProps={{ style: { color: "white", borderColor: 'white'} }}
      name={props.name}
     
      type={props.type}
      placeholder={props.label}
      InputProps={{
        style: {
          width: "400px",
          borderRadius: 10,
          borderColor: 'white',
          fontSize: 20,
          color: "white",
         
        },
      }}
    />
  );
};

export default CustomizedInput;