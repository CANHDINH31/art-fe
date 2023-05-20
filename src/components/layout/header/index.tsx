import React, { useEffect, useState } from "react";
import TopHeader from "./TopHeader";
import SearchHeader from "./SearchHeader";
import MainMenu from "./MainMenu";
import { Box, keyframes, styled } from "@mui/material";
import ResponsiveHeader from "./ResponsiveHeader";

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(-100%);
    transform: translateY(0);
  }
`;

const AnimationHeader = styled(Box)(({ theme }) => ({
  "&.sticky": {
    position: "sticky",
    top: 0,
    animation: `${slideDown} 1s ease-out`,
    zIndex: 100,
    opacity: 0.95,
  },
}));

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 280) {
        setIsSticky(true);
      } else if (offset === 0) {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <TopHeader />
      <AnimationHeader className={isSticky ? "sticky" : ""}>
        <SearchHeader />
        <MainMenu />
        <ResponsiveHeader />
      </AnimationHeader>
    </>
  );
};

export default Header;
