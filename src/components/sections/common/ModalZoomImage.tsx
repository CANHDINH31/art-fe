import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Box, Modal, styled } from "@mui/material";
type Props = {
  open: boolean;
  handleClose: () => void;
};

const ModalContent = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  "& img": {
    objectFit: "cover",
    objectPostion: "center",
  },
}));

const ModalZoomImage = ({ open, handleClose }: Props) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <ModalContent>
        <TransformWrapper>
          <TransformComponent>
            <Box
              width={"60vw"}
              height={"80vh"}
              src={
                "https://tranhtuongmienbac.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FHomeProduct2.5724f7a4.jpg&w=1920&q=75"
              }
              component={"img"}
            />
          </TransformComponent>
        </TransformWrapper>
      </ModalContent>
    </Modal>
  );
};

export default ModalZoomImage;
