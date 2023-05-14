import MainLayout from "@/src/components/layout";
import React, { ReactElement } from "react";

type Props = {};

const Introduce = (props: Props) => {
  return <div>Introduce</div>;
};

export default Introduce;

Introduce.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="Giới thiệu">{page}</MainLayout>;
};
