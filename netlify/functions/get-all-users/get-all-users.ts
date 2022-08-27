import { Handler } from "@netlify/functions";
import { supabase } from "../../utils/db";
import { authMiddleware, middy } from "../../utils/middleware";

const getAllUsers: Handler = async (event, context) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("email");

  return {
    statusCode: 200,
    body: JSON.stringify({
      users: data,
      error: error,
    }),
  };
};

exports.handler = middy(getAllUsers).use(
  authMiddleware({ isOwnerRoute: true })
);
