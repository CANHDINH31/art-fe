import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import { listMenuSidebar } from "./data";
import { useSelector } from "react-redux";

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
  padding: theme.spacing(2, 4),
  borderRadius: theme.spacing(1),

  p: {
    fontSize: 16,
    color: theme.palette.primary.main,
  },
  svg: {
    height: 24,
    color: theme.palette.primary.main,
  },

  "&.active": {
    backgroundColor: theme.palette.primary.main,
    p: {
      color: "white",
    },
    svg: {
      color: "white",
    },
  },
}));

const SideBar = () => {
  const { push, pathname } = useRouter();
  const { user } = useSelector((state: any) => state?.user);

  return (
    <Stack height={"100%"} justifyContent={"space-between"}>
      <Box flex={1} pt={4} px={1}>
        <Box px={4}>
          <BackButton onClick={() => push("/")}>
            <ChevronLeftIcon />
            <Typography>Back to Website</Typography>
          </BackButton>

          <Box display={"flex"} mt={8} alignItems={"center"} gap={2}>
            <Avatar
              alt="Remy Sharp"
              src={user?.image || "/img/jpg/default-avatar.jpg"}
            />
            <Typography fontWeight={600}>{user?.name}</Typography>
          </Box>
        </Box>

        <Stack mt={16} gap={2}>
          {listMenuSidebar.map((menu, index) => (
            <Box key={index}>
              <MenuItem
                onClick={() => push(menu.path)}
                className={pathname.includes(menu.path) ? "active" : ""}
              >
                {menu.icon}
                <Typography>{menu.name}</Typography>
              </MenuItem>
            </Box>
          ))}
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
