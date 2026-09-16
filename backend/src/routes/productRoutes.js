import { Router } from "express";

import {

  getProducts,

  getProductById,

  createProduct,

  updateProduct,

  deleteProduct

} from "../controllers/productController.js";

import { validate } from "../middlewares/validate.js";

import {

  productBodySchema,

  productIdSchema,

  productQuerySchema

} from "../validators/productValidator.js";


const router = Router();


router.get(

  "/",

  validate(productQuerySchema, "query"),

  getProducts

);


router.get(

  "/:id",

  validate(productIdSchema, "params"),

  getProductById

);


router.post(

  "/",

  validate(productBodySchema),

  createProduct

);


router.put(

  "/:id",

  validate(productIdSchema, "params"),

  validate(productBodySchema),

  updateProduct

);


router.delete(

  "/:id",

  validate(productIdSchema, "params"),

  deleteProduct

);


export default router;