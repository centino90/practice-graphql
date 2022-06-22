import knex from "knex";
import once from "once";
import dotenv from "dotenv-safe";
dotenv.load();

async function setup(pg, schema) {
  const { drop, create } = schema[0];

  if (drop) {
    for (const q of drop) {
      await pg.raw(q);
    }
  }

  if (create) {
    for (const q of create) {
      await pg.raw(q);
    }
  }
}

const dbUri = process.env["DB_URI"];

export function postgresMiddleware(uri = dbUri, schemas = []) {
  const pg = knex({connection: `postgres://user:password@database/amagi`, client: 'pg'})
  const setupSchema = once(setup);

  return async (ctx, next) => {
    await setupSchema(pg, schemas);

    ctx._postgres = pg;

    return await next();
  };
}

export function postgres(ctx) {
  return ctx._postgres;
}
