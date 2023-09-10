import AddModal from "@/src/components/common/AddModal";
import { createUser, getDetailUser, updateUser } from "@/src/lib/api/user";
import { ArrowUpTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  InputLabel,
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
  useQuery,
} from "@tanstack/react-query";
import { convertUrlImage } from "@/src/lib/utils/common";
import moment from "moment";

type Props = {
  open: boolean;
  handleClose: () => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  idEdit: string;
};

const DetailUser = ({ open, handleClose, refetch, idEdit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    reset,
  } = useForm();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { data, isLoading } = useQuery(
    ["detailUser", idEdit],
    async () => {
      try {
        const res = await getDetailUser(idEdit);
        setImage(convertUrlImage(res.data.image));
        setValue("email", res.data.email);
        setValue("name", res.data.name);
        setValue("role", res.data?.isAdmin ? "Admin" : "User");
        return res.data;
      } catch (err: any) {
        throw err;
      }
    },
    {
      enabled: !!idEdit,
    }
  );

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
    setFile(null);
    reset();
  };

  const handleUpdateUser = async (data: FieldValues) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    file && formData.append("file", file);
    try {
      setLoading(true);
      const res = await updateUser(idEdit, formData);
      toast.success(res?.data?.message);
      handleCloseModal();
      refetch();
    } catch (error) {
      throw error;
    }
    setLoading(false);
  };

  return (
    <AddModal
      title="CHI TIẾT NGƯỜI DÙNG"
      open={open}
      handleClose={handleCloseModal}
      handleOk={handleSubmit((data) => handleUpdateUser(data))}
    >
      <Stack>
        {loading || isLoading ? (
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
                  defaultValue={getValues("role")}
                  render={({ field }) => {
                    return (
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
                    );
                  }}
                />
                <Box>
                  <InputLabel sx={{ fontSize: 12 }}>Họ tên</InputLabel>
                  <TextField
                    error={errors?.name ? true : false}
                    {...register("name", {
                      required: "Trường này không được để trống",
                    })}
                    helperText={errors?.name?.message?.toString()}
                    variant="standard"
                    fullWidth
                    size="small"
                  />
                </Box>
                <Box>
                  <InputLabel sx={{ fontSize: 12 }}>Email</InputLabel>
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
                    variant="standard"
                    fullWidth
                    size="small"
                    disabled
                  />
                </Box>
                <Box>
                  <InputLabel sx={{ fontSize: 12 }}>Password</InputLabel>
                  <TextField
                    error={errors?.password ? true : false}
                    {...register("password", {
                      minLength: {
                        value: 6,
                        message: "Mật khẩu tối thiểu 6 kí tự",
                      },
                    })}
                    helperText={errors?.password?.message?.toString()}
                    variant="standard"
                    fullWidth
                    size="small"
                    type="password"
                  />
                </Box>

                <Box>
                  <Typography variant="h6">
                    Lần cập nhật gần nhất:
                    {moment(data?.updatedAt).format("DD/MM/YYYY HH:mm:ss")}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        )}
      </Stack>
    </AddModal>
  );
};

export default DetailUser;
