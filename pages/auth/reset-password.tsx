import AuthLayout from "@/src/components/layout/auth";
import { registerAccount, resetPassword } from "@/src/lib/api";
import { KeyIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
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

const ResetPassword = () => {
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
    mutationFn: resetPassword,
    onSuccess: res => {
      toast.success(res.data.message);
      router.push("/auth/login");
    },
    onError: (errors: any) => {
      toast.error(errors.response.data.message);
      router.push("/auth/forgot-password");
    },
  });

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(data =>
        mutate({
          token: router.query.token as string,
          password: data.password,
        })
      )}
    >
      <Typography variant="h2" textAlign={"center"}>
        Reset mật khẩu
      </Typography>
      <Typography variant="h6" textAlign={"center"} color={"red"}>
        Lưu ý: Bạn phải thay đổi mật khẩu trong vòng 5 phút
      </Typography>
      <Box mt={3}>
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
            Reset mật khẩu
          </Button>
        </Box>
      </Box>
      <Box mt={8}>
        <Divider />
      </Box>
      <Box mt={5}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          gap={2}
          sx={{ cursor: "pointer" }}
          onClick={() => router.push("/")}
        >
          <Typography>Quay lại Website ?</Typography>
          <Typography fontWeight={600}>Click Here</Typography>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          gap={2}
          sx={{ cursor: "pointer" }}
          mt={1}
          onClick={() => router.push("/auth/login")}
        >
          <Typography>Bạn đã có tài khoản ?</Typography>
          <Typography fontWeight={600}>Đăng nhập</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;

ResetPassword.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout title="Reset mật khẩu" src="/img/jpg/reset-password.jpg">
      {page}
    </AuthLayout>
  );
};
