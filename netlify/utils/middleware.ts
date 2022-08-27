import jwt from "jsonwebtoken";
export { default as middy } from "middy";

const secret = process.env.USER_AUTH_SECRET;

const getToken = (headers) => {
  let token = headers.authorization || headers["x-access-token"];
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  return token;
};

export const authMiddleware = ({
  isOwnerRoute = false,
  isAdminRoute = false,
}) => ({
  before: async (handler, next) => {
    try {
      const user = await jwt.verify(getToken(handler.event.headers), secret);
      if (isOwnerRoute && !user.isOwner) {
        throw new Error();
      }
      if (isAdminRoute && !user.isAdmin) {
        throw new Error();
      }
      // next();
    } catch (e) {
      console.log("error authenticating", e);
      return handler.callback(null, {
        statusCode: 403,
        body: JSON.stringify({ error: "Token is not valid" }),
      });
    }
  },
});
