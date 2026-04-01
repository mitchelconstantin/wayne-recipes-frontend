import { Tooltip, IconButton } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

interface AdvancedFiltersProps {
  expanded: boolean;
  setExpanded: Function;
}
export const ShowFiltersChip = ({
  expanded,
  setExpanded,
}: AdvancedFiltersProps) => {
  const handleExpandClick = () => setExpanded(!expanded);

  return (
    <Tooltip title="Show Advanced Filters">
      <IconButton
        sx={{
          padding: "10px",
          transform: expanded ? "rotate(180deg)" : "rotate(1deg)",
          transition: (theme) =>
            theme.transitions.create("transform", {
              duration: theme.transitions.duration.shortest,
            }),
        }}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
        size="large"
      >
        <ExpandMore />
      </IconButton>
    </Tooltip>
  );
};
