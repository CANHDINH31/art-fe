import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { listSideBar } from "./data";
import { useRouter } from "next/router";

type Props = {
  onClose: () => void;
};

const DrawerWP = ({ onClose }: Props) => {
  const router = useRouter();

  return (
    <Box width={250} px={2}>
      <Box mt={8} py={8}>
        <Box>
          <Typography fontWeight={"bold"} variant="h3">
            DANH MỤC
          </Typography>
        </Box>
        <Box mt={4}>
          <List component="nav" aria-labelledby="nested-list-subheader">
            {listSideBar?.map((e, index) => (
              <Box
                key={index}
                onClick={() => {
                  router.push(`/wall-painting/${e.id}`);
                  onClose();
                }}
              >
                <Divider />
                <ListItemButton>
                  <ListItemText primary={e.title} />
                </ListItemButton>
              </Box>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default DrawerWP;
