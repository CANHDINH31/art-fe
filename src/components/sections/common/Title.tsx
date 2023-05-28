import { theme } from "@/src/styles";
import { Box, Typography } from "@mui/material";
import React from "react";

type Props = {
  title: string;
  color?: string;
};

const Title = ({ title, color = theme.palette.primary.main }: Props) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={4}
      textAlign={"center"}
    >
      <Box flex={1} borderBottom={`2px solid ${theme.palette.border.main}`} />
      <Box>
        <Typography
          fontWeight={600}
          color={color}
          sx={{ fontSize: { xs: 16, lg: 20 } }}
        >
          {title}
        </Typography>
      </Box>
      <Box flex={1} borderBottom={`2px solid ${theme.palette.border.main}`} />
    </Box>
  );
};

export default Title;
