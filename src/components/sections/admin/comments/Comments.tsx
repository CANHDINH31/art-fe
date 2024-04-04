import React from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
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
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getDetailTweet } from "@/src/lib/api";
import { toast } from "react-toastify";
import moment from "moment";
import AttachmentIcon from "@mui/icons-material/Attachment";

const Comments = () => {
  const router = useRouter();

  const { data, isLoading } = useQuery(
    ["topCommentTweet", router.query.id],
    async () => {
      try {
        const res = await getDetailTweet(router.query.id as string);
        return res.data?.topComment;
      } catch (err: any) {
        toast.error(err?.message || "Có lỗi xảy ra");
        throw err;
      }
    },
    {
      enabled: !!router.query.id,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <></>;

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
              src={data?.avatar || "/img/png/NoData.png"}
            />
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
            >
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Typography fontWeight={600}>
                  {data?.name || "No Name"}
                </Typography>
                <Typography fontSize={12}>
                  @{data?.username || "nousername"}
                </Typography>
                <Typography fontSize={12}>
                  {data?.postedTime &&
                    moment(data?.postedTime).format("YYYY-MM-DD HH:mm:ss")}
                </Typography>
              </Box>
              <Typography fontSize={14}>{data?.content}</Typography>
            </Box>
            <IconButton
              color="primary"
              size="small"
              href={data?.tweetUrl}
              target="_blank"
            >
              <AttachmentIcon fontSize="small" />
            </IconButton>
          </Box>
          {data?.images && (
            <Box mt={4}>
              <Box display={"flex"} justifyContent={"center"} gap={2}>
                {data?.images?.map((e: string, index: number) => (
                  <Box
                    key={index}
                    width={150}
                    height={150}
                    sx={{
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: 2,
                    }}
                    src={e}
                    component={"img"}
                  />
                ))}
              </Box>
            </Box>
          )}
          <Box
            display={"flex"}
            justifyContent={"space-around"}
            alignItems={"center"}
            mt={8}
          >
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <ChatBubbleBottomCenterIcon width={18} />
              <Typography fontSize={12}>{data?.replies}</Typography>
            </Box>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <ArrowPathIcon width={18} />
              <Typography fontSize={12}>{data?.retweets}</Typography>
            </Box>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <HeartIcon width={18} />
              <Typography fontSize={12}>{data?.likes}</Typography>
            </Box>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <ChartBarIcon width={18} />
              <Typography fontSize={12}>{data?.views}</Typography>
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
