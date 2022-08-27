import { Handler } from "@netlify/functions";
import { supabase } from "../../utils/db";
import { decode } from "../../utils/hashIds";
import { authMiddleware, middy } from "../../utils/middleware";

const deleteOneRecipe: Handler = async (event, context) => {
  const dbId = decode(event.queryStringParameters?.id);
  console.log("trying to delete", dbId);
  const { data, error } = await supabase
    .from("recipes")
    .delete()
    .eq("id", dbId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      data,
      error: error,
    }),
  };
};

exports.handler = middy(deleteOneRecipe).use(
  authMiddleware({ isAdminRoute: true })
);
