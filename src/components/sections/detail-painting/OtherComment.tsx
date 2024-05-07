import {
  EllipsisVerticalIcon,
  FaceSmileIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Box,
  Button,
  Divider,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import React, { useState, useRef, useEffect } from "react";
import { typeComment } from "@/src/lib/types";
import moment from "moment";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "@tanstack/react-query";
import { deleteComment, updateComment } from "@/src/lib/api";
import { convertUrlImage } from "@/src/lib/utils/common";

type Props = {
  comment: typeComment;
  isOwner: boolean;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
};

const OtherComment = ({ comment, isOwner, refetch }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const textFieldRef = useRef<HTMLInputElement | null>(null);
  const [isAddEmoji, setIsAddEmoji] = useState<boolean>(false);
  const [contentComment, setContentComment] = useState<string>("");
  const [selectionStart, setSelectionStart] = useState<number>(0);

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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setAnchorEl(null);
    setIsEdit(true);
    setContentComment(comment?.content);
  };

  const { mutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: async () => {
      setAnchorEl(null);
      await refetch();
    },
  });

  const { mutate: handleUpdateComment } = useMutation({
    mutationFn: async () =>
      await updateComment(comment?._id as string, { content: contentComment }),
    onSuccess: async () => {
      setIsEdit(false);
      await refetch();
    },
  });

  useEffect(() => {
    isEdit && textFieldRef?.current?.focus();
  }, [isEdit]);

  return (
    <Box display={"flex"} gap={4} mt={8}>
      <Box
        component={"img"}
        src={
          comment?.user_id?.image
            ? convertUrlImage(comment?.user_id?.image as string)
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

      {!isEdit ? (
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
        >
          <Box>
            <Box
              display={"flex"}
              gap={{ xs: 1, md: 2 }}
              alignItems={{ xs: "flex=start", md: "center" }}
              flexDirection={{ xs: "column", md: "row" }}
            >
              <Typography variant="h5" fontWeight={600}>
                {comment?.user_id?.email}
              </Typography>
              <Typography variant="h6">
                {moment(comment?.updatedAt).fromNow()}
              </Typography>
            </Box>
            <Box mt={1}>
              <Typography variant="h5" whiteSpace={"pre-line"}>
                {comment?.content}
              </Typography>
            </Box>
          </Box>
          {isOwner && (
            <Box>
              <Button onClick={handleClick}>
                <EllipsisVerticalIcon width={30} height={30} />
              </Button>
              <Popover
                sx={{ marginTop: 1 }}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Box sx={{ cursor: "pointer" }}>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    px={3}
                    py={2}
                    gap={2}
                    onClick={handleEdit}
                  >
                    <PencilSquareIcon height={18} color="#446084" />
                    <Typography variant="h5">Chỉnh sửa bình luận</Typography>
                  </Box>
                  <Divider />
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    px={3}
                    py={2}
                    gap={2}
                    onClick={() => mutate(comment?._id as string)}
                  >
                    <TrashIcon height={18} color="#446084" />
                    <Typography variant="h5">Xóa bình luận</Typography>
                  </Box>
                </Box>
              </Popover>
            </Box>
          )}
        </Box>
      ) : (
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
                onClick={() => setIsAddEmoji(!isAddEmoji)}
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
            <Box display={"flex"} gap={2} alignItems={"center"}>
              <Button
                size="medium"
                variant="outlined"
                color="error"
                onClick={() => setIsEdit(false)}
              >
                Huỷ
              </Button>
              <Button
                size="medium"
                variant="outlined"
                disabled={Boolean(!contentComment)}
                onClick={() => handleUpdateComment()}
              >
                Chỉnh sửa
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default OtherComment;
