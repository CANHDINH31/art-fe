import { Box, Container, Input } from "@mui/material";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Logo from "../../../../public/img/png/logo.png";
import ListSocial from "../common/ListSocial";

const SearchHeader = () => (
  <Box py={2} bgcolor={"white"}>
    <Container>
      <Box
        display={"flex"}
        alignItems={"flex-end"}
        justifyContent={"space-between"}
      >
        <Box display={"flex"} alignItems={"flex-end"}>
          <Image src={Logo} alt="logo" width={60} height={60} priority={true} />
          <Box display={"flex"}>
            <Input placeholder="Tìm kiếm ..." size="small" />
            <Box
              bgcolor={"primary.main"}
              display={"flex"}
              alignItems={"center"}
              padding={2}
            >
              <MagnifyingGlassIcon width={18} color="white" />
            </Box>
          </Box>
        </Box>
        <ListSocial />
      </Box>
    </Container>
  </Box>
);

export default SearchHeader;
