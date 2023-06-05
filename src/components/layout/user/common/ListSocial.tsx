import { Box } from "@mui/material";
import React from "react";
import { listSocialIcon } from "./data";
import SocialIcon from "./SocialIcon";

const ListSocial = () => {
  return (
    <Box display={"flex"} sx={{ cursor: "pointer" }} gap={4}>
      {listSocialIcon.map((social, index) => (
        <SocialIcon key={index} icon={social.icon} title={social.title} />
      ))}
    </Box>
  );
};

export default ListSocial;
