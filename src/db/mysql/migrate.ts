import { migrate } from "drizzle-orm/mysql2/migrator";
import { db } from "./db";

async function runMigrations() {
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("All migrations ran successfully!");
}

runMigrations().catch((error) => {
  console.error("Error running migrations:", error);
});