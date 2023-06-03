import { Box, Container, Stack, Typography, styled } from "@mui/material";
import React from "react";
import HomeTitle from "../common/Title";
const Text = styled(Typography)(({ theme }) => ({
  textAlign: "justify",
  color: "white",
  fontSize: 14,
  letterSpacing: 0.4,
  wordSpacing: 1.6,
  span: {
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic",
    textShadow: "1px 1px 1px rgba(0,0,0,0.5)",
  },

  [theme.breakpoints.down("lg")]: {
    fontSize: 14,
    span: {
      fontSize: 16,
    },
  },
  [theme.breakpoints.down("md")]: {
    fontSize: 12,
    span: {
      fontSize: 16,
    },
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 12,
    span: {
      fontSize: 14,
    },
  },
}));
const HomeAdvise = () => {
  return (
    <Box bgcolor={"primary.main"} py={4}>
      <Container>
        <HomeTitle
          title="BẠN CẦN ĐƯỢC TƯ VẤN VÀ BÁO GIÁ NHANH VỀ CÁC DỊCH VỤ VẼ TRANH ?"
          color="white"
        />
        <Stack alignItems={"center"} mt={8}>
          <Text>
            Với nhiều năm kinh nghiệm trong lĩnh vực vẽ tranh tường,{" "}
            <span>Mỹ thuật Đông Anh</span> sẽ mang đến cho không gian nhà bạn
            những nét đẹp đầy sáng tạo và nghệ thuật. từ những bức tường đơn
            điệu, họa sĩ sẽ dùng đôi tay tài ba của mình để hô biến tạo nên
            những bức tranh sống động có khả năng chuyền tải thông điệp một cách
            ấn tượng. giờ đây, với tranh tường hà nội, bạn hoàn toàn có thể sở
            hữu những tác phẩm nghệ thuật hội họa được thể hiện trên chính những
            bức tường của{" "}
            <span>phòng khách, phòng ngủ, quán cafe hay văn phòng…</span> Hãy
            đến với <span>Mỹ thuật Đông Anh</span> để cảm nhận sự khác biệt. Hãy
            gọi chúng tôi theo số: <span>0975.146.588</span> hoặc yêu cầu{" "}
            <span>Mỹ thuật Đông Anh</span> gọi lại cho bạn tại đây.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomeAdvise;
