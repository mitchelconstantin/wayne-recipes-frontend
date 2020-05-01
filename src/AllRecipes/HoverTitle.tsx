import React, { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Typography } from '@material-ui/core';

interface Props {
  title: string;
  classes: any;
}
export const HoverTitle = ({ title, classes }: Props) => {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <Tooltip
          PopperProps={{
            disablePortal: true
          }}
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={title}
        >
          <Typography onClick={handleTooltipOpen} noWrap className={classes}>
            {title}
          </Typography>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
};
