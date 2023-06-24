import { Box, Divider, Typography } from "@mui/material";
import { listSideBar } from "./data";
import { useRouter } from "next/router";

const SidebarWP = () => {
  const router = useRouter();
  return (
    <Box>
      <Typography variant="h3" fontWeight={"bold"}>
        Danh mục
      </Typography>
      {listSideBar?.map(sidebar => (
        <Box key={sidebar.id}>
          <Box
            p={2}
            sx={{ cursor: "pointer" }}
            onClick={() => router.push(`/wall-painting/${sidebar.id}`)}
          >
            <Typography variant="h4" fontWeight={500}>
              {sidebar.title}
            </Typography>
          </Box>
          <Divider />
        </Box>
      ))}
    </Box>
  );
};

export default SidebarWP;
