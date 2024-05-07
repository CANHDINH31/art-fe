import AuthLayout from "@/src/components/layout/auth";
import { registerAccount } from "@/src/lib/api";
import {
  EnvelopeIcon,
  KeyIcon,
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
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

const Register = () => {
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

  const { mutate: registerMutate, isLoading } = useMutation({
    mutationFn: registerAccount,
    onSuccess: (res) => {
      if (res.data.status == 400) {
        toast.warn(res.data.message);
      } else {
        toast.success("Đăng kí tài khoản thành công");
        reset();
        router.push("/auth/login");
      }
    },
    onError: (errors) => {
      toast.error("Đăng kí thất bại");
    },
  });

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit((data) =>
        registerMutate({ ...data, visit: localStorage?.getItem("visit") } as {
          email: string;
          name: string;
          password: string;
          visit?: string;
        })
      )}
    >
      <Typography variant="h2" textAlign={"center"}>
        Đăng kí tài khoản
      </Typography>
      <Box mt={3}>
        <Box>
          <TextFieldCustom
            fullWidth
            error={errors.name ? true : false}
            placeholder="Nhập họ tên"
            {...register("name", {
              required: "Trường này không được để trống",
            })}
            helperText={errors?.name?.message?.toString()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <UserIcon height={20} color="#446084" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
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
            Đăng kí
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

export default Register;

Register.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout title="Đăng kí" src="/img/jpg/register.jpg">
      {page}
    </AuthLayout>
  );
};
