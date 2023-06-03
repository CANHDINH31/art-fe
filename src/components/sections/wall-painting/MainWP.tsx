import { Box, Grid, Pagination, Typography } from "@mui/material";
import CardItem from "@/src/components/sections/common/CardItem";
import Title from "@/src/components/sections/common/Title";
import { listHomeProduct } from "@/src/components/sections/home/data";
import { useRouter } from "next/router";

const MainWP = () => {
  const router = useRouter();
  return (
    <Box>
      <Typography
        color={"primary.main"}
        variant="h2"
        fontWeight={"bold"}
        letterSpacing={0.8}
        textAlign={"center"}
      >
        Tranh Vẽ Tường Họa Sĩ Sáng Tác, Độc Bản, Đẹp và Ấn Tượng
      </Typography>
      <Typography mt={4} color="primary.main" variant="h4" letterSpacing={0.6}>
        Tranh vẽ tường đã trở thành một xu hướng nghệ thuật độc đáo và tinh tế
        trên website. Với sự sáng tạo và kỹ thuật tuyệt vời, các nghệ sĩ đã tạo
        ra những tác phẩm đầy màu sắc và ấn tượng để trang trí các không gian
        trên màn hình. Tranh vẽ tường trên website không chỉ là một phương tiện
        trang trí mà còn mang ý nghĩa và cảm xúc sâu sắc. Những hình ảnh tuyệt
        đẹp và tinh tế được chuyển tải thông qua những nét vẽ tinh tế và sự
        tương phản màu sắc độc đáo. Những tranh vẽ tường trên website không chỉ
        tạo điểm nhấn cho giao diện, mà còn mang lại một không gian sống động và
        hấp dẫn cho người truy cập. Bằng cách kết hợp sự sáng tạo và công nghệ,
        tranh vẽ tường trên website đã trở thành một phần không thể thiếu trong
        việc tạo nên trải nghiệm đẹp mắt và độc đáo trên màn hình của chúng ta.
      </Typography>
      <Box mt={12}>
        <Title title="Danh Mục Tranh Vẽ Tường Nổi Bật" />
      </Box>
      <Box mt={12}>
        <Grid container spacing={4}>
          {listHomeProduct.map((homeProduct, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              key={index}
              onClick={() => router.push(`/detail-painting/${index}`)}
            >
              <CardItem url={homeProduct.src} title={homeProduct.title} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mt={8} display={"flex"} justifyContent={"center"}>
        <Pagination count={10} color="primary" />
      </Box>
    </Box>
  );
};

export default MainWP;
