import React from 'react';
import {
  makeStyles,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: '10px',
    maxWidth: '50%'
  },
  select: {
    width: '140px'
  },
  expand: {
    transform: 'rotate(1deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
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
      <Tooltip title="advanced filters" className={classes.container}>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </Tooltip>
  );
};
