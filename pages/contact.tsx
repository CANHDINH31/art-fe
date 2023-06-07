import MainLayout from "@/src/components/layout/user";
import ContactForm from "@/src/components/sections/contact/ContactForm";
import { Box, Container, Typography, styled } from "@mui/material";
import React, { ReactElement } from "react";

const ListCustom = styled("ul")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "bold",
}));

const ItemCustom = styled("li")(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const Introduce = () => {
  return (
    <Box py={8}>
      <Container>
        <Box>
          <Typography variant="h1" fontWeight={"bold"}>
            Liên hệ
          </Typography>
          <Typography
            variant="h4"
            color={"primary.main"}
            fontWeight={"bold"}
            mt={8}
          >
            Viết về tranh tường miền Bắc
          </Typography>
          <Typography variant="h4" mt={2}>
            <strong>Tranh tường miền Bắc</strong> là một trong những cơ sở đầu
            tiên ở Việt Nam cung cấp dịch vẽ tranh tường với chất lượng hàng đầu
            và hỗ trợ dịch vụ trọn gói:
          </Typography>
          <ListCustom>
            <ItemCustom>Tư vấn trang trí nhà miễn phí</ItemCustom>
            <ItemCustom>Tư vấn vật liệu</ItemCustom>
            <ItemCustom>Thiết kế theo yêu cầu</ItemCustom>
            <ItemCustom>Giám sát và chỉnh sửa sản phẩm</ItemCustom>
          </ListCustom>
          <Typography variant="h4" mt={2}>
            Tranh tường miền Bắc tự hào là thương hiệu uy tín đã được sử dụng
            trang trí cho hơn 350000 căn hộ cao cấp trên toàn quốc.
          </Typography>
          <ListCustom>
            <ItemCustom>Hotline: 0975.146.588</ItemCustom>
            <ItemCustom>Email: tranhtuongmienbac@gmail.com</ItemCustom>
            <ItemCustom>Địa chỉ: Đại Mạch, Đông Anh, Hà Nội</ItemCustom>
          </ListCustom>
        </Box>
      </Container>
      <Box mt={8}>
        <ContactForm />
      </Box>
    </Box>
  );
};

export default Introduce;

Introduce.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="Liên hệ">{page}</MainLayout>;
};
