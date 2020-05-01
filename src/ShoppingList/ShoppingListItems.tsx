import React from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import { IShoppingListItem } from '../Shared/Types';
import RemoveShoppingCart from '@material-ui/icons/RemoveShoppingCart';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  details: {
    flexDirection: 'column'
  }
}));

const getTitle = (title: string, quantity: number) => {
  if (quantity < 2) return title;
  return `${title} x${quantity}`;
};

interface ShoppingListProps {
  shoppingList: IShoppingListItem[];
  removeFromShoppingList: Function;
}

export const ShoppingListItems = ({
  shoppingList,
  removeFromShoppingList
}: ShoppingListProps) => {
  const classes = useStyles();

  return (
    <>
      <Box display="flex" alignItems="center">
        <Typography variant="h6">Recipes on the shopping list</Typography>
      </Box>
      {shoppingList.map((item, i: number) => (
        <Box key={i} display="flex" alignItems="center">
          <Typography className={classes.secondaryHeading}>
            {getTitle(item.title, item.quantity)}
          </Typography>
          <Tooltip title="Remove from Shopping List">
            <IconButton
              onClick={() => removeFromShoppingList(item.recipe_id, item.title)}
              aria-label="upload picture"
            >
              <RemoveShoppingCart />
            </IconButton>
          </Tooltip>
        </Box>
      ))}
    </>
  );
};
