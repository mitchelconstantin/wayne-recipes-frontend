import { Tooltip, IconButton } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  expand: {
    padding: "10px",
    transform: "rotate(1deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

interface AdvancedFiltersProps {
  expanded: boolean;
  setExpanded: Function;
}
export const ShowFiltersChip = ({
  expanded,
  setExpanded,
}: AdvancedFiltersProps) => {
  const classes = useStyles();
  const handleExpandClick = () => setExpanded(!expanded);

  return (
    <Tooltip title="Show Advanced Filters">
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
        size="large">
        <ExpandMoreIcon />
      </IconButton>
    </Tooltip>
  );
};
