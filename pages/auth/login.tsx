import AuthLayout from "@/src/components/layout/auth";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/solid";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginByPlatform, signInAccount } from "@/src/lib/api";
import { toast } from "react-toastify";
import useAuth from "@/src/lib/hooks/useAuth";
import { signIn, signOut, useSession } from "next-auth/react";

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
const Login = () => {
  const router = useRouter();
  const { handleLogin } = useAuth();
  const { data, status } = useSession();
  const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: loginMutate, isLoading: loginLoading } = useMutation({
    mutationFn: signInAccount,
    onSuccess: res => {
      if (res.data.status == 400) {
        toast.warn(res.data.message);
      } else {
        res.data && handleLogin(res.data);
      }
    },
    onError: (errors: any) => {
      toast.error(errors?.response?.data?.message);
    },
  });

  const loginByFlatForm = async () => {
    setIsLoading(true);
    try {
      const res = await loginByPlatform(
        data?.user?.provider as string,
        data?.user?.id_token || (data?.user?.access_token as string)
      );
      handleLogin(res.data);
    } catch (error) {}
    setIsLoading(false);
  };

  useEffect(() => {
    if (!data) return;
    loginByFlatForm();
  }, [data]);

  return (
    <Box>
      <Typography variant="h2" textAlign={"center"}>
        Đăng nhập tài khoản
      </Typography>
      <Box
        mt={3}
        component={"form"}
        onSubmit={handleSubmit(data =>
          loginMutate(data as { email: string; password: string })
        )}
      >
        <Box>
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
          <TextFieldCustom
            fullWidth
            type={isHidePassword ? "password" : " text"}
            error={errors.password ? true : false}
            placeholder="Nhập mật khẩu"
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
          <Button
            fullWidth
            variant="contained"
            size="medium"
            color="secondary"
            type="submit"
            disabled={loginLoading ? true : false}
          >
            Đăng nhập
          </Button>
        </Box>
      </Box>
      <Typography textAlign={"center"} mt={8}>
        Hoặc đăng nhập
      </Typography>
      <Box display={"flex"} gap={4} mt={5}>
        <Button
          fullWidth
          variant="contained"
          disabled={status === "loading" || isLoading}
          onClick={() => signIn("facebook")}
        >
          Facebook
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="error"
          disabled={status === "loading" || isLoading}
          onClick={() => signIn("google")}
        >
          Google
        </Button>
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
          onClick={() => router.push("/auth/register")}
        >
          <Typography>Bạn chưa có tài khoản ?</Typography>
          <Typography fontWeight={600}>Đăng kí</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

Login.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout title="Đăng nhập">{page}</AuthLayout>;
};
