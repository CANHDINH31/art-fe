import {
  Box,
  Breakpoint,
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
  maxWidth?: false | Breakpoint | undefined;
};

const AddModal = ({
  open,
  title,
  children,
  handleClose,
  handleOk,
  maxWidth,
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth={maxWidth ? maxWidth : "sm"}
    >
      <Box component={"form"} onSubmit={handleOk}>
        <DialogTitle id="alert-dialog-title">
          <Typography fontWeight={600}>{title || "Hộp thoại thêm"}</Typography>
        </DialogTitle>
        <DialogContent>
          <Box>{children}</Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Không đồng ý
          </Button>
          <Button autoFocus variant="outlined" type="submit">
            Đồng ý
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddModal;
