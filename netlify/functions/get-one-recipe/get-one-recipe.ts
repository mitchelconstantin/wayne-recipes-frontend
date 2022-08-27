import { Handler } from "@netlify/functions";
import { supabase } from "../../utils/db";
import { decode, encode } from "../../utils/hashIds";
import { middy } from "../../utils/middleware";

const getOneRecipe: Handler = async (event, context) => {
  const dbId = decode(event.queryStringParameters?.id);

  const { data, error } = await supabase
    .from("recipes")
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
  if (!data) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: "Could not find recipe",
      }),
    };
  }

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
