import AdminLayout from "@/src/components/layout/admin";
import PostContent from "@/src/components/sections/admin/comments/PostContent";
import { Box } from "@mui/material";
import React, { ReactElement } from "react";

const DetailComment = () => {
  return (
    <Box display={"flex"} gap={4} height={"100%"}>
      <Box flex={1}>
        <PostContent />
      </Box>
      <Box flex={1}>TEST</Box>
    </Box>
  );
};

export default DetailComment;

DetailComment.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout title="Quản trị viên" page="Chi tiết comment">
      {page}
    </AdminLayout>
  );
};
