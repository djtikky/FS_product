import dotenv from "dotenv";

import app from "./app.js";

import pool from "./db/pool.js";


dotenv.config();


const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`API running at port ${PORT}`);
});


async function shutdown(signal) {

  console.log(`${signal} received. Closing server...`);


  server.close(async () => {

    await pool.end();

    console.log("Database pool closed.");

    process.exit(0);

  });

}



process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("SIGINT", () => shutdown("SIGINT"));


export default app;