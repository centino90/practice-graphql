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
      console.log('TOKEN', token)
      if (!token) {
        // throw new AuthenticationError("Unauthenticated");
      }

      const { scope } = this.args;
      const tokenScopes = parseScopes(token);
      if (!tokenScopes || !tokenScopes.includes(scope)) {
        // throw new ForbiddenError("Unauthorized");
      }
      return resolve.apply(this, args);
    };
  }
}
