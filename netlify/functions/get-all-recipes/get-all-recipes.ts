import { Handler } from "@netlify/functions";
import { supabase } from "./db";
import { authMiddleware } from "./middleware";
import middy from "middy";

const getAllRecipes: Handler = async (event, context) => {
  // const { name = "stranger" } = event.queryStringParameters;

  // const preRecipes = await db.any(
  //   'select "Recipes".id, title, picture, type, source, "mainIngredient", region, type, avg(reviews.score) as rating FROM "Recipes" LEFT JOIN reviews ON "Recipes".id = reviews.recipe_id GROUP BY "Recipes".id ORDER BY "title" ASC'
  // );

  // const recipes = preRecipes.map(configureRecipe);
  // res.json({ recipes });
  const { data, error } = await supabase
    .from("Recipes")
    .select(
      `id,
    title,
    picture,
    type,
    source,
    mainIngredient,
    region,
    type,
    reviews (
      score
      )
    `
    )
    .order("title");

  const average = (array) => {
    if (!array || !array.length) return 0;
    if (array.length === 1) return array[0].score;
    return array.reduce((a, b) => a.score + b.score) / array.length;
  };
  const withAverages = data?.map((r) => ({ ...r, rating: average(r.reviews) }));

  return {
    statusCode: 200,
    body: JSON.stringify({
      recipes: withAverages,
      error: error,
    }),
  };
};

exports.handler = middy(getAllRecipes);

//how to use middleware
// .use(
//   authMiddleware({ isAdminRoute: true })
// );
