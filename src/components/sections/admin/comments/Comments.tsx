import React from "react";
import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import {
  ChatBubbleBottomCenterIcon,
  HeartIcon,
  ArrowPathIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getByTweet, getDetailTweet } from "@/src/lib/api";
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

  const { data: reply, isLoading: isLoadingReply } = useQuery(
    ["reply", router.query.id],
    async () => {
      try {
        const res = await getByTweet(router.query.id as string);
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

  console.log(reply, "reply");

  if (isLoading || isLoadingReply) return <></>;

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
              <Typography fontSize={12}>{data?.views || 0}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        {reply && (
          <Box py={2}>
            <Box display={"flex"} gap={2}>
              <Box
                component={"img"}
                width={40}
                height={40}
                sx={{ objectFit: "cover", borderRadius: "50%" }}
                src={
                  reply?.tweet?.target?.profile?.avatar || "/img/png/NoData.png"
                }
              />
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
              >
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <Typography fontWeight={600}>
                    {reply?.tweet?.target?.profile?.name || "No Name"}
                  </Typography>
                  <Typography fontSize={12}>
                    @{reply?.tweet?.target?.profile?.username || "nousername"}
                  </Typography>
                  <Typography fontSize={12}>
                    {moment(data?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                  </Typography>
                </Box>
                <Typography fontSize={14}>{reply?.comment}</Typography>
              </Box>
              <IconButton
                color="primary"
                size="small"
                href={`https://twitter.com/${reply?.tweet?.target?.profile?.username}/status/${reply.tweetId}`}
                target="_blank"
              >
                <AttachmentIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-around"}
              alignItems={"center"}
              mt={8}
            >
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <ChatBubbleBottomCenterIcon width={18} />
                <Typography fontSize={12}>{reply?.replies}</Typography>
              </Box>
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <ArrowPathIcon width={18} />
                <Typography fontSize={12}>{reply?.retweets}</Typography>
              </Box>
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <HeartIcon width={18} />
                <Typography fontSize={12}>{reply?.likes}</Typography>
              </Box>
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <ChartBarIcon width={18} />
                <Typography fontSize={12}>{reply?.views}</Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default Comments;
