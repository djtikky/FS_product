import pg from "pg";

import dotenv from "dotenv";


const environment = process.env.NODE_ENV || "development";


if (environment !== "production") {

  dotenv.config({

    path: environment === "test" ? ".env.test" : ".env"

  });

} else {

  dotenv.config();

}


const { Pool } = pg;


const pool = new Pool({

  connectionString: process.env.DATABASE_URL,

  ssl: process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost")

    ? { rejectUnauthorized: false }

    : false

});