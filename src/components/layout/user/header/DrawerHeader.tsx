import {
  Box,
  Button,
  Collapse,
  Divider,
  Input,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { listMenu } from "./data";
import { useState } from "react";
import { HeaderType } from "@/src/lib/config";
import { useRouter } from "next/router";
import useAuth from "@/src/lib/hooks/useAuth";
import { signOut } from "next-auth/react";

type Props = {
  onClose: () => void;
};

const DrawerHeader = ({ onClose }: Props) => {
  const router = useRouter();
  const { user, handleLogout } = useAuth();
  const [collapseActive, setCollapseActive] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const toggleColappseActive = (collapse: string) => {
    if (!collapseActive.includes(collapse)) {
      setCollapseActive([...collapseActive, collapse]);
    } else {
      setCollapseActive(collapseActive.filter(item => item !== collapse));
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
  return (
    <Box width={250} py={8} px={2}>
      <Box display={"flex"} width={"100%"} alignItems={"stretch"}>
        <Input
          placeholder="Tìm kiếm ..."
          size="small"
          sx={{ width: "100%" }}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
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
        <Box display={"flex"} gap={2} alignItems={"center"}>
          {user ? (
            <>
              <Box
                component={"img"}
                src={user?.image || "img/jpg/default-avatar.jpg"}
                width={30}
                height={30}
                borderRadius={"50%"}
                sx={{ objectFit: "cover" }}
              />
              <Typography variant="h5" whiteSpace={"nowrap"} fontWeight={550}>
                {user?.name}
              </Typography>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                size="small"
                fullWidth
                onClick={() => router.push("/auth/login")}
              >
                Đăng nhập
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                fullWidth
                onClick={() => router.push("/auth/register")}
              >
                Đăng kí
              </Button>
            </>
          )}
        </Box>
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
                  {menu?.sub?.map(submenu => (
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
        {user && (
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={() => {
              signOut();
              handleLogout();
            }}
          >
            Đăng xuất
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default DrawerHeader;
