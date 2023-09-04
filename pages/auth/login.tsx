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
import React, { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginByPlatform, signInAccount } from "@/src/lib/api";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { login } from "@/src/lib/redux/userSlice";
import { setRefreshToken, setToken } from "@/src/lib/utils/jwt";

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
  const dispatch = useDispatch();
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
    onSuccess: (res) => {
      if (res.data.status == 400) {
        toast.warn(res.data.message);
      } else {
        toast.success("Đăng nhập thành công");
        setToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        dispatch(login(res?.data?.user));
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
      if (res) {
        toast.success("Đăng nhập thành công");
        setToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        dispatch(login(res?.data?.user));
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!data) return;
    loginByFlatForm();
  }, [data]);

  return (
    <AuthLayout title="Đăng nhập" loading={isLoading || loginLoading}>
      <Box>
        <Typography variant="h2" textAlign={"center"}>
          Đăng nhập tài khoản
        </Typography>
        <Box
          mt={3}
          component={"form"}
          onSubmit={handleSubmit((data) =>
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
              variant="outlined"
              size="medium"
              color="secondary"
              type="submit"
              disabled={loginLoading ? true : false}
            >
              Đăng nhập
            </Button>
          </Box>
        </Box>
        <Box
          mt={4}
          sx={{ cursor: "pointer" }}
          display={"flex"}
          justifyContent={"flex-end"}
          onClick={() => router.push("/auth/forgot-password")}
        >
          <Typography fontWeight={600} variant="h4">
            Quên mật khẩu ?
          </Typography>
        </Box>
        <Typography textAlign={"center"} mt={4}>
          Hoặc đăng nhập
        </Typography>
        <Box
          display={"flex"}
          gap={{ lg: 4, xs: 2 }}
          mt={5}
          sx={{ flexDirection: { lg: "row", xs: "column" } }}
        >
          <Button
            fullWidth
            variant="outlined"
            disabled={status === "loading" || isLoading}
            onClick={() => signIn("facebook")}
          >
            Facebook
          </Button>
          <Button
            fullWidth
            variant="outlined"
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
    </AuthLayout>
  );
};

export default Login;
