import { useState, useEffect } from "react";
import { Box, Divider, Typography } from "@material-ui/core";
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
  const [Container, Buttons] = [Box, Box];

  const updateShoppingList = (newRecipe: IShoppingListItem[], i: number) => {
    //@ts-ignore
    const newList = [...shoppingList];
    newList[i].ingredients = newRecipe.join("\n");
    setShoppingList(newList);
    ShoppingListAPI.update(newList[i]);
    setLoad(load + 1);
  };

  const removeFromShoppingList = async (recipeId: string, title: number) => {
    await ShoppingListAPI.removeFromList(recipeId);
    setLoad(load + 1);
    SnackbarService.success(`Removed ${title} from Shopping List`);
  };

  if (loading) return <Loading />;
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="static"
    >
      <Buttons display="flex">
        <Typography variant="h2">Shopping List</Typography>
        <PrintButton label="Shopping List" />
      </Buttons>
      <Divider />
      {shoppingList && shoppingList.length ? (
        <Box display="flex" flexDirection="column" alignItems="left">
          <ShoppingListItems
            shoppingList={shoppingList}
            removeFromShoppingList={removeFromShoppingList}
          />
          <Divider />
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
        </Box>
      ) : (
        <Typography variant="h2"> Shopping List is Empty</Typography>
      )}
    </Container>
  );
};
