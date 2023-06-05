import React from "react";
import { Box, keyframes, styled } from "@mui/material";
import Image from "next/image";

type Props = {
  bgFill: string;
  bsFill: string;
  bgCircle: string;
  image: any;
};

const zoom = keyframes`
  0% {
    transform: scale(.9);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 15px transparent;
  }
  100% {
    transform: scale(.9);
    box-shadow: 0 0 0 0 transparent;
  }
`;

const socialHide = keyframes`
  0% {
    -webkit-transform: rotate(0) scale(1) skew(1deg);
}
10% {
    -webkit-transform: rotate(-25deg) scale(1) skew(1deg);
}
20% {
    -webkit-transform: rotate(25deg) scale(1) skew(1deg);
}
30% {
    -webkit-transform: rotate(-25deg) scale(1) skew(1deg);
}
40% {
    -webkit-transform: rotate(25deg) scale(1) skew(1deg);
}
50% {
    -webkit-transform: rotate(0) scale(1) skew(1deg);
}
100% {
    -webkit-transform: rotate(0) scale(1) skew(1deg);
}
`;

const Socail = styled(Box)(({}) => ({
  width: 90,
  height: 90,
  position: "relative",
  cursor: "pointer",
  "& .phone-vr-circle-fill": {
    width: 65,
    height: 65,
    top: 12,
    left: 12,
    position: "absolute",
    borderRadius: "50%",
    border: "2px solid transparent",
    transition: "all .5s",
    transformOrigin: "50% 50%",
    animation: `${zoom} 1.3s infinite`,
  },

  "& .phone-vr-img-circle": {
    width: 40,
    height: 40,
    top: 25,
    left: 25,
    position: "absolute",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& img": {
      display: "block",
    },
    animation: `${socialHide} 1s infinite ease-in-out`,
  },
}));

const Contact = ({ bgFill, bsFill, bgCircle, image }: Props) => {
  return (
    <Socail>
      <Box
        className="phone-vr-circle-fill"
        bgcolor={bgFill}
        boxShadow={bsFill}
      ></Box>
      <Box className="phone-vr-img-circle" bgcolor={bgCircle}>
        <Image src={image} alt={"contact"} width={24} height={24} />
      </Box>
    </Socail>
  );
};

export default Contact;
