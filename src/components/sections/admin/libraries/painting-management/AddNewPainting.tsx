import AddModal from "@/src/components/common/AddModal";
import { addNewPaint } from "@/src/lib/api";
import { queryClient } from "@/src/lib/react-query";
import { typePaint } from "@/src/lib/types/paint";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "../../../common/Loading";
import { toast } from "react-toastify";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { convertPayload } from "@/src/lib/utils/painting-management";
import { createPaintingConvert, createPaintingPayload } from "@/src/lib/types";

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

  const [arrComponent, setArrComponent] = useState<number[]>([]);

  const { mutate: handleAddPaint, isLoading } = useMutation({
    mutationFn: addNewPaint,
    onSuccess: res => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["listPaint"] });
      handleClose();
      toast.success("Thêm mới tranh thành công");
    },
    onError: (errors: { message?: string }) => {
      reset();
      handleClose();
      toast.error(errors?.message || "Thêm mới tranh thất bại");
    },
  });

  const handleAddComponent = () => {
    setArrComponent([...arrComponent, Date.now()]);
  };

  const handleRemoveComponent = (key: number) => {
    const updatedComponents = arrComponent.filter(el => el !== key);
    setArrComponent(updatedComponents);
  };

  const Component = ({
    onDelete,
    index,
  }: {
    onDelete: () => void;
    index: number;
  }) => {
    return (
      <Box display={"flex"} alignItems={"flex-start"} gap={2} mt={4}>
        <Box width={"100%"}>
          <TextField
            error={errors[`url ${index}`] ? true : false}
            size="small"
            placeholder="Nhập link tranh"
            fullWidth
            {...register(`url ${index}`, {
              required: "Trường này không được để trống",
            })}
            helperText={errors[`url ${index}`]?.message?.toString()}
          />
        </Box>
        <Box width={"100%"}>
          <TextField
            error={errors[`title ${index}`] ? true : false}
            size="small"
            placeholder="Nhập tên tranh"
            fullWidth
            {...register(`title ${index}`, {
              required: "Trường này không được để trống",
            })}
            helperText={errors[`title ${index}`]?.message?.toString()}
          />
        </Box>
        <Button onClick={onDelete}>
          <TrashIcon width={20} color="#d32f2f" />
        </Button>
      </Box>
    );
  };

  if (isLoading) return <Loading />;

  return (
    <AddModal
      title="THÊM TRANH VÀO THƯ VIỆN"
      open={open}
      handleClose={handleClose}
      handleOk={handleSubmit(data =>
        handleAddPaint(
          convertPayload(
            data as createPaintingPayload
          ) as createPaintingConvert[]
        )
      )}
    >
      <>
        <Button onClick={handleAddComponent}>
          <Box
            sx={{ cursor: "pointer" }}
            display={"flex"}
            alignItems={"flex-start"}
            gap={1}
          >
            <PlusCircleIcon width={20} color="#446084" />
            <Typography variant="h5">Thêm dòng </Typography>
          </Box>
        </Button>

        <Stack width={"100%"} mt={4}>
          <Box display={"flex"} alignItems={"flex-start"} gap={2}>
            <Box width={"100%"}>
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
            <Box width={"100%"}>
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
            {arrComponent?.length > 0 && <Button disabled />}
          </Box>
          {arrComponent?.map(el => (
            <Component
              key={el}
              onDelete={() => handleRemoveComponent(el)}
              index={el}
            />
          ))}
        </Stack>
      </>
    </AddModal>
  );
};

export default AddNewPainting;
