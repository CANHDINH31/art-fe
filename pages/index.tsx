import MainLayout from "@/src/components/layout/user";
import { Box } from "@mui/material";
import { ReactElement, useEffect } from "react";
import HomeAdvise from "@/src/components/sections/home/HomeAdvise";
import HomeSpace from "@/src/components/sections/home/HomeSpace";
import HomeBanner from "@/src/components/sections/home/HomeBanner";
import HomeProject from "@/src/components/sections/home/HomeProject";
import HomeIntroduce from "@/src/components/sections/home/home-introduce";
import HomeNews from "@/src/components/sections/home/HomeNews";
import HomeProduct from "@/src/components/sections/home/HomeProduct";
import HomeCustomer from "@/src/components/sections/home/HomeCustomer";
import HomeContact from "@/src/components/sections/home/HomeContact";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const { visit } = router.query;
    if (visit) {
      localStorage.setItem("visit", visit as string);
    }
  }, [router]);

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
      <HomeContact />
    </Box>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="Trang chủ">{page}</MainLayout>;
};
