import { Box, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import {
  ChatBubbleBottomCenterIcon,
  HeartIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const PostContent = () => {
  return (
    <Paper elevation={2} sx={{ height: "100%" }}>
      <Box p={4}>
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
            <Typography fontWeight={600}>art-painting</Typography>
            <Typography fontSize={12}>@dinhphamcanh</Typography>
          </Box>
        </Box>
        <Box mt={4}>
          <Typography fontSize={14}>
            ⏰ The countdown begins. BTC Halving nears... Are you prepared for
            what else is coming? Mine your BTC now .Heaven's Gate On Tianmen
            Mountain, Big Gate Road, China. This is Amazing.🔥
          </Typography>
          <Typography mt={2} fontWeight={500} fontSize={14} color={"error"}>
            #Bybit #btchalving
          </Typography>
          <Box mt={4}>
            <Box display={"flex"} justifyContent={"center"} gap={2}>
              <Box
                width={200}
                height={200}
                sx={{
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: 4,
                }}
                src={
                  "https://i.etsystatic.com/38163649/r/il/cd2bac/4797621280/il_794xN.4797621280_b90x.jpg"
                }
                component={"img"}
              />
              <Box
                width={200}
                height={200}
                sx={{
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: 4,
                }}
                src={
                  "https://i.etsystatic.com/38163649/r/il/cd2bac/4797621280/il_794xN.4797621280_b90x.jpg"
                }
                component={"img"}
              />
              <Box
                width={200}
                height={200}
                sx={{
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: 4,
                }}
                src={
                  "https://i.etsystatic.com/38163649/r/il/cd2bac/4797621280/il_794xN.4797621280_b90x.jpg"
                }
                component={"img"}
              />
              <Box
                width={200}
                height={200}
                sx={{
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: 4,
                }}
                src={
                  "https://i.etsystatic.com/38163649/r/il/cd2bac/4797621280/il_794xN.4797621280_b90x.jpg"
                }
                component={"img"}
              />
            </Box>
          </Box>
          <Box mt={4}>
            <Typography fontSize={14}>
              2:56 CH · 27 thg 3, 2024 <strong>· 9,1 Tr</strong> Lượt xem
            </Typography>
          </Box>
          <Box mt={8}>
            <Divider />
            <Box
              py={2}
              display={"flex"}
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <ChatBubbleBottomCenterIcon width={24} />
                <Typography fontSize={12}>365</Typography>
              </Box>
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <ArrowPathIcon width={24} />
                <Typography fontSize={12}>365</Typography>
              </Box>
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <HeartIcon width={24} />
                <Typography fontSize={12}>365</Typography>
              </Box>
            </Box>
            <Divider />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default PostContent;
