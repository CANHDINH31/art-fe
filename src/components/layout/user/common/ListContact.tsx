import { Box } from "@mui/material";
import React from "react";
import Contact from "./Contact";
import ZaloContact from "../../../../../public/img/png/zaloContact.png";
import PhoneContact from "../../../../../public/img/png/phoneContact.png";

const ListContact = () => {
  return (
    <Box position={"fixed"} bottom={40} left={20} zIndex={1}>
      <Contact
        image={ZaloContact}
        bgFill={"rgba(33,150,243,.7)"}
        bsFill={"0 0 0 0 #2196F3"}
        bgCircle={"#2196F3"}
      />
      <Contact
        image={PhoneContact}
        bgFill={"rgb(32, 169, 204,0.7)"}
        bsFill={"0 0 0 0 #20a9cc"}
        bgCircle={"#20a9cc"}
      />
    </Box>
  );
};

export default ListContact;
