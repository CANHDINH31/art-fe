import AuthLayout from "@/src/components/layout/auth";
import { changePassword } from "@/src/lib/api/user";
import { KeyIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const TextFieldCustom = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: 45,
    border: "1px solid #00000020",
  },
  "& input": {
    padding: theme.spacing(0, 2),
    height: "100%",
    color: theme.palette.primary.main,
    "&::placeholder": {
      color: theme.palette.primary.main,
    },
  },
  "& .MuiInputAdornment-root": {
    cursor: "pointer",
  },
}));

const ChangePassword = () => {
  const router = useRouter();
  const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
  const [isHideRePassword, setIsHideRePassword] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useMutation({
    mutationFn: changePassword,
    onSuccess: res => {
      toast.success(res.data.message);
      reset();
      router.push("/");
    },
    onError: errors => {
      toast.error("Cập nhật mật khẩu thất bại");
    },
  });

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(data => mutate({ password: data.password }))}
    >
      <Typography variant="h2" textAlign={"center"}>
        Thay đổi mật khẩu
      </Typography>
      <Box mt={8}>
        <Box mt={3}>
          <TextFieldCustom
            fullWidth
            type={isHidePassword ? "password" : " text"}
            error={errors.password ? true : false}
            placeholder="Nhập mật khẩu mới"
            {...register("password", {
              required: "Trường này không được để trống",
              minLength: { value: 6, message: "Mật khẩu tối thiểu 6 kí tự" },
            })}
            helperText={errors?.password?.message?.toString()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon height={20} color="#446084" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="start"
                  onClick={() => setIsHidePassword(!isHidePassword)}
                >
                  {!isHidePassword ? (
                    <EyeIcon height={20} color="#446084" />
                  ) : (
                    <EyeSlashIcon height={20} color="#446084" />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mt={3}>
          <TextFieldCustom
            type={isHideRePassword ? "password" : " text"}
            fullWidth
            error={errors.rePassword ? true : false}
            placeholder="Nhập lại mật khẩu"
            {...register("rePassword", {
              required: "Trường này không được để trống",
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "Mật khẩu nhập lại không khớp";
                }
              },
            })}
            helperText={errors?.rePassword?.message?.toString()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon height={20} color="#446084" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="start"
                  onClick={() => setIsHideRePassword(!isHideRePassword)}
                >
                  {!isHideRePassword ? (
                    <EyeIcon height={20} color="#446084" />
                  ) : (
                    <EyeSlashIcon height={20} color="#446084" />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mt={3}>
          <Button
            fullWidth
            variant="outlined"
            size="medium"
            color="secondary"
            type="submit"
            disabled={isLoading ? true : false}
          >
            Cập nhật mật khẩu
          </Button>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          mt={8}
          sx={{ cursor: "pointer" }}
          onClick={() => router.push("/")}
        >
          <Typography fontWeight={550}>Quay lại website? Click here</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangePassword;

ChangePassword.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout title="Thay đổi mật khẩu" src="/img/jpg/register.jpg">
      {page}
    </AuthLayout>
  );
};
