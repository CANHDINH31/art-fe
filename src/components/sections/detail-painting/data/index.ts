import FacebookIcon from "../../../../../public/img/svg/Facebook.svg";
import WhatsAppIcon from "../../../../../public/img/svg/WhatsApp.svg";
import LinkedInIcon from "../../../../../public/img/svg/LinkedIn.svg";
import PinterestIcon from "../../../../../public/img/svg/Pinterest.svg";
import TumblrIcon from "../../../../../public/img/svg/Tumblr.svg";

export const listShareIcon = [
  {
    title: "Share on Facebook",
    icon: FacebookIcon,
    href: "https://www.facebook.com/sharer.php?u=https://tranhtuongmienbac.com/detail-painting/",
  },
  {
    title: "Share on WhatsApp",
    icon: WhatsAppIcon,
    href: "whatsapp://send?text=https://tranhtuongmienbac.com/detail-painting/",
  },
  {
    title: "Share on LinkedIn",
    icon: LinkedInIcon,
    href: "https://www.linkedin.com/sharing/share-offsite/?url=https://tranhtuongmienbac.com/detail-painting/",
  },
  {
    title: "Pin on Pinterest",
    icon: PinterestIcon,
    href: "http://pinterest.com/pin/create/button/?url=https://tranhtuongmienbac.com/detail-painting/",
  },
  {
    title: "Share on Tumblr",
    icon: TumblrIcon,
    href: "https://tumblr.com/widgets/share/tool?canonicalUrl=https://tranhtuongmienbac.com/detail-painting/",
  },
];

export const labelRating: { [index: string]: string } = {
  1: "Không đẹp",
  2: "Bình thường",
  3: "Ấn tượng",
  4: "Tuyệt vời",
  5: "Tuyệt phẩm",
};
