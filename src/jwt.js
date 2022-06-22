import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-koa";
import dotenv from 'dotenv-safe'
dotenv.load()

const secret = process.env["JWT_SECRET"];
const sampleUser = {
  username: 'user',
  password: 'password',
}

export function generateToken(user) {
  return jwt.sign(
    {
      user,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000 + 3600),
      scopes: ['some:scope']
    },
    secret
  );
};

export function verifyToken(ctx) {
  const auth = ctx.request.header.authorization;

  if (auth === undefined) {
    return;
  }

  const [prefix, raw] = auth.split(" ");
  if (prefix !== "Bearer") {
    return;
  }

  const sampleToken = generateToken(sampleUser)

  try {
    return jwt.verify(sampleToken, secret);
  } catch (err) {
    throw new AuthenticationError("Unauthenticated2");
  }
}

export function parseScopes(token) {
  return token.scopes;
}
