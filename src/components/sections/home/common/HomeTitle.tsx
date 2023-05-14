import { theme } from "@/src/styles";
import { Box, Typography } from "@mui/material";
import React from "react";

type Props = {
  title: string;
  color?: string;
};

const HomeTitle = ({ title, color = theme.palette.primary.main }: Props) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={4}
    >
      <Box flex={1} borderBottom={`2px solid ${theme.palette.border.main}`} />
      <Box>
        <Typography variant="h3" fontWeight={600} color={color}>
          {title}
        </Typography>
      </Box>
      <Box flex={1} borderBottom={`2px solid ${theme.palette.border.main}`} />
    </Box>
  );
};

export default HomeTitle;
