import AdminLayout from "@/src/components/layout/admin";
import ListPainting from "@/src/components/sections/admin/libraries/category-management/ListPainting";
import Loading from "@/src/components/sections/common/Loading";
import { getDetailCategory, updateCategory } from "@/src/lib/api";
import { queryClient } from "@/src/lib/react-query";
import { typePaint } from "@/src/lib/types/paint";
import {
  ArrowUpTrayIcon,
  ChevronLeftIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
  styled,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/src/lib/firebase/firebaseConfig";

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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
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
        setImage(res?.data?.data?.url);
        const listPaint = res.data.data?.list_paint_id?.map(
          (paint: typePaint) => ({
            ...paint,
            id: paint._id,
          })
        );
        setListPainting(listPaint);
        return res.data.data;
      } catch (err: any) {
        toast.error(err?.message || "Có lỗi xảy ra");
        throw err;
      }
    },
    { enabled: !!router.query.id, refetchOnWindowFocus: false }
  );

  const { mutate: handleUpdateCategory, isLoading: loadingUpdate } =
    useMutation({
      mutationFn: updateCategory,
      onSuccess: (res) => {
        toast.success("Cập nhật thành công");
        queryClient.invalidateQueries({ queryKey: ["detailCategory"] });
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
  useEffect(() => {
    setValue("url", detailCategory?.url);
    setValue("description", detailCategory?.description);
  }, [detailCategory, setValue]);

  if (loadingList) return <Loading />;

  return (
    <Box>
      <Button href="/admin/libraries/categories-management">
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <ChevronLeftIcon height={18} />
          <Typography>Quay lại quản lý danh mục</Typography>
        </Box>
      </Button>

      <Box mt={8} display={"flex"} justifyContent={"center"} gap={4}>
        {image && !loading ? (
          <Box>
            <Box
              component={"img"}
              src={image}
              sx={{
                width: 280,
                height: 280,
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
          </Box>
        ) : (
          <Stack
            border={"1px dashed #949494"}
            sx={{
              width: 280,
              height: 280,
              borderRadius: 2,
            }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {!loading ? (
              <>
                <Button
                  onClick={() => inputRef.current && inputRef.current?.click()}
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
        <Stack
          component={"form"}
          onSubmit={handleSubmit((data) =>
            handleUpdateCategory({ ...data, _id: router.query.id as string })
          )}
        >
          <Typography
            variant="h4"
            fontWeight={600}
            textTransform={"uppercase"}
            mb={1}
          >
            {detailCategory?.title}
          </Typography>
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
            <Button variant="outlined" type="submit">
              Cập nhật
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
