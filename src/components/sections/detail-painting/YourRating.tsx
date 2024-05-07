import { Box, Button, Rating, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { labelRating } from "./data";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "@tanstack/react-query";
import { findOneRateById, handleRate } from "@/src/lib/api/rate";
import { toast } from "react-toastify";
import moment from "moment";

type Props = {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  paintId: string;
  isAuth: boolean;
};

const YourRating = ({ paintId, isAuth, refetch }: Props) => {
  const [error, setError] = React.useState<boolean>(false);
  const [timeRate, setTimeRate] = React.useState<string>("");
  const [value, setValue] = React.useState<number>(4);
  const [hover, setHover] = React.useState(-1);

  const getLabelText = (value: number) => {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labelRating[value]}`;
  };

  const { mutate } = useMutation({
    mutationFn: handleRate,
    onSuccess: (res) => {
      refetch();
      setTimeRate(moment(res?.data?.updatedAt).format("hh:mm:ss DD-MM-YYYY"));
      toast.success("Bạn đã đánh giá thành công");
    },
  });

  const handleRating = async () => {
    try {
      if (isAuth) {
        setError(false);
        mutate({
          paint_id: paintId,
          value,
          visit: localStorage?.getItem("visit") as string,
        });
      } else {
        setError(true);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const getCurrentRate = async () => {
      const res = await findOneRateById(paintId);
      res.data.value && setValue(Number(res.data.value));
      res?.data?.updatedAt &&
        setTimeRate(moment(res?.data?.updatedAt).format("hh:mm:ss DD-MM-YYYY"));
    };
    isAuth && paintId && getCurrentRate();
  }, [paintId, isAuth]);

  return (
    <Box width={"100%"}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        gap={4}
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", md: "row" }}
          gap={2}
          alignItems={{ md: "flex-end", xs: "flex-start" }}
        >
          <Box display={"flex"} alignItems={"flex-end"} gap={1}>
            <Typography
              fontWeight={500}
              variant="h4"
              lineHeight={"16px"}
              whiteSpace={"nowrap"}
            >
              Cảm nhận của bạn:
            </Typography>
            <Rating
              size="medium"
              precision={1}
              value={value}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue as number);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />
            {value > 0 && (
              <Box display={"flex"} gap={1} alignItems={"flex-end"}>
                <Typography variant="h6" whiteSpace={"nowrap"}>
                  ({labelRating[hover !== -1 ? hover : value]})
                </Typography>
              </Box>
            )}
          </Box>

          {timeRate && (
            <Box>
              <Typography variant="h6" whiteSpace={"nowrap"}>
                Thời gian đánh giá: {timeRate}
              </Typography>
            </Box>
          )}
        </Box>

        <Button
          variant="outlined"
          size="medium"
          onClick={handleRating}
          fullWidth
          sx={{ maxWidth: { lg: 300 } }}
        >
          Đánh giá
        </Button>
      </Box>

      {error && (
        <Typography color={"red"} mt={4} variant="h6">
          Bạn phải đăng nhập để đánh giá sản phẩm này
        </Typography>
      )}
    </Box>
  );
};

export default YourRating;
