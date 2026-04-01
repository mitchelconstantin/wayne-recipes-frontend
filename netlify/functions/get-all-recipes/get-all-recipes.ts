import { Handler } from "@netlify/functions";
import { supabase } from "../../utils/db";
import { encode } from "../../utils/hashIds";

const getAllRecipes: Handler = async (event, context) => {
  const { data, error } = await supabase
    .from("recipes")
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
    `,
    )
    .order("title");

  const average = (array: { score: number }[]) => {
    if (!array || !array.length) return 0;
    if (array.length === 1) return array[0].score;
    return array.reduce((sum, item) => sum + item.score, 0) / array.length;
  };
  const withAverages = data?.map((r) => ({
    ...r,
    rating: average(r.reviews),
    id: encode(r.id),
  }));

  return {
    statusCode: 200,
    body: JSON.stringify({
      recipes: withAverages,
      error: error,
    }),
  };
};

exports.handler = getAllRecipes;
