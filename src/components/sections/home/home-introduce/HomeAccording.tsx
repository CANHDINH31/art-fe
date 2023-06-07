import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { listHomeIntroduce } from "../data";
import { theme } from "@/src/styles";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: "none",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ChevronDownIcon color="primary.main" width={20} />}
    {...props}
  />
))(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  padding: theme.spacing(4),
}));

export default function HomeAccording() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      <Stack
        alignItems={"center"}
        py={2}
        borderBottom={`1px solid ${theme.palette.primary.main}`}
      >
        <Typography fontWeight={"bold"} sx={{ fontSize: { xs: 16, md: 20 } }}>
          VỀ CHÚNG TÔI - MỸ THUẬT ĐÔNG ANH
        </Typography>
      </Stack>
      {listHomeIntroduce.map(homeIntroduce => (
        <Accordion
          key={homeIntroduce.key}
          expanded={expanded === homeIntroduce.key}
          onChange={handleChange(homeIntroduce.key)}
        >
          <AccordionSummary>
            <Typography variant="h4" fontWeight={600}>
              {homeIntroduce.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h5">{homeIntroduce.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
