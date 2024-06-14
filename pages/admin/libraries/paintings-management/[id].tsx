import AdminLayout from "@/src/components/layout/admin";
import { getDetailPaint, updatePaint } from "@/src/lib/api";
import {
  ArrowUpTrayIcon,
  ChevronLeftIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Box,
  Button,
  CircularProgress,
  FormLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useRouter } from "next/router";
import React, { ReactElement, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/src/lib/firebase/firebaseConfig";

const PaintingManagementDetail = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { refetch } = useQuery(
    ["detailPainting", router.query.id],
    async () => {
      try {
        const res = await getDetailPaint(router.query.id as string);
        const detailPainting = res.data.data;
        setImage(detailPainting?.url);
        setValue("url", detailPainting?.url);
        setValue("title", detailPainting?.title);
        setValue("price", detailPainting?.price);
        setValue("stock", detailPainting?.stock);
        setValue("totalScore", detailPainting?.total_score);
        setValue("accountUsersRate", detailPainting?.account_users_rate);
        setValue(
          "createdAt",
          moment(detailPainting?.createdAt).format("HH:mm:ss DD-MM-YYYY")
        );
        setValue(
          "updatedAt",
          moment(detailPainting?.updatedAt).format("HH:mm:ss DD-MM-YYYY")
        );
        return detailPainting;
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

  const { mutate } = useMutation({
    mutationFn: updatePaint,
    onSuccess: (res) => {
      toast.success("Cập nhật thành công");
      refetch();
    },
    onError: (errors) => {
      toast.error("Cập nhật thất bại");
    },
  });

  const handleUploadFile = (files: File[]) => {
    const name = files[0].name;
    const storageRef = ref(storage, `paint/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setLoading(true);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setValue("url", url);
          setImage(url);
          setLoading(false);
        });
      }
    );
  };

  return (
    <Box>
      <Button href="/admin/libraries/paintings-management">
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <ChevronLeftIcon height={18} />
          <Typography>Quay lại quản lý tranh</Typography>
        </Box>
      </Button>

      <Stack
        mt={8}
        component={"form"}
        onSubmit={handleSubmit((data) =>
          mutate({
            ...data,
            price: Number(data.price),
            stock: Number(data.stock),
            _id: router.query.id as string,
          })
        )}
      >
        <Grid container spacing={4}>
          <Grid item xs={3}>
            {image && !loading ? (
              <>
                <Box
                  component={"img"}
                  src={image}
                  sx={{
                    width: "100%",
                    height: 250,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
                <Stack mt={4} alignItems={"center"}>
                  <Button
                    color="error"
                    size="small"
                    onClick={() => {
                      setValue("url", "");
                      setImage("");
                    }}
                  >
                    <TrashIcon width={20} />
                  </Button>
                </Stack>
              </>
            ) : (
              <Stack
                border={"1px dashed #949494"}
                sx={{
                  width: "100%",
                  height: 250,
                  borderRadius: 2,
                }}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {!loading ? (
                  <>
                    <Button
                      onClick={() =>
                        inputRef.current && inputRef.current?.click()
                      }
                    >
                      <Box display={"flex"} gap={2}>
                        <ArrowUpTrayIcon width={18} />
                        <Typography>Upload ảnh</Typography>
                      </Box>
                    </Button>
                    <input
                      ref={inputRef}
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(files) =>
                        handleUploadFile(Array.from(files.target.files || []))
                      }
                    />
                  </>
                ) : (
                  <CircularProgress />
                )}
              </Stack>
            )}
          </Grid>
          <Grid item xs={9}>
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <FormLabel>Url</FormLabel>
                <TextField
                  fullWidth
                  error={errors.url ? true : false}
                  variant="standard"
                  {...register("url", {
                    required: "Trường này không được để trống",
                  })}
                  helperText={errors?.url?.message?.toString()}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Tên tranh</FormLabel>
                <TextField
                  fullWidth
                  error={errors.title ? true : false}
                  variant="standard"
                  {...register("title", {
                    required: "Trường này không được để trống",
                  })}
                  helperText={errors?.title?.message?.toString()}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Giá</FormLabel>
                <TextField
                  fullWidth
                  variant="standard"
                  type="number"
                  {...register("price", {
                    required: "Trường này không được để trống",
                  })}
                  helperText={errors?.price?.message?.toString()}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Kho:</FormLabel>
                <TextField
                  fullWidth
                  variant="standard"
                  type="number"
                  {...register("stock", {
                    required: "Trường này không được để trống",
                  })}
                  helperText={errors?.price?.message?.toString()}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Tổng số điểm</FormLabel>
                <TextField
                  fullWidth
                  variant="standard"
                  disabled
                  {...register("totalScore", { shouldUnregister: true })}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Số lượt đánh giá</FormLabel>
                <TextField
                  fullWidth
                  variant="standard"
                  disabled
                  {...register("accountUsersRate", { shouldUnregister: true })}
                />
              </Grid>
            </Grid>
            <Box mt={8} display={"flex"} justifyContent={"center"}>
              <Button variant="outlined" type="submit">
                Cập nhật
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default PaintingManagementDetail;

PaintingManagementDetail.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout title="Quản lý thư viện">{page}</AdminLayout>;
};
