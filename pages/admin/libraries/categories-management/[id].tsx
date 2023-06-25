import AdminLayout from "@/src/components/layout/admin";
import ListPainting from "@/src/components/sections/admin/libraries/category-management/ListPainting";
import Loading from "@/src/components/sections/common/Loading";
import { getDetailCategory, updateCategory } from "@/src/lib/api";
import { queryClient } from "@/src/lib/react-query";
import { typePaint } from "@/src/lib/types/paint";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import {
  Box,
  Button,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
  styled,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const WrapTextarea = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  maxHeight: 200,
  padding: theme.spacing(2, 2),
  width: 500,
  overflow: "scroll",
  border: "1px solid rgba(0, 0, 0, 0.42)",
  borderRadius: theme.spacing(1),
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const TextareaCustom = styled(TextareaAutosize)(({ theme }) => ({
  resize: "none",
  width: "100%",
  outline: "none",
  border: "none",
  fontSize: 14,
  fontFamily: "Roboto",
  "&::placeholder": {
    opacity: 0.6,
  },
}));

const CategoriesManagementDetail = () => {
  const router = useRouter();
  const [listPainting, setListPainting] = useState<typePaint[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { data: detailCategory, isLoading: loadingList } = useQuery(
    ["detailCategory"],
    async () => {
      try {
        const res = await getDetailCategory(router.query.id as string);
        const listPaint = res.data.data?.list_paint_id?.map(
          (paint: typePaint) => ({
            ...paint,
            id: paint._id,
          })
        );
        setListPainting(listPaint);
        return res.data.data;
      } catch (err) {
        throw err;
      }
    },
    { enabled: !!router.query.id }
  );

  const { mutate: handleUpdateCategory, isLoading: loadingUpdate } =
    useMutation({
      mutationFn: updateCategory,
      onSuccess: res => {
        queryClient.invalidateQueries({ queryKey: ["detailCategory"] });
      },
    });

  useEffect(() => {
    setValue("url", detailCategory?.url);
    setValue("description", detailCategory?.description);
  }, [detailCategory, setValue]);

  if (loadingList || loadingUpdate) return <Loading />;

  return (
    <Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={1}
        sx={{ cursor: "pointer" }}
        onClick={() => router.push("/admin/libraries/categories-management")}
      >
        <ChevronLeftIcon height={18} />
        <Typography>Quay lại quản lý danh mục</Typography>
      </Box>
      <Box mt={8} display={"flex"} justifyContent={"center"} gap={4}>
        <Box>
          <Box
            component={"img"}
            src={detailCategory?.url}
            sx={{
              width: 250,
              height: 250,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
          <Typography
            variant="h4"
            fontWeight={600}
            mt={1}
            textAlign={"center"}
            textTransform={"uppercase"}
          >
            {detailCategory?.title}
          </Typography>
        </Box>
        <Stack
          component={"form"}
          onSubmit={handleSubmit(data =>
            handleUpdateCategory({ ...data, _id: router.query.id as string })
          )}
        >
          <TextField
            error={errors.url ? true : false}
            sx={{ width: 500 }}
            placeholder="Đường link ảnh đại diện"
            variant="standard"
            spellCheck={false}
            {...register("url", { required: "Trường này không được để trống" })}
            helperText={errors?.url?.message?.toString()}
          />
          <WrapTextarea>
            <TextareaCustom
              minRows={10}
              placeholder="Nhập mô tả"
              spellCheck={false}
              {...register("description", {
                required: "Trường này không được để trống",
              })}
            />
          </WrapTextarea>
          {errors.description && (
            <Typography
              component={"span"}
              color={"#d32f2f"}
              fontSize={"0.75rem"}
            >
              {errors?.description?.message?.toString()}
            </Typography>
          )}
          <Box mt={1} display={"flex"} justifyContent={"flex-end"}>
            <Button variant="contained" type="submit">
              Lưu
            </Button>
          </Box>
        </Stack>
      </Box>
      <Box mt={8}>
        <ListPainting listPainting={listPainting} />
      </Box>
    </Box>
  );
};

export default CategoriesManagementDetail;

CategoriesManagementDetail.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout title="Quản lý thư viện">{page}</AdminLayout>;
};
