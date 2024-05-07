import {
  Box,
  Button,
  Collapse,
  Divider,
  Input,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  KeyIcon,
  ArrowUpTrayIcon,
  HeartIcon,
  InformationCircleIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { listMenu } from "./data";
import { useState } from "react";
import { HeaderType } from "@/src/lib/config";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "@/src/lib/utils/jwt";
import { logout } from "@/src/lib/redux/userSlice";
import { convertUrlImage } from "@/src/lib/utils/common";

type Props = {
  onClose: () => void;
};

const DrawerHeader = ({ onClose }: Props) => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state?.user);
  const dispatch = useDispatch();

  const [collapseActive, setCollapseActive] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const toggleColappseActive = (collapse: string) => {
    if (!collapseActive.includes(collapse)) {
      setCollapseActive([...collapseActive, collapse]);
    } else {
      setCollapseActive(collapseActive.filter((item) => item !== collapse));
    }
  };

  const handleClickItem = (type: string, value: string) => {
    if (type === HeaderType[0]) {
      router.push(value);
      onClose();
    } else {
      toggleColappseActive(value as string);
    }
  };

  const navigateSearchPage = () => {
    if (searchValue) {
      onClose();
      router.push(`/search?query=${searchValue}`);
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && searchValue) {
      onClose();
      navigateSearchPage();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("visit");
    clearToken();
    signOut();
    dispatch(logout());
  };

  return (
    <Box width={250} py={8} px={2} overflow={"scroll"}>
      <Box display={"flex"} width={"100%"} alignItems={"stretch"}>
        <Input
          placeholder="Tìm kiếm ..."
          size="small"
          sx={{ width: "100%" }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleSearch}
        />
        <Box
          bgcolor={"primary.main"}
          display={"flex"}
          alignItems={"center"}
          px={1}
          onClick={navigateSearchPage}
        >
          <MagnifyingGlassIcon width={18} color="white" />
        </Box>
      </Box>

      <Box mt={8}>
        {user ? (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <Box
                component={"img"}
                src={
                  user?.image
                    ? convertUrlImage(user?.image)
                    : "/img/jpg/default-avatar.jpg"
                }
                width={30}
                height={30}
                borderRadius={"50%"}
                sx={{ objectFit: "cover" }}
              />
              <Typography variant="h5" whiteSpace={"nowrap"} fontWeight={550}>
                {user?.name}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Stack gap={2}>
            <Button
              variant="outlined"
              size="small"
              fullWidth
              onClick={() => router.push("/auth/login")}
            >
              Đăng nhập
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              fullWidth
              onClick={() => router.push("/auth/register")}
            >
              Đăng kí
            </Button>
          </Stack>
        )}
        <List component="nav" aria-labelledby="nested-list-subheader">
          <Box>
            <Divider />
            <ListItemButton>
              <ListItemText
                primary={"Trang chủ"}
                onClick={() => {
                  router.push("/");
                  onClose();
                }}
              />
            </ListItemButton>
          </Box>
          <Box>
            <Divider />
            <ListItemButton>
              <ListItemText
                primary={"Giới thiệu"}
                onClick={() => {
                  router.push("/introduce");
                  onClose();
                }}
              />
            </ListItemButton>
          </Box>
          <Box>
            <Divider />
            <ListItemButton>
              <ListItemText
                primary={"Liên hệ"}
                onClick={() => {
                  router.push("/contact");
                  onClose();
                }}
              />
            </ListItemButton>
          </Box>
          {listMenu?.map((menu, index) => (
            <Box key={index}>
              <Divider />
              <ListItemButton
                onClick={() => {
                  if (menu?.sub) {
                    handleClickItem(HeaderType[1], menu.title);
                  } else {
                    handleClickItem(HeaderType[0], menu.href);
                  }
                }}
              >
                <ListItemText primary={menu.title} />
                {menu?.sub &&
                  (!collapseActive.includes(menu.title) ? (
                    <ChevronDownIcon width={18} />
                  ) : (
                    <ChevronUpIcon width={18} />
                  ))}
              </ListItemButton>
              {menu?.sub && (
                <Collapse
                  in={collapseActive.includes(menu.title)}
                  timeout="auto"
                  unmountOnExit
                >
                  {menu?.sub?.map((submenu) => (
                    <List component="div" disablePadding key={submenu.title}>
                      <ListItemButton
                        sx={{ paddingLeft: 8 }}
                        onClick={() => {
                          handleClickItem(HeaderType[0], submenu.href);
                        }}
                      >
                        <ListItemText primary={submenu.title} />
                      </ListItemButton>
                    </List>
                  ))}
                </Collapse>
              )}
            </Box>
          ))}
        </List>
        <Divider />
        {user && (
          <Stack gap={2}>
            <Button variant="outlined" color="primary" fullWidth>
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={2}
                onClick={() => {
                  router.push("/me/favourite");
                }}
              >
                <HeartIcon height={18} color="#446084" />
                <span>Yêu thích ({user?.favourite?.length})</span>
              </Box>
            </Button>
            <Button variant="outlined" color="primary" fullWidth>
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={2}
                onClick={() => {
                  router.push("/me/cart");
                }}
              >
                <ShoppingCartIcon height={18} color="#446084" />
                <span>Giỏ hàng ({user?.cart?.length})</span>
              </Box>
            </Button>
            <Button variant="outlined" color="primary" fullWidth>
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={2}
                onClick={() => {
                  router.push("/auth/change-password");
                }}
              >
                <KeyIcon height={18} color="#446084" />
                <span>Thay đổi mật khẩu</span>
              </Box>
            </Button>
            <Button variant="outlined" color="primary" fullWidth>
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={2}
                onClick={() => {
                  router.push("/change-info");
                }}
              >
                <InformationCircleIcon height={18} color="#446084" />
                <span>Cập nhật thông tin</span>
              </Box>
            </Button>
            <Button variant="outlined" color="primary" fullWidth>
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={2}
                onClick={() => {
                  router.push("/me/orders");
                }}
              >
                <ShoppingCartIcon height={18} color="#446084" />
                <span>Quản lý đơn hàng</span>
              </Box>
            </Button>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={handleLogout}
            >
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <ArrowUpTrayIcon height={18} color="#d32f2f" />
                <span>Đăng xuất</span>
              </Box>
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default DrawerHeader;
