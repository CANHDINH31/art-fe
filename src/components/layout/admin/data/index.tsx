import {
  ChartBarIcon,
  ChatBubbleBottomCenterIcon,
  PhotoIcon,
  UsersIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";

export const listMenuSidebar = [
  {
    icon: <ChartBarIcon />,
    name: "Thống kê",
    path: "/admin",
  },
  {
    icon: <PhotoIcon />,
    name: "Thư viện tranh",
    path: "/admin/paintings",
  },
  {
    icon: <UsersIcon />,
    name: "Quản lý người dùng",
    path: "/admin/users",
  },
  {
    icon: <ChatBubbleBottomCenterIcon />,
    name: "Chat GPT",
    path: "/",
  },
  {
    icon: <WrenchIcon />,
    name: "Tool hỗ trợ",
    path: "/",
  },
];
