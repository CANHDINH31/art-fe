import AdminLayout from "@/src/components/layout/admin";
import { createProfile, getDetailProfile } from "@/src/lib/api";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddNewTarget from "@/src/components/sections/admin/profiles/AddNewTarget";

function DetailProfile() {
  const router = useRouter();

  const { refetch } = useQuery(
    ["detailProfile", router.query.id],
    async () => {
      try {
        const res = await getDetailProfile(router.query.id as string);
        setValue("name", res?.data?.name);
        setValue("username", res?.data?.username);
        setValue("appKey", res?.data?.appKey);
        setValue("appSecret", res?.data?.appSecret);
        setValue("accessToken", res?.data?.accessToken);
        setValue("accessSecret", res?.data?.accessSecret);
        return res;
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

  const { mutate, isLoading } = useMutation({
    mutationFn: createProfile,
    onSuccess: (res) => {
      refetch();
      toast.success("Cập nhật thông tin thành công");
    },
    onError: (res) => {
      toast.error("Có lỗi xảy ra");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  return (
    <Box>
      <Box>
        <Typography fontWeight={600} variant="h3">
          Thông tin cá nhân
        </Typography>
        <Box
          mt={2}
          component={"form"}
          onSubmit={handleSubmit((data) =>
            mutate({
              appKey: data.appKey,
              appSecret: data.appSecret,
              accessSecret: data.accessSecret,
              accessToken: data.accessToken,
            })
          )}
        >
          <Grid container spacing={8}>
            <Grid item xs={4}>
              <InputLabel sx={{ fontSize: 14 }}>Name: </InputLabel>
              <TextField
                variant="standard"
                fullWidth
                {...register("name")}
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel sx={{ fontSize: 14 }}>Username: </InputLabel>
              <TextField
                variant="standard"
                fullWidth
                {...register("username")}
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel sx={{ fontSize: 14 }}>App key: </InputLabel>
              <TextField
                variant="standard"
                fullWidth
                error={errors?.appKey ? true : false}
                {...register("appKey", {
                  required: "Trường này không được để trống",
                })}
                helperText={errors?.appKey?.message?.toString()}
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel sx={{ fontSize: 14 }}>App secret: </InputLabel>
              <TextField
                variant="standard"
                fullWidth
                error={errors?.appSecret ? true : false}
                {...register("appSecret", {
                  required: "Trường này không được để trống",
                })}
                helperText={errors?.appSecret?.message?.toString()}
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel sx={{ fontSize: 14 }}>Access token: </InputLabel>
              <TextField
                variant="standard"
                fullWidth
                error={errors?.accessToken ? true : false}
                {...register("accessToken", {
                  required: "Trường này không được để trống",
                })}
                helperText={errors?.accessToken?.message?.toString()}
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel sx={{ fontSize: 14 }}>Access secret: </InputLabel>
              <TextField
                variant="standard"
                fullWidth
                error={errors?.accessToken ? true : false}
                {...register("accessSecret", {
                  required: "Trường này không được để trống",
                })}
                helperText={errors?.accessSecret?.message?.toString()}
              />
            </Grid>
          </Grid>
          <Box mt={2} textAlign={"center"}>
            <Button variant="contained" type="submit" disabled={isLoading}>
              Cập nhật thông tin
            </Button>
          </Box>
        </Box>
      </Box>
      <Box mt={4}>
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <Typography fontWeight={600} variant="h3">
            Quản lý target
          </Typography>
          <IconButton onClick={() => console.log("hello")}>
            <AddCircleOutlineIcon color="primary" />
          </IconButton>
        </Box>
      </Box>
      {/* Modal add target */}
      <AddNewTarget />
    </Box>
  );
}

export default DetailProfile;
DetailProfile.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout title="Quản trị viên" page="Chi tiết Profile">
      {page}
    </AdminLayout>
  );
};
