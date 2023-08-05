import {
  BuildingStorefrontIcon,
  CreditCardIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { Box, Stack, Typography } from "@mui/material";

const ContactOrder = () => {
  return (
    <Box sx={{ cursor: "pointer" }}>
      <Typography variant="h4" fontWeight={600}>
        ĐẶT HÀNG VÀ THANH TOÁN
      </Typography>
      <Stack mt={4} gap={4}>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <BuildingStorefrontIcon width={18} color="#446084" />
          <Typography variant="h5">
            Đặt hàng trực tiếp thông qua website
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <PhoneIcon width={18} color="#446084" />
          <Typography variant="h5">
            Đặt hàng qua điện thoại (zalo): 0975.146.588
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <CreditCardIcon width={18} color="#446084" />
          <Typography variant="h5">
            Thanh toán tiền mặt trực tiếp hoặc chuyển khoản
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default ContactOrder;
