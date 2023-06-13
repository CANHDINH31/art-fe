import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";

type Props = {
  open: boolean;
  title?: string;
  children: JSX.Element;
  handleClose: () => void;
};

const AddModal = ({ open, title, children, handleClose }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h3" fontWeight={600}>
          {title || "Hộp thoại thêm"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Box width={"25vw"}>{children}</Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={handleClose}>
          Không đồng ý
        </Button>
        <Button autoFocus variant="contained">
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModal;
