import AdminLayout from "@/src/components/layout/admin";
import { aiTweet, createTweet, getListProfile } from "@/src/lib/api";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Tweet = () => {
  const [profileId, setProfileId] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onSubmit" });

  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    setValue: setValueCreate,
    formState: { errors: errosCreate },
  } = useForm({ mode: "onSubmit" });

  const { mutate, isLoading } = useMutation({
    mutationFn: aiTweet,
    onSuccess: (res) => {
      setValueCreate(
        "content",
        res?.data?.response?.candidates?.[0]?.content?.parts?.[0]?.text
      );
    },
    onError: (res) => {
      toast.error("Có lỗi xảy ra");
    },
    onSettled: () => {
      setValue("prompt", "");
    },
  });

  const { mutate: mutateCreate, isLoading: isLoadingCreate } = useMutation({
    mutationFn: createTweet,
    onSuccess: (res) => {},
    onError: (res) => {
      toast.error("Có lỗi xảy ra");
    },
    onSettled: () => {
      setValue("prompt", "");
    },
  });

  const { data } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const res = await getListProfile();
      setProfileId(res?.data?.[0]?._id);
      return res.data;
    },
  });

  return (
    <Box p={4}>
      <Stack justifyContent={"center"} alignItems={"center"} gap={4}>
        <Stack gap={1} width={"50%"} alignItems={"flex-start"}>
          <InputLabel sx={{ fontSize: 14, fontWeight: 600 }}>
            Chọn tài khoản:
          </InputLabel>
          <Select
            value={profileId}
            onChange={(e) => setProfileId(e.target.value)}
            fullWidth
            size="small"
          >
            {data?.map((e: any) => (
              <MenuItem value={e._id}>
                {e.username} ({e.name})
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <Stack
          gap={1}
          width={"50%"}
          alignItems={"flex-end"}
          component={"form"}
          onSubmit={handleSubmit((data) => mutate(data as { prompt: string }))}
        >
          <Stack gap={1} width={"100%"}>
            <InputLabel sx={{ fontSize: 14, fontWeight: 600 }}>
              Nội dung cần hỗ trợ:
            </InputLabel>
            <TextField
              multiline
              rows={4}
              fullWidth
              error={errors?.prompt ? true : false}
              {...register("prompt", {
                required: "Trường này không được để trống",
              })}
              helperText={errors?.prompt?.message?.toString()}
            />
          </Stack>
          <Button variant="contained" type="submit" disabled={isLoading}>
            Tìm kiếm
          </Button>
        </Stack>
        <Stack
          gap={1}
          width={"50%"}
          alignItems={"flex-end"}
          component={"form"}
          onSubmit={handleSubmitCreate((data) =>
            mutateCreate({ content: data.content, profileId })
          )}
        >
          <Stack gap={1} width={"100%"}>
            <InputLabel sx={{ fontSize: 14, fontWeight: 600 }}>
              Kết quả tìm kiếm:
            </InputLabel>
            <TextField
              multiline
              rows={8}
              fullWidth
              error={errosCreate?.content ? true : false}
              {...registerCreate("content", {
                required: "Trường này không được để trống",
              })}
              helperText={errosCreate?.content?.message?.toString()}
            />
          </Stack>
          <Button variant="contained" type="submit" disabled={isLoadingCreate}>
            Đăng bài
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Tweet;

Tweet.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout title="Quản trị viên" page="Tweet">
      {page}
    </AdminLayout>
  );
};
