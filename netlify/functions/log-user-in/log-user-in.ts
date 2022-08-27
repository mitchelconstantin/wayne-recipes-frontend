import { Handler } from "@netlify/functions";
import { supabase } from "../../utils/db";
import { middy } from "../../utils/middleware";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const logUserIn: Handler = async (event, context) => {
  const body = JSON.parse(event.body || "");
  const { email, password } = body.data.user;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .match({ email })
    .limit(1)
    .single();
  console.log("data", data);
  if (!data) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: "User Not found",
      }),
    };
  }

  const correctPassword = bcrypt.compareSync(password, data.hash);

  if (!correctPassword) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        error: "Password incorrect",
      }),
    };
  }

  const token = jwt.sign(
    {
      email: email,
      firstName: data.firstName,
      lastName: data.lastName,
      isAdmin: data.isAdmin,
      isOwner: data.isOwner,
    },
    process.env.USER_AUTH_SECRET,
    {
      // expiresIn: "24h", // expires in 24 hours
    }
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      token,
      message: "Authentication successful",
      error: error,
    }),
  };
};

exports.handler = middy(logUserIn);
