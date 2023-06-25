import AddModal from "@/src/components/common/AddModal";
import { addToCategory } from "@/src/lib/api";
import { typeCategory } from "@/src/lib/types";
import { MenuItem, Select } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Loading from "../../../common/Loading";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

type Props = {
  open: boolean;
  handleClose: () => void;
  listCategory: typeCategory[];
  listIdSelected: string[];
};

const AddPaintToCategory = ({
  open,
  handleClose,
  listCategory,
  listIdSelected,
}: Props) => {
  const { handleSubmit } = useForm();
  const [categoryValue, setCategoryValue] = useState<string>("");
  const { mutate, isLoading } = useMutation({
    mutationFn: addToCategory,
    onSuccess: res => {
      toast.success("Thêm thành công");
      handleClose();
    },
    onError: error => {
      toast.error("Thêm thất bại");
    },
  });

  useEffect(() => {
    listCategory?.length > 0 && setCategoryValue(listCategory[0]._id);
  }, [listCategory]);

  if (isLoading) return <Loading />;

  return (
    <AddModal
      title="Thêm tranh vào danh mục"
      open={open}
      handleClose={handleClose}
      handleOk={handleSubmit(data =>
        mutate({ _id: categoryValue, list_paint_id: listIdSelected })
      )}
    >
      <Select
        size="medium"
        fullWidth
        value={categoryValue}
        onChange={e => setCategoryValue(e.target.value)}
      >
        {listCategory?.map((category: typeCategory) => (
          <MenuItem value={category._id} key={category._id}>
            {category.title}
          </MenuItem>
        ))}
      </Select>
    </AddModal>
  );
};

export default AddPaintToCategory;
