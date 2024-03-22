import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";

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
  [theme.breakpoints.down("md")]: {
    width: "80%",
    padding: theme.spacing(6),
  },
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    padding: theme.spacing(4),
  },
}));

const ContactForm = () => {
  return (
    <ContactFormWrap>
      <ContactOverlay>
        <Grid container spacing={8}>
          <Grid item lg={6}>
            <Box sx={{ display: { xs: "none", lg: "block" } }}>
              <Typography variant="h2" fontWeight={"bold"}>
                LIÊN HỆ VỚI CHÚNG TÔI
              </Typography>
              <Divider />
              <Typography variant="h4" mt={4}>
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
          <Grid item xs={12} lg={6}>
            <Box
              bgcolor={"white"}
              height={"100%"}
              borderRadius={4}
              sx={{ paddingX: { xs: 4, md: 6 }, paddingY: { xs: 4, md: 6 } }}
            >
              <Box textAlign={"center"}>
                <Typography fontWeight={"bold"} variant="h3">
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
              <Box mt={4}>
                <TextField
                  multiline
                  minRows={9}
                  placeholder="Nội dung liên hệ"
                  fullWidth
                />
              </Box>
              <Box mt={4}>
                <Button variant="contained" fullWidth>
                  <Typography variant="h3" color={"white"}>
                    Liên hệ
                  </Typography>
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
