import {
  DocumentPlusIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import React from "react";

type Prop = {
  listIdSelected: GridRowSelectionModel;
  handleOpenDelete: () => void;
  handleOpenAdd: () => void;
};

const SettingPM = ({
  listIdSelected,
  handleOpenDelete,
  handleOpenAdd,
}: Prop) => {
  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"} mt={8}>
        <Box flex={1} display={"flex"} justifyContent={"flex-start"} gap={4}>
          <Box width={"30%"}>
            <TextField
              size="small"
              placeholder="Tìm kiếm tên tranh ......"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <MagnifyingGlassIcon width={20} color="primary.main" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box width={"30%"}>
            <Select size="small" fullWidth value={10}>
              <MenuItem value={10}>Tranh phong cảnh</MenuItem>
              <MenuItem value={20}>Tranh văn phòng</MenuItem>
              <MenuItem value={30}>Tranh dát vàng</MenuItem>
            </Select>
          </Box>
        </Box>
        <Box>
          <Button variant="contained">
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <PlusIcon color={"white"} height={20} />
              <Typography color={"white"}>Thêm tranh</Typography>
            </Box>
          </Button>
        </Box>
      </Box>
      <Box mt={4} display={"flex"} justifyContent={"flex-end"} gap={4}>
        <Button
          variant="contained"
          color="success"
          disabled={listIdSelected.length == 0}
          onClick={handleOpenAdd}
        >
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <DocumentPlusIcon color={"white"} height={20} />
            <Typography color={"white"}>Thêm vào danh mục</Typography>
          </Box>
        </Button>
        <Button
          variant="contained"
          color="error"
          disabled={listIdSelected.length == 0}
          onClick={handleOpenDelete}
        >
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <TrashIcon color={"white"} height={20} />
            <Typography color={"white"}>Xóa</Typography>
          </Box>
        </Button>
      </Box>
    </Box>
  );
};

export default SettingPM;
