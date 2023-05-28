import React from "react";
import Image, { StaticImageData } from "next/image";
import { Box, Typography, keyframes, styled } from "@mui/material";

type Props = {
  url: string | StaticImageData;
  title: string;
};

const showText = keyframes`
  from {
    opacity: 0;
    transform: translateY(20%);
  }
  to {
    opacity: 1;
  }
`;

const WrapText = styled(Box)(({ theme }) => ({
  display: "none",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  position: "absolute",
  bottom: 0,
  height: 40,
  background: theme.palette.primary.main,
  left: 0,
  right: 0,
  animation: `${showText} .5s ease-out`,
}));

const WrapImage = styled(Box)(({}) => ({
  position: "relative",
  "&>img": {
    display: "block",
    width: "100%",
    height: 250,
    objectFit: "cover",
  },
  "&:hover div": {
    display: "flex",
  },
}));

const CardItem = ({ url, title }: Props) => {
  return (
    <Box>
      <WrapImage>
        <Image src={url} alt="home-product" />
        <WrapText>
          <Typography color="white" variant="h6" fontWeight={"bold"}>
            QUICK VIEW
          </Typography>
        </WrapText>
      </WrapImage>
      <Box display={"flex"} justifyContent={"center"} mt={2}>
        <Typography color="primary.main" variant="h4" fontWeight={"bold"}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default CardItem;
