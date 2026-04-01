import { Handler } from "@netlify/functions";
import { supabase } from "../../utils/db";
import { withAuth } from "../../utils/middleware";

const updateUserPermission: Handler = async (event, context) => {
  const body = JSON.parse(event.body || "");
  const users = body.data.users;

  const userFieldsToUpdate = users.map((u) => ({
    email: u.email,
    isAdmin: u.isAdmin,
  }));

  const { data, error } = await supabase
    .from("users")
    .update(userFieldsToUpdate)
    .select();

  return {
    statusCode: 200,
    body: JSON.stringify({
      users: data,
      error: error,
    }),
  };
};

exports.handler = withAuth(updateUserPermission, { isOwnerRoute: true });
