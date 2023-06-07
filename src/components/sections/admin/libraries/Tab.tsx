import { Box, Button, styled } from "@mui/material";
import React from "react";
import { listLibrariesTab } from "./data";
import { useRouter } from "next/router";

const ButtonWrap = styled(Box)(({ theme }) => ({
  display: "flex",
  background: "#F0F0F0",
  width: "max-content",
  padding: theme.spacing(1),
  gap: theme.spacing(2),
  border: "1px solid #F0F0F0",
  borderRadius: theme.spacing(1),
  button: {
    width: 160,
    "&.active": {
      background: "white",
      boxShadow:
        "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
      borderRadius: theme.spacing(1),
      width: 160,
    },
  },
}));

const Tab = () => {
  const router = useRouter();
  return (
    <ButtonWrap>
      {listLibrariesTab.map((tab, index) => (
        <Button
          key={index}
          onClick={() => router.push(tab.path)}
          className={tab.path === router.pathname ? "active" : ""}
        >
          {tab.name}
        </Button>
      ))}
    </ButtonWrap>
  );
};

export default Tab;
