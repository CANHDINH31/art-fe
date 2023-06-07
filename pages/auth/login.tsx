import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const Login = () => {
  return (
    <Box
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Paper>
        <Box width={"25vw"}>
          <Typography variant="h3">Đăng nhập</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
