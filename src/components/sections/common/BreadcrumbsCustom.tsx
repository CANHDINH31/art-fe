import { Link, Typography, Breadcrumbs } from "@mui/material";
import React from "react";

type Props = {};

const BreadcrumbsCustom = (props: Props) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/">
        <Typography color="primary.main" fontWeight={500} variant="h3">
          TRANG CHỦ
        </Typography>
      </Link>
      <Typography color="primary.main" fontWeight={"bold"} variant="h4">
        Tranh vẽ tường
      </Typography>
    </Breadcrumbs>
  );
};

export default BreadcrumbsCustom;
