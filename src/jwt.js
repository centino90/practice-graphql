import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-koa";

const secret = process.env["JWT_TOKEN"];

export function verifyToken(ctx) {
  const auth = ctx.request.header.authorization;

  if (auth === undefined) {
    return;
  }

  const [prefix, raw] = auth.split(" ");
  if (prefix.trim() !== "Bearer") {
    return;
  }

  try {
    // return jwt.verify(raw.trim(), secret);
  } catch (err) {
    throw new AuthenticationError("Unauthenticated2");
  }
}

export function parseScopes(token) {
  return token.scopes;
}
