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

const DrawerHeader = () => {
  const [collapseActive, setCollapseActive] = useState<string[]>([]);
  const toggleColappseActive = (collapse: string) => {
    if (!collapseActive.includes(collapse)) {
      setCollapseActive([...collapseActive, collapse]);
    } else {
      setCollapseActive(collapseActive.filter(item => item !== collapse));
    }
  };
  return (
    <Box width={250} py={8} px={2}>
      <Box display={"flex"}>
        <Input placeholder="Tìm kiếm ..." size="small" />
        <Box
          bgcolor={"primary.main"}
          display={"flex"}
          alignItems={"center"}
          padding={2}
        >
          <MagnifyingGlassIcon width={18} color="white" />
        </Box>
      </Box>
      <Box mt={8}>
        <List component="nav" aria-labelledby="nested-list-subheader">
          {listMenu?.map((menu, index) => (
            <Box key={index}>
              <Divider />
              <ListItemButton onClick={() => toggleColappseActive(menu.title)}>
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
                      <ListItemButton sx={{ paddingLeft: 8 }}>
                        <ListItemText primary={submenu.title} />
                      </ListItemButton>
                    </List>
                  ))}
                </Collapse>
              )}

              <Divider />
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default DrawerHeader;
