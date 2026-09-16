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

  host: process.env.DB_HOST,

  port: Number(process.env.DB_PORT || 5432),

  database: process.env.DB_NAME,

  user: process.env.DB_USER,

  password: process.env.DB_PASSWORD

});


export default pool;