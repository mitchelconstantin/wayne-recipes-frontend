import { Handler } from "@netlify/functions";
import { supabase } from "../../utils/db";
import { decode } from "../../utils/hashIds";
import { middy, authMiddleware } from "../../utils/middleware";

const removeOneFromShoppingList: Handler = async (event, context) => {
  const body = JSON.parse(event.body || "");
  const recipe_id = decode(body.recipeId);
  const user_email = body.userEmail;
  console.log("got past that", recipe_id, user_email);
  const { data, error } = await supabase
    .from("shoppinglist")
    .select("*")
    .match({ user_email, recipe_id })
    .limit(1)
    .single();

  // if there is a count, then decrease it by one
  if (data.quantity > 1) {
    const existingRecipe = await supabase
      .from("shoppinglist")
      .update({ quantity: data.quantity - 1 })
      .match({
        id: data.id,
      });
    return {
      statusCode: 200,
      body: JSON.stringify({
        list: existingRecipe.data,
        error: existingRecipe.error,
      }),
    };
  }

  //if there isn't, delete the record
  const deletedShoppingListItem = await supabase
    .from("shoppinglist")
    .delete()
    .match({
      id: data.id,
    });

  return {
    statusCode: 200,
    body: JSON.stringify({
      list: deletedShoppingListItem.data,
      error: deletedShoppingListItem.error,
    }),
  };
};

exports.handler = middy(removeOneFromShoppingList).use(authMiddleware({}));
