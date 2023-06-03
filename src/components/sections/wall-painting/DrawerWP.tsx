import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const DrawerWP = () => {
  return (
    <Box width={250} px={2}>
      <Box mt={8} py={8}>
        <Box>
          <Typography fontWeight={"bold"} variant="h3" color="primary.main">
            DANH MỤC
          </Typography>
        </Box>
        <Box mt={4}>
          <List component="nav" aria-labelledby="nested-list-subheader">
            <Divider />
            <ListItemButton>
              <ListItemText primary={"Tranh tường văn phòng"} />
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemText primary={"Tranh tường mầm non"} />
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemText primary={"Tranh tường cà phê"} />
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemText primary={"Tranh tường nhà hàng"} />
            </ListItemButton>
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default DrawerWP;
