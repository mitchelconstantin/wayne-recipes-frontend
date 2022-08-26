import { Handler } from "@netlify/functions";
import { supabase } from "../../utils/db";
import { decode } from "../../utils/hashIds";
import { middy } from "../../utils/middleware";

const getAllRecipeReviews: Handler = async (event, context) => {
  const recipe_id = decode(event.queryStringParameters?.recipeId);

  const { data, error } = await supabase.from("reviews").select().match({
    recipe_id,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      reviews: data,
      error: error,
    }),
  };
};

exports.handler = middy(getAllRecipeReviews);
