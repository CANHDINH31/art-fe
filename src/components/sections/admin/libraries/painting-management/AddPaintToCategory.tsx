import AddModal from "@/src/components/common/AddModal";
import { addToCategory } from "@/src/lib/api";
import { queryClient } from "@/src/lib/react-query";
import { typeCategory } from "@/src/lib/types";
import { MenuItem, Select } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

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
  const [categoryValue, setCategoryValue] = useState<string>("");
  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      try {
        await addToCategory({
          _id: categoryValue,
          list_paint_id: listIdSelected,
        });
        handleClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    listCategory?.length > 0 && setCategoryValue(listCategory[0]._id);
  }, [listCategory]);

  return (
    <AddModal
      title="Thêm tranh vào danh mục"
      open={open}
      handleClose={handleClose}
      handleOk={mutate}
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
