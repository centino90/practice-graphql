import { Client } from "raven";
import once from "once";

const registerGlobalHandler = once((client) => {
  process.on("unhandledRejection", (err) => {
    client.captureException(err);
  });
});

export function errorHandler(ravenURI) {
  const client = new Client(ravenURI);
  registerGlobalHandler(client);

  return async (ctx, next) => {
    ctx._raven = client;

    try {
      await next();
    } catch (err) {
      client.captureException(err);
      Object.assign(ctx, {
        body: {
          message: "Internal error",
        },
        status: err.status || 500,
      });
    }

    if (ctx.status === 404) {
      ctx.body = {
        message: "Not found",
      };
    }
  };
}

export function ravenClient(ctx) {
  return ctx._raven;
}
