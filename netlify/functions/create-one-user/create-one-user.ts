import { Handler } from "@netlify/functions";
import { supabase } from "../../utils/db";
import { middy } from "../../utils/middleware";
import bcrypt from "bcrypt";

const createOneUser: Handler = async (event, context) => {
  const body = JSON.parse(event.body || "");
  console.log("body", body);
  const { firstName, lastName, email, password } = body.data.user;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .match({ email })
    .limit(1)
    .single();

  if (data) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "that user already exists, please try logging in",
        error: "that user already exists, please try logging in",
      }),
    };
  }

  const hash = bcrypt.hashSync(password, 10);
  const userToAdd = { firstName, lastName, email, hash };

  const addedNewUser = await supabase.from("users").insert(userToAdd);

  return {
    statusCode: 200,
    body: JSON.stringify({
      list: addedNewUser.data,
      error: addedNewUser.error,
    }),
  };
};

exports.handler = middy(createOneUser);
