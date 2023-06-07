import MainLayout from "@/src/components/layout/user";
import { Box, Container, Typography } from "@mui/material";
import React, { ReactElement } from "react";

const Introduce = () => {
  return (
    <Box py={8}>
      <Container>
        <Typography variant="h1" fontWeight={600}>
          Về Tranh Tường Miền Bắc – Tranh Phong Cảnh & Tranh Nghệ Thuật
        </Typography>
        <Typography mt={8}>
          Kính chào quý khách, lời đầu tiên chúng tôi xin chân thành cảm ơn quý
          khách đã tín nhiệm và ủng chúng tôi trong suốt thời gian chúng tôi xây
          dựng và phát triển cửa hàng. Trong những năm gần đây nhu cầu sử dụng
          tranh để trang trí cho các phòng trong gia đình, nhà hàng, khách sạn,
          thậm chí là những bức tranh tường ở các nơi khu dân cư ngày càng tăng
          và được ưa chuộng. Đó là một nhu cầu làm đẹp tất yếu cho cuộc sống và
          đáp ứng lại nhu cầu này, chúng tôi đã đã luôn luôn cải tiến dịch vụ để
          phục vụ quý khách tốt nhất. Chính vì lẽ đó, chúng tôi cùng các họa sĩ
          tài năng trên khắp Việt Nam đã cho ra đời những tác phẩm tranh đẹp,
          những khung tranh ấn tượng nhất để phục vụ mọi người trên toàn quốc.
        </Typography>
        <Typography mt={4}>
          Cùng với sự làm việc không biết mệt mỏi của đội ngũ nhân viên Tranh
          tường miền Bắc, những họa sĩ tài hoa, đầy sáng tạo, cùng các chuyên
          gia hội họa dày dạn kinh nghiệm đã cho ra đời nhiều tác phẩm tranh độc
          đáo và ấn tượng. Các bức tranh phong cảnh như một sự quảng bá những
          hình ảnh đẹp nhất từ khắp mọi miền tổ quốc và các phong cảnh đẹp trên
          thế giới đến mọi người và khơi dậy tình yêu cái đẹp của con người Việt
          Nam. Cũng vậy, những tác phẩm tranh tường nghệ thuật,…như càng làm
          tăng thêm vẻ đẹp, tô điểm thêm những sắc màu cuộc sông cho không gian
          của bạn thêm phần lộng lẫy và sang trọng.
        </Typography>
        <Typography mt={8} variant="h3" fontWeight={600}>
          Nhiệm vụ của chúng tôi
        </Typography>
        <Box mt={4}>
          <Typography mt={4}>
            – Chúng tôi luôn luôn cố gắng cải thiện kỹ năng mà chuyên môn để tạo
            ra những tác phẩm đẹp và phục vụ quý khách với chất lượng tốt nhất.
          </Typography>
          <Typography>
            – Những yêu cầu của khách như những thước đo để chúng tôi phấn đấu.
            Những đánh giá của quý khách như những lời khuyên giúp chúng tôi cải
            thiện để ngày một tốt hơn.
          </Typography>
          <Typography>
            – Chúng tôi luôn luôn cố gắng lắng nghe và thấu hiểu mọi yêu cầu của
            quý khách để mang lại sự hài lòng cho quý khách. Đó cũng là kim chỉ
            nam cho chúng tôi để cải thiện dịch vụ ngày một tốt hơn.
          </Typography>
        </Box>
        <Typography mt={8} variant="h3" fontWeight={600}>
          Đội ngũ sáng tác của chúng tôi
        </Typography>
        <Typography mt={4}>
          Chúng tôi luôn luôn xây dựng một đội ngũ các tư vấn viên, kiến trúc
          sư, họa sĩ với sự nhiệt tình cao nhất, chăm chỉ và sáng tạo trong công
          việc, tạo ra những sản phẩm ưng ý nhất và luôn luôn đảm bảo chất lượng
          dịch vụ như yêu cầu.
        </Typography>
        <Typography mt={8} variant="h3" fontWeight={600}>
          Những mục tiêu
        </Typography>
        <Box mt={4}>
          <Typography mt={4}>
            – Luôn luôn phục vụ chăm sóc khách hàng với tinh thần nhiệt tình và
            chu đáo nhất.
          </Typography>
          <Typography>
            – Luôn cải thiện kỹ năng cho đội ngũ nhân viên phù hợp với những yêu
            cầu của xu hướng hiện tại ai ở Việt Nam hay thế giới.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Introduce;

Introduce.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="Giới thiệu">{page}</MainLayout>;
};
