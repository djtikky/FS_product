import pg from "pg";

import dotenv from "dotenv";


const environment = process.env.NODE_ENV || "development";


if (environment !== "production") {

  dotenv.config({

    path: environment === "test" ? ".env.test" : ".env"

  });

}


const { Pool } = pg;


const pool = new Pool({

  host: process.env.DB_HOST || "localhost",

  port: Number(process.env.DB_PORT) || 5432,

  database: process.env.DB_NAME || "product_db",

  user: process.env.DB_USER || "postgres",

  password: String(process.env.DB_PASSWORD || ""),

  ssl: false // ใน Railway internal network ปิดเป็น false ได้เลยครับ

});


export default pool;