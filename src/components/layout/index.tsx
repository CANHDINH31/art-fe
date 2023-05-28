import React from "react";
import Footer from "./Footer";
import Head from "next/head";
import Header from "./header";
import ListContact from "./common/ListContact";
import ScrollToTop from "./ScrollToTop";
import { Box } from "@mui/material";

type Props = {
  children: JSX.Element;
  title?: string;
};

const MainLayout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title || "Mỹ thuật Đông Anh"}</title>
        <meta
          name="description"
          content="Website chúng tôi là nơi tuyệt vời để khám phá và tạo ra những tác phẩm tranh tường độc đáo và sáng tạo. Chúng tôi tin rằng tranh tường có thể biến những không gian trở nên sống động, thú vị và tạo nên sự ấn tượng mạnh mẽ."
        />
        <meta
          property="og:title"
          content="Vẽ Tranh Tường Độc Đáo và Sáng Tạo"
        />
        <meta
          property="og:description"
          content="Website chúng tôi là nơi tuyệt vời để khám phá và tạo ra những tác phẩm tranh tường độc đáo và sáng tạo. Chúng tôi tin rằng tranh tường có thể biến những không gian trở nên sống động, thú vị và tạo nên sự ấn tượng mạnh mẽ."
        />
        <meta property="og:image" content="/img/png/logo.png" />
        <meta property="og:url" content="https://tranhtuongmienbac.com/" />
        <meta
          name="keywords"
          content="Vẽ tranh tường,Tranh tường độc đáo,Thiết kế tranh tường,Tác phẩm tranh tường,Họa sĩ tranh tường,Tranh tường nghệ thuật,Tường trang trí,Trang trí nội thất,Mural art,Công ty vẽ tranh tường,Tranh tường tùy chỉnh,Tranh tường phong cảnh,Tranh tường trẻ emTranh tường văn phòng,Tranh tường nhà hàng,Tranh tường quán cà phê,Tranh tường cửa hàng,Tranh tường không gian công cộng,Tranh tường sân chơi,Tranh tường 3D"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta content="search engine optimization" name="RATING" />
        <meta
          content="www.altaVista.com, www.aol.com, www.infoseek.com, www.excite.com, www.hotbot.com, 
		 		www.lycos.com, www.magellan.com, www.looksmart.com, www.cnet.com, www.voila.com, 
		 		www.google.fr, www.google.com, www.google.com.vn, www.yahoo.fr, www.yahoo.com, 
		 		www.alltheweb.com, www.msn.com, www.netscape.com, www.nomade.com"
          name="Search Engines"
        />
        <meta
          property="og:site_name"
          content="Địa chỉ tranh tường chất lượng uy tín - Tranh tường miến Bắc"
        ></meta>
        <link rel="icon" href="/img/png/logo.png" />
      </Head>
      <Header />
      <Box width={"100vw"} overflow={"hidden"}>
        {children}
        <ListContact />
        <ScrollToTop />
        <Footer />
      </Box>
    </>
  );
};

export default MainLayout;
