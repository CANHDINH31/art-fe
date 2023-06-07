import { Box, Divider, Typography } from "@mui/material";

const SidebarWP = () => {
  return (
    <Box>
      <Typography variant="h3" fontWeight={"bold"}>
        Danh mục
      </Typography>
      <Box p={2}>
        <Typography variant="h4" fontWeight={500}>
          Tranh tường văn phòng
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <Typography variant="h4" fontWeight={500}>
          Tranh tường mầm non
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <Typography variant="h4" fontWeight={500}>
          Tranh tường cà phê
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <Typography variant="h4" fontWeight={500}>
          Tranh tường nhà hàng
        </Typography>
      </Box>
      <Divider />
    </Box>
  );
};

export default SidebarWP;
