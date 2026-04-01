import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { IShoppingListItem } from "../Shared/Types";
import RemoveShoppingCart from "@mui/icons-material/RemoveShoppingCart";

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
  removeFromShoppingList,
}: ShoppingListProps) => {
  return (
    <>
      <Box display="flex" alignItems="center">
        <Typography variant="h6">Recipes on the shopping list</Typography>
      </Box>
      {shoppingList.map((item, i: number) => (
        <Box key={i} display="flex" alignItems="center">
          <Typography sx={{ fontSize: (theme) => theme.typography.pxToRem(15), color: "text.secondary" }}>
            {getTitle(item.title, item.quantity)}
          </Typography>
          <Tooltip title="Remove from Shopping List">
            <IconButton
              onClick={() => removeFromShoppingList(item.recipe_id, item.title)}
              aria-label="upload picture"
              size="large"
            >
              <RemoveShoppingCart />
            </IconButton>
          </Tooltip>
        </Box>
      ))}
    </>
  );
};
