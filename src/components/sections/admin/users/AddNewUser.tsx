import AddModal from "@/src/components/common/AddModal";
import { createUser } from "@/src/lib/api/user";
import { ArrowUpTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useRef, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loading from "../../common/Loading";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";

type Props = {
  open: boolean;
  handleClose: () => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
};

const AddNewUser = ({ open, handleClose, refetch }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setError,
    setValue,
  } = useForm();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleCloseModal = () => {
    handleClose();
    reset();
    setImage("");
    setFile(null);
  };

  const handleCreateUser = async (data: FieldValues) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    file && formData.append("file", file);
    try {
      setLoading(true);
      const res = await createUser(formData);
      if (res?.data?.status == 400) {
        setError("email", { message: res?.data?.message });
        setValue("email", "");
      } else {
        toast.success(res?.data?.message);
        handleCloseModal();
        refetch();
      }
    } catch (error) {
      throw error;
    }
    setLoading(false);
  };

  return (
    <AddModal
      title="THÊM USER"
      open={open}
      handleClose={handleCloseModal}
      handleOk={handleSubmit((data) => handleCreateUser(data))}
    >
      <Stack>
        {loading ? (
          <Loading minHeight="100%" />
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={6}>
              {image ? (
                <Stack>
                  <Box
                    src={image}
                    alt="avatar"
                    component={"img"}
                    width={"100%"}
                    height={250}
                    borderRadius={2}
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
                    height: 250,
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
                      <Typography>Upload ảnh</Typography>
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
            <Grid item xs={6}>
              <Stack gap={2}>
                <Controller
                  name="role"
                  control={control}
                  defaultValue="User"
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      <FormControlLabel
                        value="User"
                        control={<Radio size="small" />}
                        label="User"
                      />
                      <FormControlLabel
                        value="Admin"
                        control={<Radio size="small" />}
                        label="Admin"
                      />
                    </RadioGroup>
                  )}
                />
                <TextField
                  error={errors?.name ? true : false}
                  {...register("name", {
                    required: "Trường này không được để trống",
                  })}
                  helperText={errors?.name?.message?.toString()}
                  label="Họ tên"
                  variant="standard"
                  fullWidth
                  size="small"
                />
                <TextField
                  error={errors?.email ? true : false}
                  {...register("email", {
                    required: "Trường này không được để trống",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email không hợp lệ",
                    },
                  })}
                  helperText={errors?.email?.message?.toString()}
                  label="Email"
                  variant="standard"
                  fullWidth
                  size="small"
                />
                <TextField
                  error={errors?.password ? true : false}
                  {...register("password", {
                    required: "Trường này không được để trống",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu tối thiểu 6 kí tự",
                    },
                  })}
                  helperText={errors?.password?.message?.toString()}
                  label="Password"
                  variant="standard"
                  fullWidth
                  size="small"
                  type="password"
                />
                <Typography variant="h6" color="error">
                  Lưu ý: nếu email không đúng bạn sẽ không lấy được mật khẩu nếu
                  như quên hoặc mất tài khoản
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        )}
      </Stack>
    </AddModal>
  );
};

export default AddNewUser;
