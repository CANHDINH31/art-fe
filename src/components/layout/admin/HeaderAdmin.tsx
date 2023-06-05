import { Box, Typography, Paper } from "@mui/material";
import React from "react";

const HeaderAdmin = () => {
  return (
    <Paper>
      <Box
        height={100}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box textAlign={"center"}>
          <Typography color="primary.main" variant="h2" fontWeight={600}>
            Dashboard
          </Typography>
          <Typography color="primary.main" variant="body1">
            Welcome to management software
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default HeaderAdmin;
