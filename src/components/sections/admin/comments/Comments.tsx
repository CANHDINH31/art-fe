import React from "react";
import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  ChatBubbleBottomCenterIcon,
  HeartIcon,
  ArrowPathIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const Comments = () => {
  return (
    <Paper elevation={2} sx={{ height: "100%" }}>
      <Box p={4}>
        <Box py={2}>
          <Box display={"flex"} gap={2}>
            <Box
              component={"img"}
              width={40}
              height={40}
              sx={{ objectFit: "cover", borderRadius: "50%" }}
              src={
                "https://i.etsystatic.com/38163649/r/il/cd2bac/4797621280/il_794xN.4797621280_b90x.jpg"
              }
            />
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
            >
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Typography fontWeight={600}>art-painting</Typography>
                <Typography fontSize={12}>@dinhphamcanh</Typography>
                <Typography fontSize={12}>28/03/2024</Typography>
              </Box>
              <Typography fontSize={14}>Nice 🥰</Typography>
            </Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-around"}
            alignItems={"center"}
            mt={4}
          >
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <ChatBubbleBottomCenterIcon width={18} />
              <Typography fontSize={12}>365</Typography>
            </Box>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <ArrowPathIcon width={18} />
              <Typography fontSize={12}>365</Typography>
            </Box>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <HeartIcon width={18} />
              <Typography fontSize={12}>365</Typography>
            </Box>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <ChartBarIcon width={18} />
              <Typography fontSize={12}>365</Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box py={2}>
          <Box display={"flex"} gap={2}>
            <Box
              component={"img"}
              width={40}
              height={40}
              sx={{ objectFit: "cover", borderRadius: "50%" }}
              src={
                "https://i.etsystatic.com/38163649/r/il/cd2bac/4797621280/il_794xN.4797621280_b90x.jpg"
              }
            />
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
              flex={1}
            >
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Typography fontWeight={600}>art-painting</Typography>
                <Typography fontSize={12}>@dinhphamcanh</Typography>
              </Box>
              <TextField variant="standard" fullWidth />
              <Box mt={2} textAlign={"right"}>
                <Button variant="contained">Trả lời</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default Comments;
