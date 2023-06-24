import DataGridCustom from "@/src/components/common/DataGridCustom";
import AdminLayout from "@/src/components/layout/admin";
import { getDetailPaint, updatePaint } from "@/src/lib/api";
import { queryClient } from "@/src/lib/react-query";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";

const PaintingManagementDetail = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { data: detailPainting } = useQuery(
    ["detailPainting", router.query.id],
    async () => {
      try {
        const res = await getDetailPaint(router.query.id as string);
        return res.data.data;
      } catch (err) {
        throw err;
      }
    },
    {
      enabled: !!router.query.id,
      keepPreviousData: true,
    }
  );

  const { mutate: handleUpdatePaint, isLoading } = useMutation({
    mutationFn: updatePaint,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: ["detailPainting"] });
    },
  });

  useEffect(() => {
    setValue("url", detailPainting?.url);
    setValue("title", detailPainting?.title);
  }, [detailPainting, setValue]);

  return (
    <Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={1}
        sx={{ cursor: "pointer" }}
        onClick={() => router.push("/admin/libraries/paintings-management")}
      >
        <ChevronLeftIcon height={18} />
        <Typography>Quay lại quản lý tranh</Typography>
      </Box>
      <Box mt={8} display={"flex"} justifyContent={"center"} gap={4}>
        <Box>
          <Box
            component={"img"}
            src={detailPainting?.url}
            sx={{
              width: 250,
              height: 250,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        </Box>
        <Stack
          component={"form"}
          justifyContent={"space-around"}
          onSubmit={handleSubmit(data =>
            handleUpdatePaint({ ...data, _id: router.query.id as string })
          )}
        >
          <Box>
            <TextField
              error={errors.url ? true : false}
              sx={{ width: 500 }}
              placeholder="Nhập đường link tranh"
              variant="standard"
              {...register("url", {
                required: "Trường này không được để trống",
              })}
              helperText={errors?.url?.message?.toString()}
            />
          </Box>
          <Box mt={4}>
            <TextField
              error={errors.title ? true : false}
              sx={{ width: 500 }}
              placeholder="Nhập tên tranh"
              variant="standard"
              {...register("title", {
                required: "Trường này không được để trống",
              })}
              helperText={errors?.title?.message?.toString()}
            />
          </Box>

          <Box mt={4} display={"flex"} justifyContent={"center"}>
            <Button variant="contained" type="submit">
              Lưu
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default PaintingManagementDetail;

PaintingManagementDetail.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout title="Quản lý thư viện">{page}</AdminLayout>;
};
