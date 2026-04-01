import { Box, Chip, Tooltip, Typography } from "@mui/material";
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
    <Box sx={{ mb: 1 }}>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{
          mb: 1.5,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          fontSize: "0.7rem",
        }}
      >
        Recipes
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {shoppingList.map((item, i: number) => (
          <Chip
            key={i}
            label={getTitle(item.title, item.quantity)}
            onDelete={() => removeFromShoppingList(item.recipe_id, item.title)}
            deleteIcon={
              <Tooltip title="Remove from Shopping List">
                <RemoveShoppingCart fontSize="small" />
              </Tooltip>
            }
            variant="outlined"
          />
        ))}
      </Box>
    </Box>
  );
};
