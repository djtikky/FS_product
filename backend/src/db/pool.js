import pg from "pg";

import dotenv from "dotenv";


// ถ้าอยู่บน Railway (Production) จะไม่อ่านไฟล์ .env เด็ดขาด

if (process.env.NODE_ENV !== "production") {

  dotenv.config({

    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"

  });

}


const { Pool } = pg;


// พิมพ์ log ตรวจสอบค่าตอน start server (จะเห็นใน Logs บน Railway)

console.log("Connecting DB with:", {

  hasDatabaseUrl: !!process.env.DATABASE_URL,

  host: process.env.PGHOST || process.env.DB_HOST,

  user: process.env.PGUSER || process.env.DB_USER,

  db: process.env.PGDATABASE || process.env.DB_NAME,

  nodeEnv: process.env.NODE_ENV

});


const pool = new Pool({

  connectionString: process.env.DATABASE_URL,

  ssl: false

});


export default pool;