import React from "react";
import { Box, Modal, SxProps } from "@mui/material";

const sx = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type Props = {
  open: boolean;
  handleClose: () => void;
  children: JSX.Element;
  style?: SxProps;
};

function ModalCustom({ open, handleClose, style, children }: Props) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...sx, ...style }}>{children}</Box>
    </Modal>
  );
}

export default ModalCustom;
