import { typePaint } from "@/src/lib/types";
import { convertCurrency } from "@/src/lib/utils/wall-painting";
import { Box, Link, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";

type Props = {
  listPaint: typePaint[];
};

const PaintRelation = ({ listPaint }: Props) => {
  return (
    <>
      <Box>
        <Typography fontWeight={600} variant="h4">
          TÁC PHẨM LIÊN QUAN
        </Typography>
      </Box>
      <Stack mt={8} gap={8}>
        {listPaint?.length > 0 &&
          listPaint?.map((paint: typePaint) => (
            <Link key={paint?._id} href={`/detail-painting/${paint._id}`}>
              <Box sx={{ cursor: "pointer" }} display={"flex"} gap={2}>
                <Box
                  component="img"
                  src={paint?.url}
                  width={168}
                  height={100}
                  borderRadius={2}
                  sx={{ objectFit: "cover", objectPosition: "center" }}
                />

                <Stack justifyContent={"space-around"}>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    sx={{
                      maxWidth: 170,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {paint?.title}
                  </Typography>
                  <Typography variant="h5">
                    Số lượt xem: {paint?.views}
                  </Typography>
                  <Typography variant="h5">
                    Giá: {convertCurrency(paint?.price as number)}
                  </Typography>
                  <Typography variant="h5">
                    {moment(paint.createdAt).format("DD-MM-YYYY")} -{" "}
                    {moment(paint.createdAt).fromNow()}
                  </Typography>
                </Stack>
              </Box>
            </Link>
          ))}
      </Stack>
    </>
  );
};

export default PaintRelation;
