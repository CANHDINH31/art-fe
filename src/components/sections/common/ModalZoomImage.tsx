import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Box, Modal, styled } from "@mui/material";
type Props = {
  open: boolean;
  handleClose: () => void;
  image: string;
};

const ModalContent = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  "& img": {
    display: "block",
    height: "94vh",
    objectFit: "contain",
  },
}));

const ModalZoomImage = ({ open, handleClose, image }: Props) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <ModalContent>
        <TransformWrapper>
          <TransformComponent>
            <Box src={image} component={"img"} />
          </TransformComponent>
        </TransformWrapper>
      </ModalContent>
    </Modal>
  );
};

export default ModalZoomImage;
