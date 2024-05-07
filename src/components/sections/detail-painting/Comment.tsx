import { FaceSmileIcon } from "@heroicons/react/24/outline";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useRef, useState } from "react";
import OtherComment from "./OtherComment";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createComment, getCommentByPaintId } from "@/src/lib/api";
import { typeComment } from "@/src/lib/types";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { convertUrlImage } from "@/src/lib/utils/common";

type Props = {
  paintId: string;
};

const Comment = ({ paintId }: Props) => {
  const { user } = useSelector((state: any) => state?.user);
  const textFieldRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const [isAddEmoji, setIsAddEmoji] = useState<boolean>(false);
  const [contentComment, setContentComment] = useState<string>("");
  const [selectionStart, setSelectionStart] = useState<number>(0);

  const { data: listComments, refetch: refetchGetListComments } = useQuery(
    ["listComments", paintId],
    async () => {
      const res = await getCommentByPaintId(paintId as string);
      return res.data;
    },
    {
      enabled: !!paintId,
    }
  );

  const { mutate, isLoading } = useMutation({
    mutationFn: createComment,
    onSuccess: async () => {
      await refetchGetListComments();
    },
  });

  const updateSelectionStart = () => {
    const textField = textFieldRef.current as HTMLInputElement | null;
    textField && setSelectionStart(textField.selectionStart as number);
  };

  const handleAddEmoji = (icon: string) => {
    setContentComment(
      contentComment.slice(0, selectionStart) +
        icon +
        contentComment.slice(selectionStart)
    );
    setSelectionStart(selectionStart + icon?.length);
  };

  return (
    <Box>
      {!user && (
        <Box
          mt={4}
          display={"flex"}
          justifyContent={"center"}
          gap={4}
          alignItems={"center"}
        >
          <Typography>Đăng nhập để bình luận</Typography>
          <Button
            variant="outlined"
            onClick={() => {
              router.push("/auth");
            }}
          >
            Đăng nhập
          </Button>
        </Box>
      )}

      <Box>
        <Typography>{listComments?.length} Bình luận</Typography>
      </Box>

      {isLoading ? (
        <Box display={"flex"} justifyContent={"center"}>
          <CircularProgress />
        </Box>
      ) : (
        user && (
          <Box display={"flex"} gap={4} mt={4} alignItems={"flex-start"}>
            <Box
              component={"img"}
              src={
                user?.image
                  ? convertUrlImage(user?.image)
                  : "/img/jpg/default-avatar.jpg"
              }
              width={40}
              height={40}
              sx={{
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: "50%",
              }}
            />
            <Box flex={1} display={"flex"} flexDirection={"column"} gap={2}>
              <TextField
                variant="standard"
                inputRef={textFieldRef}
                onSelect={updateSelectionStart}
                fullWidth
                placeholder="Viết bình luận ..."
                value={contentComment}
                onChange={(e) => setContentComment(e.target.value)}
                multiline
              />
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box sx={{ cursor: "pointer", position: "relative" }}>
                  <Box
                    width={40}
                    height={40}
                    bgcolor={isAddEmoji ? "rgba(229, 229, 229, 0.4)" : ""}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    borderRadius={"50%"}
                    onClick={() => {
                      setIsAddEmoji(!isAddEmoji);
                      textFieldRef?.current?.focus();
                    }}
                  >
                    <FaceSmileIcon width={28} height={28} color="#446084" />
                  </Box>
                  {isAddEmoji && (
                    <Box position={"absolute"} top={"100%"} left={"10px"}>
                      <Picker
                        data={data}
                        onEmojiSelect={(e: { native: string }) =>
                          handleAddEmoji(e.native)
                        }
                        emojiSize={14}
                        searchPosition={"none"}
                        previewPosition={"none"}
                      />
                    </Box>
                  )}
                </Box>
                <Button
                  size="medium"
                  variant="outlined"
                  disabled={Boolean(!contentComment)}
                  onClick={() => {
                    mutate({
                      visit: localStorage.getItem("visit") as string,
                      paint_id: paintId,
                      content: contentComment,
                    });
                    setContentComment("");
                    setIsAddEmoji(false);
                  }}
                >
                  Bình luận
                </Button>
              </Box>
            </Box>
          </Box>
        )
      )}

      <Box mt={4}>
        {listComments?.map((comment: typeComment) => (
          <OtherComment
            key={comment?._id}
            comment={comment}
            isOwner={user?._id == comment?.user_id?._id}
            refetch={refetchGetListComments}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Comment;
