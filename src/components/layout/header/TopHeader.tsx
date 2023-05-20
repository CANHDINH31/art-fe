import { Box, Container, Typography, styled } from "@mui/material";
import { ClockIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

const HeaderItem = styled(Box)(({ theme }) => ({
  color: "rgba(255,255,255,0.8)",
  display: "flex",
  gap: 8,
  paddingRight: 10,
  borderRight: "1px solid rgba(255,255,255,0.6)",
  transition: "ease-in .3",
  "&>svg": {
    width: 14,
  },
  "&>p": {
    fontSize: 14,
  },
  "&:hover": {
    color: "white",
    borderColor: "white",
  },
}));

const TopHeader = () => {
  return (
    <Box bgcolor={"primary.main"} sx={{ cursor: "pointer" }}>
      <Container>
        <Box
          display={"flex"}
          justifyContent={""}
          sx={{ justifyContent: { xs: "center", md: "space-between" } }}
          py={2}
        >
          <Box display={"flex"} alignItems={"center"} gap={4}>
            <HeaderItem>
              <EnvelopeIcon />
              <Typography>Contacts</Typography>
            </HeaderItem>
            <HeaderItem>
              <ClockIcon />
              <Typography>8:00 - 17:00</Typography>
            </HeaderItem>
            <HeaderItem>
              <PhoneIcon />
              <Typography>0975.146.588</Typography>
            </HeaderItem>
          </Box>
          <Box
            sx={{ display: { xs: "none", md: "flex" } }}
            alignItems={"center"}
            gap={4}
          >
            <HeaderItem>
              <Typography>Tranh tường 3D</Typography>
            </HeaderItem>
            <HeaderItem>
              <Typography>Tranh tường mầm non</Typography>
            </HeaderItem>
            <HeaderItem>
              <Typography>Tranh tường nhà hàng</Typography>
            </HeaderItem>
            <HeaderItem>
              <Typography>Tranh tường văn phòng</Typography>
            </HeaderItem>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TopHeader;
