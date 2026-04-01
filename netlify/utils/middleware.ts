import jwt from "jsonwebtoken";
import { Handler } from "@netlify/functions";

const secret = process.env.USER_AUTH_SECRET;

const getToken = (headers) => {
  let token = headers.authorization || headers["x-access-token"];
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  return token;
};

interface AuthOptions {
  isOwnerRoute?: boolean;
  isAdminRoute?: boolean;
}

export const withAuth = (fn: Handler, options: AuthOptions = {}): Handler =>
  async (event, context) => {
    try {
      const user: any = jwt.verify(getToken(event.headers), secret);
      if (options.isOwnerRoute && !user.isOwner) throw new Error();
      if (options.isAdminRoute && !user.isAdmin) throw new Error();
    } catch (e) {
      console.log("error authenticating", e);
      return {
        statusCode: 403,
        body: JSON.stringify({ error: "Token is not valid" }),
      };
    }
    return fn(event, context);
  };
