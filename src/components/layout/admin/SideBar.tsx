import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import {
  PhotoIcon,
  ChevronLeftIcon,
  ChartBarIcon,
  ChatBubbleBottomCenterIcon,
  UsersIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";
import { styled } from "@mui/system";

const BackButton = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  cursor: "pointer",
  p: {
    color: theme.palette.primary.main,
  },
  svg: {
    height: 18,
    color: theme.palette.primary.main,
  },
}));

const MenuItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  cursor: "pointer",
  p: {
    fontSize: 16,
    color: theme.palette.primary.main,
  },
  svg: {
    height: 24,
    color: theme.palette.primary.main,
  },
}));

const SideBar = () => {
  return (
    <Stack height={"100%"} justifyContent={"space-between"}>
      <Box flex={1} px={4} pt={4}>
        <BackButton>
          <ChevronLeftIcon />
          <Typography>Back to Website</Typography>
        </BackButton>

        <Box display={"flex"} mt={8} alignItems={"center"} gap={2}>
          <Avatar
            alt="Remy Sharp"
            src="https://mui.com/static/images/avatar/1.jpg"
          />
          <Typography color="primary.main" fontWeight={600}>
            @Mỹ thuật Đông Anh
          </Typography>
        </Box>

        <Stack mt={16} gap={6}>
          <MenuItem>
            <ChartBarIcon />
            <Typography>Thống kê</Typography>
          </MenuItem>
          <MenuItem>
            <PhotoIcon />
            <Typography>Thư viện tranh</Typography>
          </MenuItem>
          <MenuItem>
            <UsersIcon />
            <Typography>Quản lý người dùng </Typography>
          </MenuItem>
          <MenuItem>
            <ChatBubbleBottomCenterIcon />
            <Typography>Chat GPT</Typography>
          </MenuItem>
          <MenuItem>
            <WrenchIcon />
            <Typography>Tool hỗ trợ</Typography>
          </MenuItem>
        </Stack>
      </Box>
      <Divider />

      <Box p={4}>
        <Box component={"img"} src="/img/png/logo.png" width={200} />
      </Box>
    </Stack>
  );
};

export default SideBar;
