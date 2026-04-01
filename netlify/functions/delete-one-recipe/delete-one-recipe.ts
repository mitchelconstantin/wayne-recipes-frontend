import { Handler } from "@netlify/functions";
import { supabase } from "../../utils/db";
import { decode } from "../../utils/hashIds";
import { withAuth } from "../../utils/middleware";

const deleteOneRecipe: Handler = async (event, context) => {
  const dbId = decode(event.queryStringParameters?.id);
  console.log("trying to delete", dbId);
  const { data, error } = await supabase
    .from("recipes")
    .delete()
    .eq("id", dbId)
    .select();

  return {
    statusCode: 200,
    body: JSON.stringify({
      data,
      error: error,
    }),
  };
};

exports.handler = withAuth(deleteOneRecipe, { isAdminRoute: true });
