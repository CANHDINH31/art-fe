import AddModal from "@/src/components/common/AddModal";
import { addToCategory } from "@/src/lib/api";
import { typeCategory } from "@/src/lib/types";
import { Autocomplete, Chip, TextField } from "@mui/material";
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
  const [categoryValue, setCategoryValue] = useState<string[]>([]);
  const { mutate, isLoading } = useMutation({
    mutationFn: async () =>
      addToCategory({
        list_category_id: categoryValue,
        list_paint_id: listIdSelected,
      }),
    onSuccess: res => {
      toast.success("Thêm thành công");
      handleClose();
    },
    onError: error => {
      toast.error("Thêm thất bại");
    },
  });

  const handleChangeAutocomplete = (listCategory: typeCategory[]) => {
    const listIdCategoryId = listCategory?.map(el => el._id);
    setCategoryValue(listIdCategoryId);
  };

  if (isLoading) return <Loading />;

  return (
    <AddModal
      title="THÊM TRANH VÀO DANH MỤC"
      open={open}
      handleClose={handleClose}
      handleOk={handleSubmit(() => mutate())}
    >
      <Autocomplete
        multiple
        limitTags={3}
        options={listCategory}
        getOptionLabel={option => option.title}
        onChange={(_, value) => handleChangeAutocomplete(value)}
        renderInput={params => (
          <TextField
            {...params}
            label="Chọn danh mục"
            size="small"
            variant="standard"
          />
        )}
        renderTags={(value, getTagProps) => {
          return value.map((option: typeCategory, index) => (
            <Chip
              label={option.title}
              {...getTagProps({ index })}
              key={option._id}
              size="small"
              color={"primary"}
            />
          ));
        }}
      />
    </AddModal>
  );
};

export default AddPaintToCategory;
