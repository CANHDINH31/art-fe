import {
  Box,
  Collapse,
  Divider,
  Input,
  List,
  ListItemButton,
  ListItemText,
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

type Props = {
  onClose: () => void;
};

const DrawerHeader = ({ onClose }: Props) => {
  const router = useRouter();
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
      </Box>
    </Box>
  );
};

export default DrawerHeader;
