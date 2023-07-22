import {
  Badge,
  Box,
  Container,
  Divider,
  Popover,
  Typography,
  styled,
} from "@mui/material";
import {
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { HeartIcon, UserIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import useAuth from "@/src/lib/hooks/useAuth";
import { signOut } from "next-auth/react";

const InputWrap = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#f7f7f7",
  padding: theme.spacing(3, 4),
  border: "1px solid #ddd",
  minWidth: 500,
  borderRadius: theme.spacing(4),
  input: {
    outline: "none",
    border: "none",
    backgroundColor: "#f7f7f7",
    fontSize: 14,
    width: "100%",
    color: theme.palette.primary.main,
  },
  svg: {
    cursor: "pointer",
  },
}));

const SearchHeader = () => {
  const router = useRouter();
  const { user, handleLogout } = useAuth();
  const [searchValue, setSearchValue] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const navigateSearchPage = () => {
    searchValue && router.push(`/search?query=${searchValue}`);
    setSearchValue("");
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && searchValue) {
      navigateSearchPage();
    }
  };

  return (
    <Box py={2} bgcolor={"white"} sx={{ display: { xs: "none", lg: "flex" } }}>
      <Container>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ cursor: "pointer" }}
        >
          <Box display={"flex"} alignItems={"center"} gap={10}>
            <Box
              onClick={() => router.push("/")}
              component={"img"}
              src={"/img/png/logo.png"}
              height={80}
              sx={{ objectFit: "contain", cursor: "pointer" }}
            />
            <InputWrap>
              <input
                placeholder="Tìm kiếm sản phẩm (nhập đầy đủ dấu) ..."
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={handleSearch}
              />
              <MagnifyingGlassIcon
                width={18}
                color="black"
                onClick={navigateSearchPage}
              />
            </InputWrap>
          </Box>

          <Box display={"flex"} alignItems={"center"} gap={8}>
            <Box display={"flex"} alignItems={"center"} gap={2}>
              <Badge badgeContent={1} color="error">
                <HeartIcon height={30} color="#446084" />
              </Badge>

              <Typography variant="h5" whiteSpace={"nowrap"} fontWeight={550}>
                YÊU THÍCH
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            {user ? (
              <>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  gap={2}
                  onClick={(event: any) => setAnchorEl(event.currentTarget)}
                >
                  <Box
                    component={"img"}
                    src={user?.image || "img/jpg/default-avatar.jpg"}
                    width={30}
                    height={30}
                    borderRadius={"50%"}
                    sx={{ objectFit: "cover" }}
                  />
                  <Typography
                    variant="h5"
                    whiteSpace={"nowrap"}
                    fontWeight={550}
                  >
                    {user?.name}
                  </Typography>
                </Box>
                <Popover
                  sx={{ marginTop: 2 }}
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={() => setAnchorEl(null)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Box sx={{ cursor: "pointer", minWidth: 200 }}>
                    {user?.isAdmin && (
                      <>
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          px={3}
                          py={2}
                          gap={4}
                          onClick={() => router.push("/admin")}
                        >
                          <Cog6ToothIcon height={24} color="#446084" />
                          <Typography>Quản trị viên</Typography>
                        </Box>
                        <Divider />
                      </>
                    )}

                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      px={3}
                      py={2}
                      gap={4}
                      onClick={() => {
                        signOut();
                        handleLogout();
                      }}
                    >
                      <ArrowRightOnRectangleIcon height={24} color="#446084" />
                      <Typography>Đăng xuất</Typography>
                    </Box>
                  </Box>
                </Popover>
              </>
            ) : (
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={2}
                onClick={() => router.push("/auth/login")}
              >
                <UserIcon height={30} color="#446084" />
                <Typography variant="h5" whiteSpace={"nowrap"} fontWeight={550}>
                  ĐĂNG NHẬP
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SearchHeader;
