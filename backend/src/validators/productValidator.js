import { z } from "zod";

export const productBodySchema = z.object({
  name: z
    .string({
      error: "Product name is required"
    })
    .trim()
    .min(1, "Product name is required")
    .max(150, "Product name must not exceed 150 characters"),

  description: z
    .string({
      error: "Description must be a string"
    })
    .max(2000, "Description must not exceed 2,000 characters")
    .optional()
    .default(""),

  price: z
    .number({
      error: "Price must be a number"
    })
    .nonnegative("Price must be zero or greater"),

  stock: z
    .number({
      error: "Stock must be a number"
    })
    .int("Stock must be an integer")
    .nonnegative("Stock must be zero or greater")
    .optional()
    .default(0),

  status: z
    .enum(["active", "inactive"], {
      error: "Status must be active or inactive"
    })
    .optional()
    .default("active")
});

export const productIdSchema = z.object({
  id: z
    .coerce
    .number()
    .int("Product ID must be an integer")
    .positive("Product ID must be greater than zero")
});


export const productQuerySchema = z.object({
  search: z
    .string()
    .trim()
    .max(100, "Search text must not exceed 100 characters")
    .optional()
    .default(""),

  status: z
    .enum(["active", "inactive"], {
      error: "Status must be active or inactive"
    })
    .optional()

});