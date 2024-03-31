import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TrashIcon } from "@heroicons/react/24/outline";
import { typeTarget } from "@/src/lib/types";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteTarget, updateTarget } from "@/src/lib/api/target";

type Props = {
  info: typeTarget;
  index: number;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
};

const DetailTarget = ({ info, index, refetch }: Props) => {
  const [urls, setUrls] = useState<string[]>([]);
  const [inputUrl, setInputUrl] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [inputKeyword, setInputKeyword] = useState<string>("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [inputHashtag, setInputHashtag] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      views: info.views,
      likes: info.likes,
      comments: info.comments,
      shares: info?.shares,
    },
  });

  const removeUrlElement = (t: string) => {
    setUrls(urls?.filter((e) => e !== t));
  };

  const removeKeyWordElement = (t: string) => {
    setKeywords(keywords?.filter((e) => e !== t));
  };

  const removeHashTagElement = (t: string) => {
    setHashtags(hashtags?.filter((e) => e !== t));
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

  const handleRemoveTarget = async () => {
    try {
      await deleteTarget(info._id as string);
      refetch();
      toast.success("Xóa target thành công");
    } catch (error) {
      console.log(error);
      toast.error("Xóa target thất bại");
    }
  };

  const handleUpdateTarget = async (data: typeTarget) => {
    if (keywords?.length == 0 && hashtags?.length == 0 && urls?.length == 0) {
      return toast.error(
        `Bạn chưa tạo url, keyword hoặc hashtag ở target số ${index}`
      );
    }
    try {
      await updateTarget(info?._id as string, {
        urls: urls,
        keywords: keywords,
        hashtags: hashtags,
        views: Number(data?.views),
        likes: Number(data?.likes),
        shares: Number(data?.shares),
        comments: Number(data?.comments),
      });
      refetch();
      toast.success("Cập nhật thành công");
    } catch (error) {
      toast.error("Cập nhật thất bại");
      console.log(error);
    }
  };

  useEffect(() => {
    setKeywords(info?.keywords as string[]);
    setHashtags(info?.hashtags as string[]);
    setUrls(info?.urls as string[]);
  }, []);

  return (
    <Paper>
      <Box
        p={4}
        component={"form"}
        onSubmit={handleSubmit((data) => handleUpdateTarget(data))}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontWeight={600} variant="h4">
            Thông tin target số {index}
          </Typography>
          <IconButton onClick={handleRemoveTarget}>
            <TrashIcon width={20} color="red" />
          </IconButton>
        </Box>
        <Grid container spacing={6} mt={2}>
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
        <Box mt={4} textAlign={"center"}>
          <Button variant="contained" type="submit">
            Cập nhật
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default DetailTarget;
