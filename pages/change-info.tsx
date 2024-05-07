import { getDetailUser, updateUser } from "@/src/lib/api/user";
import { ArrowUpTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, {
  ChangeEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { convertUrlImage } from "@/src/lib/utils/common";
import MainLayout from "@/src/components/layout/user";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/src/lib/redux/userSlice";
import Loading from "@/src/components/sections/common/Loading";
import { useRouter } from "next/router";

const ChangeInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm({ mode: "onSubmit" });

  const { user } = useSelector((state: any) => state?.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const { isLoading } = useQuery(
    ["user", user?._id],
    async () => {
      try {
        const res = await getDetailUser(user?._id as string);
        setImage(
          res?.data?.image
            ? convertUrlImage(res?.data?.image)
            : "/img/jpg/default-avatar.jpg"
        );
        setValue("email", res?.data?.email);
        setValue("name", res?.data?.name);
        setValue("age", res?.data?.age);
        setValue("address", res?.data?.address);
        setValue("sex", res.data?.sex);
        return res.data;
      } catch (err: any) {
        toast.error(err?.message || "Có lỗi xảy ra");
        throw err;
      }
    },
    {
      enabled: !!user?._id,
      staleTime: Infinity,
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

  const handleUpdateUser = async (data: FieldValues) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    file && formData.append("file", file);
    try {
      const res = await updateUser(user?._id, formData);
      toast.success(res?.data?.message);

      dispatch(
        login({
          ...user,
          image: res?.data?.data?.image,
          address: res?.data?.data?.address,
          age: res?.data?.data?.age,
          name: res?.data?.data?.name,
          sex: res?.data?.data?.sex,
        })
      );
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (!user?.name) router.push("/");
  }, []);

  return (
    <Stack minHeight={"60vh"} py={8}>
      <Container>
        <Typography variant="h2" fontWeight={600} textAlign={"center"}>
          Cập nhật thông tin
        </Typography>
        {isLoading ? (
          <Loading minHeight="100%" />
        ) : (
          <Grid
            container
            spacing={{ xs: 4, md: 8 }}
            mt={4}
            component={"form"}
            onSubmit={handleSubmit((data) => handleUpdateUser(data))}
          >
            <Grid item xs={12} md={4}>
              {image ? (
                <Stack>
                  <Box
                    src={image}
                    alt="avatar"
                    component={"img"}
                    width={"100%"}
                    height={250}
                    borderRadius={2}
                    sx={{ objectFit: "cover" }}
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
            <Grid item xs={12} md={8}>
              <Grid container spacing={{ xs: 4, md: 8 }}>
                <Grid item xs={12} md={6}>
                  <InputLabel sx={{ fontSize: 14 }}>Họ tên: </InputLabel>
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
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel sx={{ fontSize: 14 }}>Email: </InputLabel>
                  <TextField
                    error={errors?.email ? true : false}
                    {...register("email", {
                      required: "Trường này không được để trống",
                    })}
                    helperText={errors?.email?.message?.toString()}
                    variant="standard"
                    fullWidth
                    size="small"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel sx={{ fontSize: 14 }}>Tuổi: </InputLabel>
                  <TextField
                    error={errors?.age ? true : false}
                    {...register("age")}
                    helperText={errors?.age?.message?.toString()}
                    variant="standard"
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel sx={{ fontSize: 14 }}>Địa chỉ: </InputLabel>
                  <TextField
                    error={errors?.address ? true : false}
                    {...register("address")}
                    helperText={errors?.address?.message?.toString()}
                    variant="standard"
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="sex"
                    control={control}
                    defaultValue={getValues("sex")}
                    render={({ field }) => {
                      return (
                        <RadioGroup {...field} row>
                          <FormControlLabel
                            value={"1"}
                            control={<Radio size="small" />}
                            label="Nam"
                          />
                          <FormControlLabel
                            value={"0"}
                            control={<Radio size="small" />}
                            label="Nữ"
                          />
                        </RadioGroup>
                      );
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  textAlign={{ xs: "center", md: "left" }}
                >
                  <Button variant="outlined" type="submit">
                    Cập nhật thông tin
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Container>
    </Stack>
  );
};

export default ChangeInfo;

ChangeInfo.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="Cập nhật thông tin">{page}</MainLayout>;
};
