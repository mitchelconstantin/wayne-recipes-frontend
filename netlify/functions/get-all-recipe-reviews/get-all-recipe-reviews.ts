import { Handler } from "@netlify/functions";
import { supabase } from "../../utils/db";
import { decode } from "../../utils/hashIds";
import { middy, authMiddleware } from "../../utils/middleware";

// static async getAllReviewsForRecipe(req, res) {
//   const dbId = decode(req.params.recipeId);
//   if (!dbId) res.status(404).send({ error: "invalid recipeId" });

//   const reviews = await db.any(
//     'select * from "reviews" WHERE recipe_id = $1',
//     dbId
//   );
//   res.json(convertReviews(reviews));
// }

const getUserRecipeReview: Handler = async (event, context) => {
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

exports.handler = middy(getUserRecipeReview).use(authMiddleware({}));
