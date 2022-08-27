import { Handler } from "@netlify/functions";
import { supabase } from "../../utils/db";
import { decode, encode } from "../../utils/hashIds";
import { middy, authMiddleware } from "../../utils/middleware";

const patchOneRecipe: Handler = async (event, context) => {
  const dbId = decode(event.queryStringParameters?.id);
  const body = JSON.parse(event.body || "");
  const r = body.data.recipe;

  const recipeToUpdate = {
    id: dbId || undefined,
    title: r.title,
    source: r.source,
    serves: r.serves,
    ingredients: r.ingredients,
    directions: r.directions,
    picture: r.picture,
    mainIngredient: r.mainIngredient,
    region: r.region,
    netCarbs: r.netCarbs,
    type: r.type,
  };

  const { data, error } = await supabase.from("recipes").upsert(recipeToUpdate);

  const updatedRecipe = data && data[0];

  return {
    statusCode: 200,
    body: JSON.stringify({
      recipe: { ...updatedRecipe, id: encode(updatedRecipe.id) },
      error: error,
    }),
  };
};

exports.handler = middy(patchOneRecipe).use(
  authMiddleware({ isAdminRoute: true })
);
