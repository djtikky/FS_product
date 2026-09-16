import express from "express";

import cors from "cors";

import productRoutes from "./routes/productRoutes.js";


import {

  notFoundHandler,

  errorHandler

} from "./middlewares/errorHandler.js";


const app = express();


app.use(cors());

app.use(express.json());


app.get("/health", (req, res) => {

  res.json({

    status: "ok",

    message: "Product API is running"

  });

});


app.use("/api/products", productRoutes);


app.use(notFoundHandler);

app.use(errorHandler);


export default app;