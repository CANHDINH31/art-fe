import { Box, CircularProgress } from "@mui/material";
import React from "react";

type Props = {
  minHeight?: string;
};

const Loading = ({ minHeight }: Props) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={minHeight || "100vh"}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
