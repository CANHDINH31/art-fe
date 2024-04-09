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
  const [urls, setUrls] = useState<string[]>([]);
  const [inputUrl, setInputUrl] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [inputKeyword, setInputKeyword] = useState<string>("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [inputHashtag, setInputHashtag] = useState<string>("");

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleCloseModal = () => {
    handleClose();
    reset();
    setUrls([]);
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

  const inputUrlPress = (e: any) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      setUrls([...urls, e.target.value]);
      setInputUrl("");
    }
  };

  const inputKeywordPress = (e: any) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      setKeywords([...keywords, e.target.value]);
      setInputKeyword("");
    }
  };

  const removeUrlElement = (t: string) => {
    setUrls(urls?.filter((e) => e !== t));
  };

  const removeKeyWordElement = (t: string) => {
    setKeywords(keywords?.filter((e) => e !== t));
  };

  const removeHashTagElement = (t: string) => {
    setHashtags(hashtags?.filter((e) => e !== t));
  };

  const handeCreateTarget = async (data: FieldValues) => {
    if (keywords?.length == 0 && hashtags?.length == 0 && urls?.length == 0) {
      return toast.error("Bạn chưa tạo url, keyword hoặc hashtag");
    }
    try {
      const res = await createTarget({
        urls: urls,
        keywords: keywords,
        hashtags: hashtags,
        profile: profileId,
      });
      toast.success(res?.data?.message || "Thêm mới thành công");
      setInputKeyword("");
      setInputUrl("");
      setInputHashtag("");
      refetch();
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
    >
      <Box>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Stack gap={2}>
              <InputLabel sx={{ fontSize: 14 }}>Nhập urls: </InputLabel>
              <TextField
                size="small"
                variant="standard"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                onKeyDown={inputUrlPress}
                label="Nhấn enter để thêm url"
              />
              <Box display={"flex"} gap={2} flexWrap={"wrap"}>
                {urls?.map((e) => (
                  <Chip
                    label={e}
                    size="small"
                    onDelete={() => removeUrlElement(e)}
                  />
                ))}
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
              <Box display={"flex"} gap={2} flexWrap={"wrap"}>
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
        </Grid>
      </Box>
    </AddModal>
  );
}

export default AddNewTarget;
