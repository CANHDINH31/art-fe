import DataGridCustom from "@/src/components/common/DataGridCustom";
import AdminLayout from "@/src/components/layout/admin";
import Tab from "@/src/components/sections/admin/libraries/Tab";
import { GlobeAltIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Box } from "@mui/material";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React, { ReactElement } from "react";

const rows: GridRowsProp = [
  {
    id: 1,
    type: "Tranh Vẽ Tường ",
    image:
      "https://i.pinimg.com/736x/7c/b5/49/7cb5492889809cb8303b76b80759f0df.jpg",
    description:
      " Tranh vẽ tường đã trở thành một xu hướng nghệ thuật độc đáo và tinh tế trên website. Với sự sáng tạo và kỹ thuật tuyệt vời, các nghệ sĩ đã tạo ra những tác phẩm đầy màu sắc và ấn tượng để trang trí các không gian trên màn hình. Tranh vẽ tường trên website không chỉ là một phương tiện trang trí mà còn mang ý nghĩa và cảm xúc sâu sắc. Những hình ảnh tuyệt đẹp và tinh tế được chuyển tải thông qua những nét vẽ tinh tế và sự tương phản màu sắc độc đáo. Những tranh vẽ tường trên website không chỉ tạo điểm nhấn cho giao diện, mà còn mang lại một không gian sống động và hấp dẫn cho người truy cập. Bằng cách kết hợp sự sáng tạo và công nghệ, tranh vẽ tường trên website đã trở thành một phần không thể thiếu trong việc tạo nên trải nghiệm đẹp mắt và độc đáo trên màn hình của chúng ta.",
    view: 50,
    count: 25,
  },
  {
    id: 2,
    type: "Tranh Vẽ Tường ",
    image:
      "https://i.pinimg.com/736x/7c/b5/49/7cb5492889809cb8303b76b80759f0df.jpg",
    description:
      " Tranh vẽ tường đã trở thành một xu hướng nghệ thuật độc đáo và tinh tế trên website. Với sự sáng tạo và kỹ thuật tuyệt vời, các nghệ sĩ đã tạo ra những tác phẩm đầy màu sắc và ấn tượng để trang trí các không gian trên màn hình. Tranh vẽ tường trên website không chỉ là một phương tiện trang trí mà còn mang ý nghĩa và cảm xúc sâu sắc. Những hình ảnh tuyệt đẹp và tinh tế được chuyển tải thông qua những nét vẽ tinh tế và sự tương phản màu sắc độc đáo. Những tranh vẽ tường trên website không chỉ tạo điểm nhấn cho giao diện, mà còn mang lại một không gian sống động và hấp dẫn cho người truy cập. Bằng cách kết hợp sự sáng tạo và công nghệ, tranh vẽ tường trên website đã trở thành một phần không thể thiếu trong việc tạo nên trải nghiệm đẹp mắt và độc đáo trên màn hình của chúng ta.",
    view: 60,
    count: 35,
  },
  {
    id: 3,
    type: "Tranh Vẽ Tường ",
    image:
      "https://i.pinimg.com/736x/7c/b5/49/7cb5492889809cb8303b76b80759f0df.jpg",
    description:
      " Tranh vẽ tường đã trở thành một xu hướng nghệ thuật độc đáo và tinh tế trên website. Với sự sáng tạo và kỹ thuật tuyệt vời, các nghệ sĩ đã tạo ra những tác phẩm đầy màu sắc và ấn tượng để trang trí các không gian trên màn hình. Tranh vẽ tường trên website không chỉ là một phương tiện trang trí mà còn mang ý nghĩa và cảm xúc sâu sắc. Những hình ảnh tuyệt đẹp và tinh tế được chuyển tải thông qua những nét vẽ tinh tế và sự tương phản màu sắc độc đáo. Những tranh vẽ tường trên website không chỉ tạo điểm nhấn cho giao diện, mà còn mang lại một không gian sống động và hấp dẫn cho người truy cập. Bằng cách kết hợp sự sáng tạo và công nghệ, tranh vẽ tường trên website đã trở thành một phần không thể thiếu trong việc tạo nên trải nghiệm đẹp mắt và độc đáo trên màn hình của chúng ta.",
    view: 20,
    count: 45,
  },
];

const columns: GridColDef[] = [
  {
    field: "image",
    headerName: "Ảnh đại diện",
    sortable: false,
    filterable: false,
    width: 150,
    renderCell(params) {
      return (
        <Box
          component={"img"}
          src={params.row.image}
          sx={{ width: 120, height: 120, objectFit: "cover", borderRadius: 2 }}
        />
      );
    },
  },
  { field: "type", headerName: "Loại", width: 150 },
  {
    field: "description",
    headerName: "Mô tả",
    width: 400,
  },
  { field: "view", headerName: "Số lượt xem", width: 150 },
  { field: "count", headerName: "Số tác phẩm", width: 150 },
  {
    field: "action",
    headerName: "Hành động",
    sortable: false,
    filterable: false,
    width: 100,
    renderCell() {
      return (
        <Box display={"flex"} gap={4}>
          <PencilSquareIcon width={30} color="#1976d2" />
          <GlobeAltIcon width={30} color="#2e7d32" />
        </Box>
      );
    },
  },
];

const CategoriesManagement = () => {
  return (
    <Box overflow={"scroll"}>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Tab />
      </Box>
      <Box mt={8}>
        <DataGridCustom
          rows={rows}
          columns={columns}
          hideFooter={true}
          rowHeight={150}
        />
      </Box>
    </Box>
  );
};

export default CategoriesManagement;

CategoriesManagement.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout title="Quản trị viên" page="Quản lý thư viện">
      {page}
    </AdminLayout>
  );
};
