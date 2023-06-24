import {
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
  content: string;
  handleClose: () => void;
  handleOk?: any;
};

const ConfirmDeleteModal = ({
  open,
  title,
  content,
  handleClose,
  handleOk,
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h3" fontWeight={600}>
          {title || "Hộp thoại xác nhận xóa"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="h4">{content}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="error">
          Không đồng ý
        </Button>
        <Button autoFocus variant="contained" onClick={handleOk}>
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
