import AddModal from "@/src/components/common/AddModal";
import { addNewPaint } from "@/src/lib/api";
import { queryClient } from "@/src/lib/react-query";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "../../../common/Loading";
import { toast } from "react-toastify";
import {
  ArrowUpTrayIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { convertPayload } from "@/src/lib/utils/painting-management";
import { createPaintingConvert, createPaintingPayload } from "@/src/lib/types";
import { storage } from "@/src/lib/firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageFile, setImageFile] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [arrComponent, setArrComponent] = useState<number[]>([]);
  const [isUpload, setIsUpload] = useState<boolean>(false);

  const { mutate: handleAddPaint, isLoading } = useMutation({
    mutationFn: addNewPaint,
    onSuccess: (res) => {
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

  const handleChangeMode = () => {
    reset();
    setIsUpload(!isUpload);
    setArrComponent([]);
    setImageFile([]);
  };

  const handleUploadFile = (files: File[]) => {
    for (const file of files) {
      const name = file.name;
      const storageRef = ref(storage, `paint/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
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
            setImageFile((prev) => [...prev, url]);
            setLoading(false);
          });
        }
      );
    }
  };

  const handleAddComponent = () => {
    setArrComponent([...arrComponent, Date.now()]);
  };

  const handleRemoveComponent = (key: number) => {
    const updatedComponents = arrComponent.filter((el) => el !== key);
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
      <Box display={"flex"} alignItems={"flex-end"} gap={4} mt={4}>
        <Box width={"100%"}>
          <TextField
            variant="standard"
            error={errors[`url ${index}`] ? true : false}
            size="small"
            label="Url"
            fullWidth
            {...register(`url ${index}`, {
              required: "Trường này không được để trống",
            })}
            helperText={errors[`url ${index}`]?.message?.toString()}
          />
        </Box>
        <Box width={"100%"}>
          <TextField
            variant="standard"
            error={errors[`title ${index}`] ? true : false}
            size="small"
            label="Tên"
            fullWidth
            {...register(`title ${index}`, {
              required: "Trường này không được để trống",
            })}
            helperText={errors[`title ${index}`]?.message?.toString()}
          />
        </Box>
        <Box width={"100%"}>
          <TextField
            variant="standard"
            error={errors.title ? true : false}
            size="small"
            label="Giá"
            type="number"
            fullWidth
            {...register("price", {
              required: "Trường này không được để trống",
            })}
            helperText={errors?.price?.message?.toString()}
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
      handleOk={handleSubmit((data) =>
        handleAddPaint(
          convertPayload(
            data as createPaintingPayload
          ) as createPaintingConvert[]
        )
      )}
      maxWidth={"md"}
    >
      <Box>
        <Box>
          {loading && <LinearProgress />}
          <Box display={"flex"} justifyContent={"space-between"}>
            {isUpload ? (
              <Box>
                <Button
                  onClick={() => inputRef.current && inputRef.current?.click()}
                >
                  <Box display={"flex"} gap={2} alignItems={"center"}>
                    <ArrowUpTrayIcon width={18} />
                    Upload tranh
                  </Box>
                </Button>
                <input
                  ref={inputRef}
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  onChange={(files) =>
                    handleUploadFile(Array.from(files.target.files || []))
                  }
                />
              </Box>
            ) : (
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
            )}
            <Switch checked={isUpload} onChange={handleChangeMode} />
          </Box>
          {isUpload ? (
            <Box mt={4}>
              <Grid container spacing={10}>
                {imageFile?.map((el, index) => (
                  <Grid item xs={6} key={index}>
                    <Box display={"flex"} alignItems={"flex-end"} gap={2}>
                      <Box
                        component={"img"}
                        src={el}
                        width={80}
                        height={80}
                        borderRadius={"8px"}
                      />
                      <input
                        hidden={true}
                        value={el}
                        {...register(`url ${index}`)}
                      />
                      <TextField
                        variant="standard"
                        error={errors[`title ${index}`] ? true : false}
                        size="small"
                        label="Tên"
                        fullWidth
                        {...register(`title ${index}`, {
                          required: "Trường này không được để trống",
                        })}
                        helperText={errors[
                          `title ${index}`
                        ]?.message?.toString()}
                      />
                      <TextField
                        variant="standard"
                        error={errors[`price ${index}`] ? true : false}
                        size="small"
                        label="Giá"
                        type="number"
                        fullWidth
                        {...register(`price ${index}`, {
                          required: "Trường này không được để trống",
                        })}
                        helperText={errors[
                          `price ${index}`
                        ]?.message?.toString()}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Stack width={"100%"} mt={4}>
              <Box display={"flex"} alignItems={"flex-start"} gap={4}>
                <Box width={"100%"}>
                  <TextField
                    variant="standard"
                    error={errors.url ? true : false}
                    size="small"
                    label="Url"
                    fullWidth
                    {...register("url", {
                      required: "Trường này không được để trống",
                    })}
                    helperText={errors?.url?.message?.toString()}
                  />
                </Box>
                <Box width={"100%"}>
                  <TextField
                    variant="standard"
                    error={errors.title ? true : false}
                    size="small"
                    label="Tên"
                    fullWidth
                    {...register("title", {
                      required: "Trường này không được để trống",
                    })}
                    helperText={errors?.title?.message?.toString()}
                  />
                </Box>
                <Box width={"100%"}>
                  <TextField
                    variant="standard"
                    error={errors.title ? true : false}
                    size="small"
                    label="Giá"
                    type="number"
                    fullWidth
                    {...register("price", {
                      required: "Trường này không được để trống",
                    })}
                    helperText={errors?.price?.message?.toString()}
                  />
                </Box>
                {arrComponent?.length > 0 && <Button disabled />}
              </Box>
              {arrComponent?.map((el) => (
                <Component
                  key={el}
                  onDelete={() => handleRemoveComponent(el)}
                  index={el}
                />
              ))}
            </Stack>
          )}
        </Box>
      </Box>
    </AddModal>
  );
};

export default AddNewPainting;
