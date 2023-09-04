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
    icon: <ChatBubbleBottomCenterIcon />,
    name: "Chat GPT",
    path: "/chat-gpt",
  },
  {
    icon: <WrenchIcon />,
    name: "Tool",
    path: "/tool",
  },
];
