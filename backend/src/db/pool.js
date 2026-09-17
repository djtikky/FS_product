import pg from "pg";

import dotenv from "dotenv";


const environment = process.env.NODE_ENV || "development";


if (environment !== "production") {

  dotenv.config({

    path: environment === "test" ? ".env.test" : ".env"

  });

}


const { Pool } = pg;


// เช็กว่าถ้าเป็น internal network ของ Railway (postgres.railway.internal) หรือ localhost ไม่ต้องเปิด SSL

const isInternal = !process.env.DATABASE_URL || 

                   process.env.DATABASE_URL.includes("railway.internal") || 

                   process.env.DATABASE_URL.includes("localhost");


const pool = new Pool({

  connectionString: process.env.DATABASE_URL,

  ssl: isInternal ? false : { rejectUnauthorized: false }

});


export default pool;