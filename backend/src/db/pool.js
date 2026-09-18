import pg from "pg";
import dotenv from "dotenv";
/*
if (process.env.NODE_ENV !== "production") {
  dotenv.config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
  });
}
*/
const { Pool } = pg;

let poolConfig = {};

if (process.env.DATABASE_URL) {
  const dbUrl = new URL(process.env.DATABASE_URL);
  poolConfig = {
    user: decodeURIComponent(dbUrl.username),
    password: decodeURIComponent(dbUrl.password),
    host: dbUrl.hostname,
    port: Number(dbUrl.port) || 5432,
    database: dbUrl.pathname.replace(/^\//, ""),
    ssl: false
  };
  console.log("Using DATABASE_URL for database connection.");
  console.log(`Database host: ${poolConfig.host}`);
  console.log(`Database name: ${poolConfig.database}`);   
  console.log(`Database user: ${poolConfig.user}`);
  console.log(`Database port: ${poolConfig.port}`);
  console.log(`Database SSL: ${poolConfig.ssl}`);
  console.log(`Database password: ${poolConfig.password}`);

} else {

  poolConfig = {
    host: process.env.DB_HOST || "localhost",

    port: Number(process.env.DB_PORT) || 5432,

    database: process.env.DB_NAME || "productdb",

    user: process.env.DB_USER || "postgres",

    password: String(process.env.DB_PASSWORD || "postgres"),

    ssl: false

  };

}


const pool = new Pool(poolConfig);


export default pool;