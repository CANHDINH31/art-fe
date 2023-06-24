import {
  Box,
  Container,
  Link,
  ListItemButton,
  Paper,
  Typography,
  keyframes,
  styled,
} from "@mui/material";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { listMenu } from "./data";
import { useRouter } from "next/router";
const ListMenu = styled(Box)(() => ({
  display: "flex",
  cursor: "pointer",
  "& h6": {
    fontWeight: 500,
  },
}));

const ItemMenu = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(0, 4),
  gap: 4,
  display: "flex",
  alignItems: "center",
  whiteSpace: "nowrap",
  color: theme.palette.header.contrastText,
  transition: "ease-in .2s",
  "&>svg": {
    width: 14,
  },
  "&::after": {
    zIndex: 10,
    position: "absolute",
    top: "90%",
    left: 10,
    content: '""',
    width: "80%",
    height: 20,
  },
  "&:hover": {
    color: theme.palette.primary,
  },
  "&:hover div": {
    display: "block",
  },
}));

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&.MuiListItemButton-root": {
    padding: 0,
    backgroundColor: theme.palette.header.light,
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.header.light,
    color: "rgba(17, 17, 17, 0.95)",
    "& h6": {
      fontWeight: 600,
    },
  },
  "&.Mui-selected:hover": {
    backgroundColor: theme.palette.header.light,
  },
}));

const fadeIn = keyframes`
  from {
    opacity: 0;
    top: calc(100% + 80px);
  }

  to {
    opacity: 1;
    top: calc(100% + 20px);
  }
`;

const ListSubMenu = styled(Paper)(({ theme }) => ({
  background: "white",
  display: "none",
  position: "absolute",
  top: "calc(100% + 10px)",
  left: 20,
  minWidth: 220,
  zIndex: 9,
  animation: `${fadeIn} ease-in 0.3s`,
  border: `1px solid ${theme.palette.primary.main}`,
}));

const SubMenuItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5, 2.5),
  borderBottom: `1px solid ${theme.palette.border.main}`,
  transition: "ease-in .2s",
  color: theme.palette.primary.main,
  "&:last-child": {
    borderBottom: "none",
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    h4: {
      color: "white",
    },
  },
}));

const MainMenu = () => {
  const router = useRouter();
  return (
    <Box
      bgcolor={"header.light"}
      py={2}
      sx={{ display: { xs: "none", lg: "flex" } }}
    >
      <Container>
        <Box display={"flex"} justifyContent={"space-between"}>
          <ListMenu>
            {listMenu.map(menu => (
              <ItemMenu key={menu.title}>
                <Link href={menu.href}>
                  <CustomListItemButton
                    selected={router.pathname === menu.href}
                    sx={{ backgroundColor: "white" }}
                  >
                    <Typography variant="h5" fontWeight={600}>
                      {menu.title.toUpperCase()}
                    </Typography>
                  </CustomListItemButton>
                </Link>
                {menu.sub && (
                  <>
                    <ChevronDownIcon />
                    <ListSubMenu elevation={3}>
                      {menu.sub?.map(submenu => (
                        <SubMenuItem key={submenu.title}>
                          <Link href={submenu.href}>
                            <Typography variant="h4">
                              {submenu.title}
                            </Typography>
                          </Link>
                        </SubMenuItem>
                      ))}
                    </ListSubMenu>
                  </>
                )}
              </ItemMenu>
            ))}
          </ListMenu>
        </Box>
      </Container>
    </Box>
  );
};

export default MainMenu;
