import {
  ChartBarIcon,
  PhotoIcon,
  UsersIcon,
  IdentificationIcon,
  ShoppingCartIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";

export const listMenuSidebar = [
  {
    icon: <ChartBarIcon />,
    name: "Thống kê",
    path: "/admin/statistical",
  },
  {
    icon: <PhotoIcon />,
    name: "Thư viện",
    path: "/admin/libraries",
  },
  {
    icon: <UsersIcon />,
    name: "Người dùng",
    path: "/admin/users",
  },
  {
    icon: <ShoppingCartIcon />,
    name: "Đơn hàng",
    path: "/admin/orders",
  },
];

export const listMenuSidebarV2 = [
  {
    icon: <IdentificationIcon />,
    name: "Quản lý profile",
    path: "/admin/profiles",
  },
  {
    icon: <ChatBubbleBottomCenterIcon />,
    name: "Tweet AI",
    path: "/admin/tweet",
  },
];
