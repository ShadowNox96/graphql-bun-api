import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Admin.234",
  database: "backend_db",
  port: 3333,
  waitForConnections: true,  // Important to wait for idle connections
  connectionLimit: 10, 
});

export const db = drizzle(pool);