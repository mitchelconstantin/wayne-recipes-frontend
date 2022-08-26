import { Handler } from "@netlify/functions";
import { supabase } from "../../utils/db";
import { decode, encode } from "../../utils/hashIds";
import middy from "middy";

const getOneRecipe: Handler = async (event, context) => {
  const id = event.path.substring(event.path.lastIndexOf("/") + 1);
  const dbId = decode(id);

  const { data, error } = await supabase
    .from("Recipes")
    .select(
      `*,
    reviews (
      score
      )
    `
    )
    .eq("id", dbId)
    .limit(1)
    .single();

  const recipe = {
    ...data,
    numberOfReviews: data.reviews.length,
    id: encode(data.id),
    rating:
      data.reviews.reduce((total, next) => total + next.score, 0) /
      data.reviews.length,
  };

  return {
    statusCode: 200,
    body: JSON.stringify({
      recipe,
      error: error,
    }),
  };
};

exports.handler = middy(getOneRecipe);
