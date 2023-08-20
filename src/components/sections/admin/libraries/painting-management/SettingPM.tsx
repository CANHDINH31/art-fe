import { typeCategory } from "@/src/lib/types";
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
  TextField,
  Typography,
} from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import React from "react";

type Prop = {
  listCategory: typeCategory[];
  listIdSelected: GridRowSelectionModel;
  handleOpenDelete: () => void;
  handleOpenAdd: () => void;
  handleOpenAddPaint: () => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

const SettingPM = ({
  listIdSelected,
  handleOpenDelete,
  handleOpenAdd,
  handleOpenAddPaint,
  title,
  setTitle,
}: Prop) => {
  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"} mt={8}>
        <Box flex={1} display={"flex"} justifyContent={"space-between"}>
          <Box width={"30%"}>
            <TextField
              variant="standard"
              value={title}
              onChange={e => setTitle(e.target.value as string)}
              size="small"
              label="Tìm kiếm tranh"
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
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Button variant="outlined" onClick={handleOpenAddPaint}>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <PlusIcon height={20} />
                <Typography>Thêm tranh</Typography>
              </Box>
            </Button>
            <Button
              variant="outlined"
              color="success"
              disabled={listIdSelected.length == 0}
              onClick={handleOpenAdd}
            >
              Thêm vào danh mục
            </Button>
            <Button
              variant="outlined"
              color="error"
              disabled={listIdSelected.length == 0}
              onClick={handleOpenDelete}
            >
              Xóa
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingPM;
