import { useState, useEffect } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { IShoppingListItem } from "../Shared/Types";
import { SnackbarService } from "../Shared/SnackbarService";
import { PrintButton } from "../Shared/Components/CustomButtons";
import { Loading } from "../Shared/Components/Loading";
import { ShoppingListItems } from "./ShoppingListItems";
import { IngredientsListContainer } from "./IngredientsListContainer";
import { ShoppingListAPI } from "../Shared/APIs/ShoppingListAPI";

const getTitle = (title: string, quantity: number) => {
  if (quantity < 2) return title;
  return `${title} x${quantity}`;
};

export const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState<IShoppingListItem[]>();
  const [load, setLoad] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ShoppingListAPI.get().then((list: IShoppingListItem[]) => {
      setShoppingList(list);
      setLoading(false);
    });
  }, [load]);

  const updateShoppingList = async (
    newRecipe: IShoppingListItem[],
    i: number,
  ) => {
    //@ts-ignore
    const newList = [...shoppingList];
    newList[i].ingredients = newRecipe.join("\n");
    setShoppingList(newList);
    await ShoppingListAPI.update(newList[i]);
    setLoad(load + 1);
  };

  const removeFromShoppingList = async (recipeId: string, title: number) => {
    await ShoppingListAPI.removeFromList(recipeId);
    setLoad(load + 1);
    SnackbarService.success(`Removed ${title} from Shopping List`);
  };

  if (loading) return <Loading />;

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 4, maxWidth: "860px", mx: "auto" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography variant="h5" fontWeight={500}>
          Shopping List
        </Typography>
        <Box sx={{ "@media print": { display: "none" } }}>
          <PrintButton label="Shopping List" />
        </Box>
      </Box>
      <Divider sx={{ mb: 3 }} />

      {shoppingList && shoppingList.length ? (
        <>
          <ShoppingListItems
            shoppingList={shoppingList}
            removeFromShoppingList={removeFromShoppingList}
          />
          <Divider sx={{ my: 3 }} />
          {shoppingList.map((recipe, i) => (
            <IngredientsListContainer
              key={i}
              title={getTitle(recipe.title, recipe.quantity)}
              ingredientsList={recipe.ingredients.split("\n") || "unknown"}
              setIngredientsList={(newList: IShoppingListItem[]) => {
                updateShoppingList(newList, i);
              }}
            />
          ))}
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            py: 8,
            color: "text.disabled",
          }}
        >
          <ShoppingCart sx={{ fontSize: 64 }} />
          <Typography variant="h6" color="text.secondary">
            Your shopping list is empty
          </Typography>
          <Typography variant="body2" color="text.disabled">
            Add recipes from the recipe page to get started
          </Typography>
        </Box>
      )}
    </Box>
  );
};
