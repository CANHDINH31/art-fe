import AuthLayout from "@/src/components/layout/auth";
import { sendEmail } from "@/src/lib/api";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
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
import React, { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";

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

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useMutation({
    mutationFn: sendEmail,
    onSuccess: res => {
      setEmail(res.data.data.email);
      reset();
    },
    onError: (errors: any) => {
      setError("email", errors.response.data);
    },
  });

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(data => mutate(data as { email: string }))}
    >
      <Typography variant="h2" textAlign={"center"}>
        Quên mật khẩu
      </Typography>
      {email && (
        <Typography variant="h5" textAlign={"center"} color="green">
          Chúng tôi đã gởi email tới tài khoản {email}. Vui lòng click link
          trong mail vào để thay đổi mật khẩu. Hiệu lực trong vòng 5 phút
        </Typography>
      )}
      <Box mt={8}>
        <Box mt={3}>
          <TextFieldCustom
            fullWidth
            error={errors.email ? true : false}
            placeholder="Nhập email"
            {...register("email", {
              required: "Trường này không được để trống",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email không hợp lệ",
              },
            })}
            helperText={errors?.email?.message?.toString()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EnvelopeIcon height={20} color="#446084" />
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

export default ForgotPassword;

ForgotPassword.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout title="Quên mật khẩu" src="/img/jpg/forgot-password.jpg">
      {page}
    </AuthLayout>
  );
};
