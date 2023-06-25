import { Link, Typography, Breadcrumbs } from "@mui/material";
import React from "react";

type Props = {
  breadcrumb: string[];
};

const BreadcrumbsCustom = ({ breadcrumb }: Props) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/">
        <Typography fontWeight={500} variant="h3">
          TRANG CHỦ
        </Typography>
      </Link>
      {breadcrumb?.map((title, index) => (
        <Typography key={index} fontWeight={"bold"} variant="h4">
          {title}
        </Typography>
      ))}
    </Breadcrumbs>
  );
};

export default BreadcrumbsCustom;
