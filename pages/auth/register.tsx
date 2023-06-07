import AuthLayout from "@/src/components/layout/auth";
import { EnvelopeIcon, KeyIcon, UserIcon } from "@heroicons/react/24/solid";
import { Box, Button, Divider, Typography, styled } from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

const WrapInput = styled(Box)(({ theme }) => ({
  position: "relative",
  svg: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: 10,
    width: 20,
    color: theme.palette.primary.main,
  },
}));

const InputCustom = styled("input")(({ theme }) => ({
  width: "100%",
  height: 45,
  outline: "none",
  paddingLeft: theme.spacing(10),
  borderRadius: 5,
  border: "1px solid #00000020",
  transition: "all .15s ease-in-out",
  fontSize: "1rem",
  color: theme.palette.primary.main,
  "&:focus": {
    border: "1px solid #007bff",
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
  },
  "&::placeholder": {
    color: theme.palette.primary.main,
  },
}));

const Register = () => {
  const router = useRouter();
  return (
    <Box>
      <Typography variant="h2" textAlign={"center"}>
        Đăng kí tài khoản
      </Typography>
      <Box mt={4}>
        <WrapInput>
          <UserIcon />
          <InputCustom placeholder="Nhập họ tên " />
        </WrapInput>
        <WrapInput mt={5}>
          <EnvelopeIcon />
          <InputCustom placeholder="Nhập email " />
        </WrapInput>
        <WrapInput mt={5}>
          <KeyIcon />
          <InputCustom placeholder="Nhập mật khẩu " type="password" />
        </WrapInput>
        <WrapInput mt={5}>
          <KeyIcon />
          <InputCustom placeholder="Nhập lại mật khẩu " type="password" />
        </WrapInput>
        <Box mt={5}>
          <Button fullWidth variant="contained" size="medium" color="secondary">
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
  return <AuthLayout title="Đăng kí">{page}</AuthLayout>;
};
