import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";

type Props = {
  open: boolean;
  title?: string;
  children: JSX.Element;
  handleClose: () => void;
  handleOk?: any;
};

const AddModal = ({ open, title, children, handleClose, handleOk }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box component={"form"} onSubmit={handleOk}>
        <DialogTitle id="alert-dialog-title">
          <Typography fontWeight={600}>{title || "Hộp thoại thêm"}</Typography>
        </DialogTitle>
        <DialogContent>
          <Box width={"25vw"}>{children}</Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Không đồng ý
          </Button>
          <Button autoFocus variant="contained" type="submit">
            Đồng ý
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddModal;
