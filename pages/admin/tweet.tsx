import AdminLayout from "@/src/components/layout/admin";
import { aiTweet, createTweet, getListProfile } from "@/src/lib/api";
import { ArrowUpTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, ReactElement, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Tweet = () => {
  const [profileId, setProfileId] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
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
  });

  const { data } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const res = await getListProfile();
      setProfileId(res?.data?.[0]?._id);
      return res.data;
    },
    staleTime: Infinity,
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = function (readerEvent) {
        setImage(readerEvent?.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateTweet = async (data: FieldValues) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("data", JSON.stringify({ ...data, profileId }));
    file && formData.append("file", file);
    try {
      const res = await createTweet(formData);
      toast.success(res?.data?.message);
      setValueCreate("content", "");
      setValue("prompt", "");
      setImage("");
    } catch (error) {
      toast.error("Đăng bài thất bại");
      console.log(error);
    }
    setLoading(false);
  };

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
          onSubmit={handleSubmitCreate((data) => handleCreateTweet(data))}
        >
          <Stack gap={1} width={"100%"}>
            <InputLabel sx={{ fontSize: 14, fontWeight: 600 }}>
              Kết quả tìm kiếm:
            </InputLabel>
            <Grid container spacing={4}>
              <Grid item xs={8}>
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
              </Grid>
              <Grid item xs={4}>
                {image ? (
                  <Stack>
                    <Box
                      src={image}
                      alt="avatar"
                      component={"img"}
                      width={"100%"}
                      height={"100%"}
                      maxHeight={210}
                      borderRadius={2}
                      sx={{ objectFit: "cover" }}
                    />
                    <Box display={"flex"} justifyContent={"center"} mt={2}>
                      <Button color="error" onClick={() => setImage("")}>
                        <TrashIcon width={20} />
                      </Button>
                    </Box>
                  </Stack>
                ) : (
                  <Stack
                    border={"1px dashed #949494"}
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 2,
                    }}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Button
                      onClick={() =>
                        inputRef.current && inputRef.current?.click()
                      }
                    >
                      <Box display={"flex"} gap={2}>
                        <ArrowUpTrayIcon width={18} />
                        <span>Upload ảnh</span>
                      </Box>
                    </Button>
                    <input
                      ref={inputRef}
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Stack>
                )}
              </Grid>
            </Grid>
          </Stack>
          <Button variant="contained" type="submit" disabled={loading}>
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
    <AdminLayout title="Quản trị viên" page="Tweet AI">
      {page}
    </AdminLayout>
  );
};
