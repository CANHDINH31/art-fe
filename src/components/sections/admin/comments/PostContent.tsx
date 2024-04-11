import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import {
  ChatBubbleBottomCenterIcon,
  HeartIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getDetailTweet } from "@/src/lib/api";
import moment from "moment";
import AttachmentIcon from "@mui/icons-material/Attachment";

const PostContent = () => {
  const router = useRouter();

  const { data, isLoading } = useQuery(
    ["detailTweet", router.query.id],
    async () => {
      try {
        const res = await getDetailTweet(router.query.id as string);
        return res.data;
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
            <Typography fontWeight={600}>{data?.name || "No Name"}</Typography>
            <Typography fontSize={12}>
              @{data?.username || "nousername"}
            </Typography>
          </Box>
          <IconButton
            size="small"
            href={data?.tweetUrl}
            target="_blank"
            color="primary"
          >
            <AttachmentIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box mt={8}>
          <Typography fontSize={14}>{data?.content}</Typography>
          <Typography
            mt={2}
            fontWeight={500}
            fontSize={14}
            color={"error"}
            whiteSpace={"wrap"}
          >
            {data?.hashtags?.map((e: string) => `${e} `)}
          </Typography>
          <Box mt={8}>
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
          <Box mt={8}>
            <Typography fontSize={14}>
              {data?.postedTime &&
                moment(data?.postedTime).format("YYYY-MM-DD HH:mm:ss")}{" "}
              <strong>· {data?.views}</strong> Lượt xem
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
                <Typography fontSize={12}>{data?.replies}</Typography>
              </Box>
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <ArrowPathIcon width={24} />
                <Typography fontSize={12}>{data?.retweets}</Typography>
              </Box>
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <HeartIcon width={24} />
                <Typography fontSize={12}>{data?.likes}</Typography>
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
