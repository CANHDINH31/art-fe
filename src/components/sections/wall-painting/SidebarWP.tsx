import { Box, Divider, Typography } from "@mui/material";
import { listSideBar } from "./data";

const SidebarWP = () => {
  return (
    <Box>
      <Typography variant="h3" fontWeight={"bold"}>
        Danh mục
      </Typography>
      {listSideBar?.map(sidebar => (
        <>
          <Box p={2} sx={{ cursor: "pointer" }} onClick={}>
            <Typography variant="h4" fontWeight={500}>
              {sidebar.title}
            </Typography>
          </Box>
          <Divider />
        </>
      ))}
    </Box>
  );
};

export default SidebarWP;
