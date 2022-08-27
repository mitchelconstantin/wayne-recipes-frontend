import { Handler } from "@netlify/functions";
import { supabase } from "../../utils/db";
import { middy, authMiddleware } from "../../utils/middleware";

const updateShoppingListItem: Handler = async (event, context) => {
  const body = JSON.parse(event.body || "");
  console.log("got body. ", body);
  const { id, ingredients }: any = body.data.list;
  const user_email = body.data.userEmail;

  const { data, error } = await supabase
    .from("shoppinglist")
    .update({ ingredients })
    .match({ id, user_email });
  console.log("data", data);
  console.log("error", error);

  return {
    statusCode: 200,
    body: JSON.stringify({
      list: data,
      error: error,
    }),
  };
};

exports.handler = middy(updateShoppingListItem).use(authMiddleware({}));
