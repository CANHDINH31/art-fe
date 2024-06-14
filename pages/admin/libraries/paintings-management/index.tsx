import ConfirmDeleteModal from "@/src/components/common/ConfirmDeleteModal";
import DataGridCustom from "@/src/components/common/DataGridCustom";
import AdminLayout from "@/src/components/layout/admin";
import Tab from "@/src/components/sections/admin/libraries/Tab";
import AddNewPainting from "@/src/components/sections/admin/libraries/painting-management/AddNewPainting";
import SettingPM from "@/src/components/sections/admin/libraries/painting-management/SettingPM";
import { getListCategory, getListPaint } from "@/src/lib/api";
import { typePaint } from "@/src/lib/types/paint";
import { Box, Button, Pagination } from "@mui/material";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, ReactElement, useState } from "react";
import { detelePaint } from "@/src/lib/api";
import AddPaintToCategory from "@/src/components/sections/admin/libraries/painting-management/AddPaintToCategory";
import Loading from "@/src/components/sections/common/Loading";
import { toast } from "react-toastify";
import moment from "moment";

const PaintingsManagement = () => {
  const [listIdSelected, setListIdSelected] = useState<GridRowSelectionModel>(
    []
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const [isOpenDeletePaint, setIsOpenDeletePaint] = useState<boolean>(false);
  const [isOpenAddPaintToCategory, setIsOpenAddPaintToCategory] =
    useState<boolean>(false);
  const [isOpenAddNewPaint, setIsOpenAddNewPaint] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>();
  const [title, setTitle] = useState<string>("");

  const columns: GridColDef[] = [
    {
      field: "url",
      headerName: "Ảnh đại diện",
      sortable: false,
      filterable: false,
      width: 150,
      renderCell(params) {
        return (
          <Box
            component={"img"}
            src={params.row.url}
            sx={{
              width: 120,
              height: 120,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        );
      },
    },
    { field: "title", headerName: "Tên", width: 150 },
    { field: "price", headerName: "Giá", width: 100 },
    { field: "views", headerName: "Số lượt xem", width: 100 },
    { field: "stock", headerName: "Kho", width: 100 },
    { field: "total_score", headerName: "Tổng điểm", width: 100 },
    { field: "account_users_rate", headerName: "Lượt đánh giá", width: 120 },
    {
      field: "created_at",
      headerName: "Ngày tạo",
      width: 180,
      renderCell(param) {
        return (
          <Box>{moment(param.row.createdAt).format("DD-MM-YYYY HH:mm:ss")}</Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Hành động",
      sortable: false,
      filterable: false,
      width: 200,
      renderCell(param) {
        return (
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Button
              target="_blank"
              href={`/admin/libraries/paintings-management/${param.row.id}`}
              variant="outlined"
            >
              Chi tiết
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setIsOpenDeletePaint(true);
                setListIdSelected([param.row._id]);
              }}
            >
              Xóa
            </Button>
          </Box>
        );
      },
    },
  ];

  const {
    data: listPaint,
    isLoading: loadingPaint,
    refetch,
  } = useQuery(
    ["listPaint", currentPage, title],
    async () => {
      try {
        const res = await getListPaint({ page: currentPage.toString(), title });
        setTotalPage(Math.ceil(res.data.totalItems / res.data.itemsPerPage));
        return res.data.data?.map((paint: typePaint) => ({
          ...paint,
          id: paint._id,
        }));
      } catch (err: any) {
        toast.error(err?.message || "Có lỗi xảy ra");
        throw err;
      }
    },
    { keepPreviousData: true }
  );

  const { data: listCategory, isLoading: loadingCategory } = useQuery(
    ["listCategory"],
    async () => {
      try {
        const res = await getListCategory();
        return res.data.data;
      } catch (err: any) {
        toast.error(err?.message || "Có lỗi xảy ra");
        throw err;
      }
    },
    { keepPreviousData: true }
  );

  const { mutate: deletePaint, isLoading: loadingDelete } = useMutation({
    mutationFn: async () => {
      try {
        await detelePaint(listIdSelected as string[]);
      } catch (error) {
        toast.error("Xóa thất bại");
      }
    },
    onSuccess: (res) => {
      toast.success("Xóa thành công");
      setIsOpenDeletePaint(false);
      refetch();
    },
  });

  if (loadingPaint || loadingCategory || loadingDelete) return <Loading />;

  return (
    <Box>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Tab />
      </Box>
      <SettingPM
        listCategory={listCategory}
        listIdSelected={listIdSelected}
        handleOpenDelete={() => setIsOpenDeletePaint(true)}
        handleOpenAdd={() => setIsOpenAddPaintToCategory(true)}
        handleOpenAddPaint={() => setIsOpenAddNewPaint(true)}
        title={title}
        setTitle={setTitle}
      />
      <Box mt={4}>
        {listPaint?.length > 0 ? (
          <DataGridCustom
            checkboxSelection
            disableRowSelectionOnClick
            rows={listPaint}
            columns={columns}
            hideFooter={true}
            rowHeight={150}
            onRowSelectionModelChange={(idSelected) => {
              setListIdSelected(idSelected);
            }}
            rowSelectionModel={listIdSelected}
          />
        ) : (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            mt={10}
          >
            <Box src={"/img/png/NoData.png"} component={"img"} />
          </Box>
        )}
      </Box>
      {Number(totalPage) > 1 && (
        <Box mt={8} display={"flex"} justifyContent={"center"}>
          <Pagination
            count={totalPage}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      )}

      <ConfirmDeleteModal
        handleOk={deletePaint}
        handleClose={() => setIsOpenDeletePaint(false)}
        open={isOpenDeletePaint}
        content="Bạn có chắc chắn xóa những bức tranh này ? Nếu xóa bạn sẽ không khôi phục được !!!"
      />
      <AddPaintToCategory
        open={isOpenAddPaintToCategory}
        handleClose={() => {
          setIsOpenAddPaintToCategory(false);
          setListIdSelected([]);
        }}
        listCategory={listCategory}
        listIdSelected={listIdSelected as string[]}
      />
      <AddNewPainting
        open={isOpenAddNewPaint}
        handleClose={() => setIsOpenAddNewPaint(false)}
      />
    </Box>
  );
};

export default PaintingsManagement;

PaintingsManagement.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout title="Quản trị viên" page="Quản lý thư viện">
      {page}
    </AdminLayout>
  );
};
