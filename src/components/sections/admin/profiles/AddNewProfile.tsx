import AddModal from "@/src/components/common/AddModal";
import { Grid, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loading from "../../common/Loading";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import { CreateProfileType, createProfile } from "@/src/lib/api";

type Props = {
  open: boolean;
  handleClose: () => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
};

const AddNewProfile = ({ open, handleClose, refetch }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState<boolean>(false);

  const handleCloseModal = () => {
    handleClose();
    reset();
  };

  const handleCreateProfile = async (data: FieldValues) => {
    try {
      setLoading(true);
      const res = await createProfile(data as CreateProfileType);
      toast.success(res?.data?.message);
      refetch();
    } catch (error) {
      toast.error("Thêm mới profile thất bại");
      throw error;
    }
    handleCloseModal();
    setLoading(false);
  };

  return (
    <AddModal
      title="THÊM PROFILE"
      open={open}
      handleClose={handleCloseModal}
      handleOk={handleSubmit((data) => handleCreateProfile(data))}
    >
      <Stack>
        {loading ? (
          <Loading minHeight="100%" />
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField
                error={errors?.appKey ? true : false}
                {...register("appKey", {
                  required: "Trường này không được để trống",
                })}
                helperText={errors?.appKey?.message?.toString()}
                label="App key"
                variant="standard"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={errors?.appSecret ? true : false}
                {...register("appSecret", {
                  required: "Trường này không được để trống",
                })}
                helperText={errors?.appSecret?.message?.toString()}
                label="App secret"
                variant="standard"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={errors?.accessToken ? true : false}
                {...register("accessToken", {
                  required: "Trường này không được để trống",
                })}
                helperText={errors?.accessToken?.message?.toString()}
                label="Access token"
                variant="standard"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={errors?.accessSecret ? true : false}
                {...register("accessSecret", {
                  required: "Trường này không được để trống",
                })}
                helperText={errors?.accessSecret?.message?.toString()}
                label="Access secret"
                variant="standard"
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
        )}
      </Stack>
    </AddModal>
  );
};

export default AddNewProfile;
