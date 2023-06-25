import {
  Badge,
  Box,
  Container,
  Divider,
  Typography,
  styled,
} from "@mui/material";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { HeartIcon, UserIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const InputWrap = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#f7f7f7",
  padding: theme.spacing(3, 4),
  border: "1px solid #ddd",
  minWidth: 500,
  borderRadius: theme.spacing(4),
  input: {
    outline: "none",
    border: "none",
    backgroundColor: "#f7f7f7",
    fontSize: 14,
    width: "100%",
    color: theme.palette.primary.main,
  },
  svg: {
    cursor: "pointer",
  },
}));

const SearchHeader = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const navigateSearchPage = () => {
    searchValue && router.push(`/search?query=${searchValue}`);
    setSearchValue("");
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && searchValue) {
      navigateSearchPage();
    }
  };
  return (
    <Box py={2} bgcolor={"white"} sx={{ display: { xs: "none", lg: "flex" } }}>
      <Container>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ cursor: "pointer" }}
        >
          <Box display={"flex"} alignItems={"center"} gap={10}>
            <Box
              onClick={() => router.push("/")}
              component={"img"}
              src={"/img/png/logo.png"}
              height={80}
              sx={{ objectFit: "contain", cursor: "pointer" }}
            />
            <InputWrap>
              <input
                placeholder="Tìm kiếm sản phẩm (nhập đầy đủ dấu) ..."
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={handleSearch}
              />
              <MagnifyingGlassIcon
                width={18}
                color="black"
                onClick={navigateSearchPage}
              />
            </InputWrap>
          </Box>

          <Box display={"flex"} alignItems={"center"} gap={8}>
            <Box display={"flex"} alignItems={"center"} gap={2}>
              <Badge badgeContent={1} color="error">
                <HeartIcon height={30} color="#446084" />
              </Badge>

              <Typography variant="h5" whiteSpace={"nowrap"} fontWeight={550}>
                YÊU THÍCH
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={2}
              onClick={() => router.push("/auth/login")}
            >
              <UserIcon height={30} color="#446084" />
              <Typography variant="h5" whiteSpace={"nowrap"} fontWeight={550}>
                ĐĂNG NHẬP
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SearchHeader;
