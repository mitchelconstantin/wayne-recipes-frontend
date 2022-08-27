import { Handler } from "@netlify/functions";
import { supabase } from "../../utils/db";
import { decode } from "../../utils/hashIds";
import { middy, authMiddleware } from "../../utils/middleware";

const addOneToShoppingList: Handler = async (event, context) => {
  const body = JSON.parse(event.body || "");
  const recipe_id = decode(body.data.recipeId);
  const user_email = body.data.userEmail;

  //select count of entries into shopping list where user_email and recipe_id match
  const { data, error } = await supabase
    .from("shoppinglist")
    .select("*")
    .match({ user_email, recipe_id })
    .limit(1)
    .single();
  console.log("data", data);
  console.log("error", error);

  // if there is a count, then increase it by one
  if (data) {
    const existingRecipe = await supabase
      .from("shoppinglist")
      .update({ quantity: data.quantity + 1 })
      .match({
        id: data.id,
      });
    console.log("call2", existingRecipe);
    return {
      statusCode: 200,
      body: JSON.stringify({
        list: existingRecipe.data,
        error: existingRecipe.error,
      }),
    };
  }

  //else, get the recipe, then insert it into the shoppingList
  const recipeToAdd = await supabase
    .from("Recipes")
    .select("ingredients")
    .match({ id: recipe_id })
    .limit(1)
    .single();
  console.log("recipeToAdd", recipeToAdd);

  const newShoppingListItem = {
    recipe_id,
    user_email,
    quantity: 1,
    ingredients: recipeToAdd.data.ingredients,
  };

  const addedShoppingListItem = await supabase
    .from("shoppinglist")
    .insert(newShoppingListItem);

  return {
    statusCode: 200,
    body: JSON.stringify({
      list: addedShoppingListItem.data,
      error: addedShoppingListItem.error,
    }),
  };
};

exports.handler = middy(addOneToShoppingList).use(authMiddleware({}));
