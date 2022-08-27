import { Handler } from "@netlify/functions";
import { supabase } from "../../utils/db";
import { encode } from "../../utils/hashIds";
import { middy, authMiddleware } from "../../utils/middleware";

const getUserShoppingList: Handler = async (event, context) => {
  const user_email = event.queryStringParameters?.email;

  const { data, error } = await supabase
    .from("shoppinglist")
    .select(
      `*,
    recipe:recipes (
      title,
      picture
      )
    `
    )
    .match({ user_email });

  const list = data
    ?.map((d) => ({
      ...d,
      title: d.recipe.title,
      picture: d.recipe.picture,
      recipe_id: encode(d.recipe_id),
    }))
    .sort((a, b) => {
      const nameA = a.title.toUpperCase(); // ignore upper and lowercase
      const nameB = b.title.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

  return {
    statusCode: 200,
    body: JSON.stringify({
      list: list,
      error: error,
    }),
  };
};

exports.handler = middy(getUserShoppingList).use(authMiddleware({}));
