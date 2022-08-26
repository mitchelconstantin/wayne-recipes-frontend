import { Handler } from "@netlify/functions";
import { supabase } from "../../utils/db";
import { decode } from "../../utils/hashIds";
import { authMiddleware } from "../../utils/middleware";
import middy from "middy";

const getUserRecipeReview: Handler = async (event, context) => {
  const recipe_id = decode(event.queryStringParameters?.recipeId);
  const user_email = event.queryStringParameters?.email;

  const { data, error } = await supabase.from("reviews").select().match({
    recipe_id,
    user_email,
  });
  const review = data?.length ? data[0] : null;

  return {
    statusCode: 200,
    body: JSON.stringify({
      review,
      error: error,
    }),
  };
};

exports.handler = middy(getUserRecipeReview).use(authMiddleware({}));
