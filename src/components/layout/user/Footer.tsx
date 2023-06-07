import { Box, Container, Typography } from "@mui/material";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import ListSocial from "./common/ListSocial";

const Footer = () => {
  return (
    <Box>
      <Box bgcolor={"header.light"} py={5}>
        <Container>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            gap={8}
            sx={{
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", lg: "center" },
            }}
          >
            <Box width={200}>
              <Box
                component="img"
                src={"/img/png/logo.png"}
                alt="logo"
                width={"100%"}
              />
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              gap={8}
              sx={{
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Box>
                <Typography variant="h5" fontWeight={700}>
                  WEBSITE BÁN TRANH CHÍNH THỨC CỦA MỸ THUẬT ĐÔNG ANH
                </Typography>
                <Box
                  mt={5}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={2}
                  sx={{ cursor: "pointer" }}
                >
                  <Box display={"flex"} alignItems={"center"} gap={1.5}>
                    <MapPinIcon width={18} />
                    <Typography fontWeight={500} variant="h5">
                      Địa chỉ: Đại Mạch, Đông Anh, Hà Nội.
                    </Typography>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={1.5}>
                    <PhoneIcon width={18} />
                    <Typography fontWeight={500} variant="h5">
                      Chăm sóc khách hàng: 0975.146.588
                    </Typography>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={1.5}>
                    <EnvelopeIcon width={18} />
                    <Typography fontWeight={500} variant="h5">
                      Email: mythuatdonganh@gmail.com
                    </Typography>
                  </Box>
                </Box>
                <Box mt={4}>
                  <ListSocial />
                </Box>
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={700}>
                  Giới thiệu & Dịch vụ
                </Typography>
                <Box
                  mt={3}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={2}
                  sx={{ cursor: "pointer" }}
                >
                  <Typography fontWeight={500} variant="h5" mt={1.5}>
                    Tin tức công ty
                  </Typography>
                  <Typography fontWeight={500} variant="h5" mt={1.5}>
                    Tuyển dụng
                  </Typography>
                  <Typography fontWeight={500} variant="h5" mt={1.5}>
                    Dịch vụ bảo hành
                  </Typography>
                  <Typography fontWeight={500} variant="h5" mt={1.5}>
                    Dịch vụ sửa chữa
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box
        bgcolor={"primary.main"}
        display={"flex"}
        justifyContent={"center"}
        py={1}
      >
        <Typography color="white">
          Copyright 2023 © Bản quyền thuộc Mỹ thuật Đông Anh
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
