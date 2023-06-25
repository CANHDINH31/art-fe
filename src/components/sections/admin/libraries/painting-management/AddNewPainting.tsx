import AddModal from "@/src/components/common/AddModal";
import { addNewPaint } from "@/src/lib/api";
import { queryClient } from "@/src/lib/react-query";
import { typePaint } from "@/src/lib/types/paint";
import { Box, Stack, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import Loading from "../../../common/Loading";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const AddNewPainting = ({ open, handleClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate: handleAddPaint, isLoading } = useMutation({
    mutationFn: addNewPaint,
    onSuccess: res => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["listPaint"] });
      handleClose();
    },
  });

  if (isLoading) return <Loading />;

  return (
    <AddModal
      title="Thêm tranh "
      open={open}
      handleClose={handleClose}
      handleOk={handleSubmit(data => handleAddPaint(data as typePaint))}
    >
      <Stack>
        <Box>
          <TextField
            error={errors.url ? true : false}
            size="small"
            placeholder="Nhập link tranh"
            fullWidth
            {...register("url", {
              required: "Trường này không được để trống",
            })}
            helperText={errors?.url?.message?.toString()}
          />
        </Box>
        <Box mt={4}>
          <TextField
            error={errors.title ? true : false}
            size="small"
            placeholder="Nhập tên tranh"
            fullWidth
            {...register("title", {
              required: "Trường này không được để trống",
            })}
            helperText={errors?.title?.message?.toString()}
          />
        </Box>
      </Stack>
    </AddModal>
  );
};

export default AddNewPainting;
