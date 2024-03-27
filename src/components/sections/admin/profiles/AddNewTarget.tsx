import AddModal from "@/src/components/common/AddModal";
import { createTarget } from "@/src/lib/api/target";
import { Box, Chip, Grid, InputLabel, Stack, TextField } from "@mui/material";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  handleClose: () => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  profileId: string;
};

function AddNewTarget({ open, handleClose, refetch, profileId }: Props) {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [inputKeyword, setInputKeyword] = useState<string>("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [inputHashtag, setInputHashtag] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleCloseModal = () => {
    handleClose();
    reset();
    setKeywords([]);
    setHashtags([]);
  };

  const inputHashtagPress = (e: any) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      setHashtags([...hashtags, e.target.value]);
      setInputHashtag("");
    }
  };

  const inputKeywordPress = (e: any) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      setKeywords([...keywords, e.target.value]);
      setInputKeyword("");
    }
  };

  const removeKeyWordElement = (t: string) => {
    setKeywords(keywords?.filter((e) => e !== t));
  };

  const removeHashTagElement = (t: string) => {
    setHashtags(hashtags?.filter((e) => e !== t));
  };

  const handeCreateTarget = async (data: FieldValues) => {
    if (keywords?.length == 0 && hashtags?.length == 0) {
      toast.error("Bạn chưa tạo keyword hoặc hashtag");
    }
    try {
      const res = await createTarget({
        keywords: keywords,
        hashtags: hashtags,
        views: Number(data?.views),
        likes: Number(data?.likes),
        shares: Number(data?.shares),
        comments: Number(data?.comments),
        profile: profileId,
      });
      toast.success(res?.data?.message || "Thêm mới thành công");
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra");
    }
    handleCloseModal();
  };

  return (
    <AddModal
      title="THÊM PROFILE"
      open={open}
      handleClose={handleCloseModal}
      handleOk={handleSubmit((data) => handeCreateTarget(data))}
      maxWidth="md"
    >
      <Box>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <Stack gap={2}>
              <InputLabel sx={{ fontSize: 14 }}>Nhập keywords: </InputLabel>
              <TextField
                size="small"
                variant="standard"
                value={inputKeyword}
                onChange={(e) => setInputKeyword(e.target.value)}
                onKeyDown={inputKeywordPress}
                label="Nhấn enter để thêm keyword"
              />
              <Box display={"flex"} gap={2} flexWrap={"wrap"}>
                {keywords?.map((e) => (
                  <Chip
                    label={e}
                    size="small"
                    onDelete={() => removeKeyWordElement(e)}
                  />
                ))}
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack gap={2}>
              <InputLabel sx={{ fontSize: 14 }}>Nhập hashtags: </InputLabel>
              <TextField
                size="small"
                variant="standard"
                value={inputHashtag}
                onChange={(e) => setInputHashtag(e.target.value)}
                onKeyDown={inputHashtagPress}
                label="Nhấn enter để thêm hashtag"
              />
              <Box display={"flex"} gap={2}>
                {hashtags?.map((e) => (
                  <Chip
                    label={e}
                    size="small"
                    onDelete={() => removeHashTagElement(e)}
                  />
                ))}
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack gap={2}>
              <InputLabel sx={{ fontSize: 14 }}>
                Nhập số lượng views:
              </InputLabel>
              <TextField
                size="small"
                variant="standard"
                type="number"
                error={errors?.views ? true : false}
                {...register("views", {
                  required: "Trường này không được để trống",
                })}
                helperText={errors?.views?.message?.toString()}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack gap={2}>
              <InputLabel sx={{ fontSize: 14 }}>
                Nhập số lượng likes:
              </InputLabel>
              <TextField
                size="small"
                variant="standard"
                type="number"
                error={errors?.likes ? true : false}
                {...register("likes", {
                  required: "Trường này không được để trống",
                })}
                helperText={errors?.likes?.message?.toString()}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack gap={2}>
              <InputLabel sx={{ fontSize: 14 }}>
                Nhập số lượng shares:
              </InputLabel>
              <TextField
                size="small"
                variant="standard"
                type="number"
                error={errors?.shares ? true : false}
                {...register("shares", {
                  required: "Trường này không được để trống",
                })}
                helperText={errors?.shares?.message?.toString()}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack gap={2}>
              <InputLabel sx={{ fontSize: 14 }}>
                Nhập số lượng comments:
              </InputLabel>
              <TextField
                size="small"
                variant="standard"
                type="number"
                error={errors?.comments ? true : false}
                {...register("comments", {
                  required: "Trường này không được để trống",
                })}
                helperText={errors?.comments?.message?.toString()}
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </AddModal>
  );
}

export default AddNewTarget;
