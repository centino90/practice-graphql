import { SchemaDirectiveVisitor } from "graphql-tools";
import { defaultFieldResolver } from "graphql";
import { AuthenticationError, ForbiddenError } from "apollo-server-koa";
import { verifyToken, parseScopes } from "../jwt";

export default class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    // console.log("TYPE", type);
    // console.log("ARGS", this.args);
  }

  visitFieldDefinition(field, details) {
    // console.log("TYPEF", field);
    // console.log("DETAILSF", details);
    // console.log("ARGSF", this.args);

    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (...args) => {
      const context = args[2];
      const token = verifyToken(context);

      if (!token) {
        throw new AuthenticationError("Unauthenticated1");
      }

      const { scope } = this.args; // {scope} is from @auth(scope: "some:scope")
      const tokenScopes = parseScopes(token); // token should contain the scopes property
 
      if (!tokenScopes || !tokenScopes.includes(scope)) {
        throw new ForbiddenError("Unauthorized");
      }

      return resolve.apply(this, args);
    };
  }
}
