import "@fontsource/public-sans";
import {
  Box,
  Button,
  Divider,
  FormLabel,
  Grid,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";

const ContactFormWrap = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundImage: "url('/img/jpg/ContactBg.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "top",
  width: "100%",
  height: "90vh",
}));

const ContactOverlay = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  position: "absolute",
  width: "70%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  padding: theme.spacing(12.5),
  borderRadius: theme.spacing(2),
}));

const WrapTextArea = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.125, 3.5),
  border: "1px solid rgba(0, 0, 0, 0.23)",
  borderRadius: theme.spacing(1),
  height: 150,
  maxHeight: 150,
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const TextareaCustom = styled(TextareaAutosize)(({ theme }) => ({
  width: "100%",
  outline: "none",
  border: "none",
  resize: "none",
}));

const ContactForm = () => {
  return (
    <ContactFormWrap>
      <ContactOverlay>
        <Grid container spacing={8}>
          <Grid item xs={6}>
            <Box>
              <Typography color="primary.main" variant="h2" fontWeight={"bold"}>
                LIÊN HỆ VỚI CHÚNG TÔI
              </Typography>
              <Divider />
              <Typography color="primary.main" variant="h4" mt={4}>
                Hãy liên lạc với chúng tôi. Chỉ cần điền thông tin chi tiết của
                bạn và gửi cùng với yêu cầu của bạn.
              </Typography>
              <Box textAlign={"center"}>
                <Box
                  mt={4}
                  component="img"
                  src="/img/jpg/ContactBg.jpg"
                  width={"100%"}
                  height={350}
                  borderRadius={4}
                  sx={{ objectFit: "cover", objectPosition: "top" }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              bgcolor={"white"}
              height={"100%"}
              borderRadius={4}
              py={4}
              px={8}
            >
              <Box textAlign={"center"}>
                <Typography
                  color="primary.main"
                  fontWeight={"bold"}
                  variant="h3"
                >
                  Mỹ thuật Đông Anh
                </Typography>
              </Box>
              <Box mt={8}>
                <TextField
                  size="small"
                  fullWidth
                  label="Họ tên"
                  variant="outlined"
                />
              </Box>
              <Box mt={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="Số điện thoại"
                  variant="outlined"
                />
              </Box>
              <Box mt={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="Email"
                  variant="outlined"
                />
              </Box>
              <WrapTextArea mt={4}>
                <TextareaCustom
                  spellCheck={false}
                  minRows={9}
                  placeholder="Nội dung liên hệ"
                />
              </WrapTextArea>
              <Box mt={4}>
                <Button variant="contained" fullWidth>
                  <Typography variant="h3">Liên hệ</Typography>
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ContactOverlay>
    </ContactFormWrap>
  );
};

export default ContactForm;
