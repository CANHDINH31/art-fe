import { typePaint } from "@/src/lib/types";
import { Box, Stack, Typography } from "@mui/material";
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
            <Box
              sx={{ cursor: "pointer" }}
              display={"flex"}
              gap={2}
              key={paint?._id}
            >
              <Box flex={1}>
                <Box
                  component="img"
                  src={paint?.url}
                  width={168}
                  height={100}
                  borderRadius={2}
                  sx={{ objectFit: "cover", objectPosition: "center" }}
                />
              </Box>

              <Stack justifyContent={"space-around"}>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  sx={{
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
                <Typography variant="h5"></Typography>
                <Typography variant="h5">
                  {moment(paint.createdAt).format("DD-MM-YYYY")} -{" "}
                  {moment(paint.createdAt).fromNow()}
                </Typography>
              </Stack>
            </Box>
          ))}
      </Stack>
    </>
  );
};

export default PaintRelation;
