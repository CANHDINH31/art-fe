import {
  Tooltip,
  TooltipProps,
  Zoom,
  styled,
  tooltipClasses,
} from "@mui/material";
import React from "react";
import Image from "next/image";

type Props = {
  title?: string;
  icon: string;
};

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    cursor: "pointer",
    fontSize: 14,
  },
}));

const SocialIcon = ({ title, icon }: Props) => {
  return (
    <BootstrapTooltip
      TransitionComponent={Zoom}
      TransitionProps={{ timeout: 300 }}
      title={title}
    >
      <Image src={icon} alt="socail-icon" width={24} priority={false} />
    </BootstrapTooltip>
  );
};

export default SocialIcon;
