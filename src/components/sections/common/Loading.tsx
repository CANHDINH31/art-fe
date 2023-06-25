import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={"100vh"}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
