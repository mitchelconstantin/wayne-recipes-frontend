import { Tooltip, IconButton } from "@mui/material";
import { TuneRounded } from "@mui/icons-material";

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
    <Tooltip title="Show filters">
      <IconButton
        sx={{
          padding: "6px",
          color: expanded ? "primary.main" : "text.secondary",
          transition: (theme) =>
            theme.transitions.create(["color"], {
              duration: theme.transitions.duration.shortest,
            }),
        }}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show filters"
        size="small"
      >
        <TuneRounded fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};
