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

const DrawerHeader = () => {
  const router = useRouter();
  const [collapseActive, setCollapseActive] = useState<string[]>([]);
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
    } else {
      toggleColappseActive(value as string);
    }
  };
  return (
    <Box width={250} py={8} px={2}>
      <Box display={"flex"} width={"100%"} alignItems={"stretch"}>
        <Input placeholder="Tìm kiếm ..." size="small" sx={{ width: "100%" }} />
        <Box
          bgcolor={"primary.main"}
          display={"flex"}
          alignItems={"center"}
          px={1}
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
                onClick={() => router.push("/")}
              />
            </ListItemButton>
          </Box>
          <Box>
            <Divider />
            <ListItemButton>
              <ListItemText
                primary={"Giới thiệu"}
                onClick={() => router.push("/introduce")}
              />
            </ListItemButton>
          </Box>
          <Box>
            <Divider />
            <ListItemButton>
              <ListItemText
                primary={"Liên hệ"}
                onClick={() => router.push("/contact")}
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
