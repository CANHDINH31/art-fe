import { Box, Container, Link, Typography, styled } from "@mui/material";
import { ClockIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

const HeaderItem = styled(Box)(({ theme }) => ({
  color: "rgba(255,255,255,0.8)",
  display: "flex",
  alignItems: "center",
  gap: 8,
  paddingRight: 10,
  borderRight: "1px solid rgba(255,255,255,0.6)",
  transition: "ease-in .3",
  "&>svg": {
    width: 14,
    height: 14,
  },
  "&>p": {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  "&:hover": {
    color: "white",
    borderColor: "white",
    p: {
      color: "white",
    },
  },
}));

const TopHeader = () => {
  const router = useRouter();
  return (
    <Box bgcolor={"primary.main"} sx={{ cursor: "pointer" }}>
      <Container>
        <Box
          display={"flex"}
          sx={{ justifyContent: { xs: "center", md: "space-between" } }}
          py={2}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          >
            <Link href={"mailto:mythuatdonganh@gmail.com"}>
              <HeaderItem>
                <EnvelopeIcon />
                <Typography>Contacts</Typography>
              </HeaderItem>
            </Link>
            <HeaderItem>
              <ClockIcon />
              <Typography>8:00 - 17:00</Typography>
            </HeaderItem>
            <Link href={"tel:0975146588"}>
              <HeaderItem>
                <PhoneIcon />
                <Typography>0975.146.588</Typography>
              </HeaderItem>
            </Link>
          </Box>
          <Box
            sx={{ display: { xs: "none", md: "flex" } }}
            alignItems={"center"}
            gap={4}
          >
            <HeaderItem onClick={() => router.push("/")}>
              <Typography>Trang chủ</Typography>
            </HeaderItem>
            <HeaderItem onClick={() => router.push("/introduce")}>
              <Typography>Giới thiệu</Typography>
            </HeaderItem>
            <HeaderItem onClick={() => router.push("/contact")}>
              <Typography>Liên hệ</Typography>
            </HeaderItem>
            <HeaderItem onClick={() => router.push("/")}>
              <Typography>Tuyển dụng</Typography>
            </HeaderItem>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TopHeader;
