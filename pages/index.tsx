import MainLayout from "@/src/components/layout";
import { Box } from "@mui/material";
import { ReactElement } from "react";
import HomeAdvise from "@/src/components/sections/home/HomeAdvise";
import HomeSpace from "@/src/components/sections/home/HomeSpace";
import HomeBanner from "@/src/components/sections/home/HomeBanner";
import HomeProject from "@/src/components/sections/home/HomeProject";
import HomeIntroduce from "@/src/components/sections/home/home-introduce";
import HomeNews from "@/src/components/sections/home/HomeNews";
import HomeProduct from "@/src/components/sections/home/HomeProduct";
import HomeCustomer from "@/src/components/sections/home/HomeCustomer";

export default function Home() {
  return (
    <Box pb={16}>
      <HomeBanner />
      <Box mt={16} /> {/* margin-top:80px || spacing component */}
      <HomeSpace />
      <Box mt={16} /> {/* margin-top:80px || spacing component */}
      <HomeAdvise />
      <Box mt={16} /> {/* margin-top:80px || spacing component */}
      <HomeProject />
      <Box mt={16} /> {/* margin-top:80px || spacing component */}
      <HomeIntroduce />
      <Box mt={16} /> {/* margin-top:80px || spacing component */}
      <HomeProduct />
      <Box mt={16} /> {/* margin-top:80px || spacing component */}
      <HomeNews />
      <Box mt={16} /> {/* margin-top:80px || spacing component */}
      <HomeCustomer />
    </Box>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="Trang chủ">{page}</MainLayout>;
};
