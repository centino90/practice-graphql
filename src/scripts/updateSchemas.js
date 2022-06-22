import PgAsync from "pg-async";
import dotenv from "dotenv-safe";
import pgm from "node-pg-migrate";
import { postgres } from "../postgres";
dotenv.load();

const ignoredSchemas = [
  "public",
  "extensions",
  "pg_catalog",
  "pg_toast",
  "pg_temp_1",
  "pg_toast_temp_1",
  "information_schema",
];

const dbUri = process.env["DB_URI"];

async function updateSchemas() {
  // const pg = new PgAsync(postgres);
  const pg = new PgAsync({ connectionString: dbUri });

  const { rows } = await pg.query(
    "SELECT schema_name FROM information_schema.schemata"
  );
  const schemas = rows.map((row) => row.schema_name);
  const filtered = schemas.filter((schema) => !ignoredSchemas.includes(schema));

  console.log("SCHEMAS", schemas);
  console.log("FILTERED_SCHEMAS", filtered);

  for (let i = 0; i < filtered.length; i++) {
    console.log(`** MIGRATING ${filtered[i]} **`);
    await pgm({
      schema: filtered[i],
      direction: "up",
      databaseUrl: dbUri,
      dir: "migrations/",
      migrationsTable: "pgmigrations",
    });
    console.log(`** FINISHED ${filtered[i]} **`);
  }

  pg.closeConnections();
}

updateSchemas()
  .then(() => console.log("DONE"))
  .catch((err) => console.log(err));
