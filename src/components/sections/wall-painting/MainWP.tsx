import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Title from "../common/Title";
import CategoryItem from "../common/CategoryItem";
import { useQuery } from "@tanstack/react-query";
import { getListCategory } from "@/src/lib/api";
import { typeCategory } from "@/src/lib/types";
import { useRouter } from "next/router";
import Loading from "../common/Loading";
import { toast } from "react-toastify";

const MainWP = () => {
  const router = useRouter();
  const { data: listCategories, isLoading } = useQuery(
    ["listCategories"],
    async () => {
      try {
        const res = await getListCategory();
        const listCategories = res.data.data?.map((category: typeCategory) => ({
          ...category,
          id: category._id,
        }));
        return listCategories;
      } catch (err: any) {
        toast.error(err?.message || "Có lỗi xảy ra");
        throw err;
      }
    },
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) return <Loading />;
  return (
    <Box>
      <Typography variant="h2" fontWeight={600} textAlign={"center"}>
        Tranh Vẽ Tường Họa Sĩ Sáng Tác, Độc Bản, Đẹp Và Ấn Tượng
      </Typography>
      <Typography mt={4} variant="h4">
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
          {listCategories?.map((category: typeCategory) => (
            <Grid
              xs={12}
              sm={6}
              md={6}
              lg={4}
              item
              key={category._id}
              onClick={() => router.push(`/wall-painting/${category._id}`)}
            >
              <CategoryItem category={category} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MainWP;
