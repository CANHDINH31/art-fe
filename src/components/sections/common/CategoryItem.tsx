import { typeCategory } from "@/src/lib/types";
import { Box, Typography, styled } from "@mui/material";
import React from "react";

type Props = {
  category: typeCategory;
};

const CategoryContainer = styled(Box)(({ theme }) => ({
  boxShadow: "0 1px 3px -2px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)",
  img: {
    display: "block",
    width: "100%",
    height: 250,
    objectFit: "cover",
    objectPosition: "center",
  },
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 14px 28px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.1)",
  },
  transition:
    "transform .3s,box-shadow .3s,background-color .3s,color .3s,opacity .3s,-webkit-transform .3s,-webkit-box-shadow .3s",
}));

const CategoryItem = ({ category }: Props) => {
  return (
    <CategoryContainer>
      <Box component={"img"} src={category.url} />
      <Box textAlign={"center"} py={4}>
        <Typography fontWeight={"bold"}>
          {category.title.toUpperCase()}
        </Typography>
        <Typography variant="h6" mt={1}>
          {category.list_paint_id?.length} TÁC PHẨM
        </Typography>
      </Box>
    </CategoryContainer>
  );
};

export default CategoryItem;
