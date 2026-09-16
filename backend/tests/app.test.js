import request from "supertest";

import app from "../src/app.js";


describe("Health check", () => {

  it("GET /health should return API status", async () => {

    const response = await request(app).get("/health");


    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({

      status: "ok",

      message: "Product API is running"

    });

  });

});


describe("Product validation", () => {

  it("POST /api/products should reject an empty product name", async () => {

    const response = await request(app)

      .post("/api/products")

      .send({

        name: "",

        price: 100

      });


    expect(response.statusCode).toBe(400);

    expect(response.body.message).toBe("Validation failed");

    expect(response.body.errors[0].field).toBe("name");

  });


  it("POST /api/products should reject a negative price", async () => {

    const response = await request(app)

      .post("/api/products")

      .send({

        name: "Invalid Product",

        price: -10

      });


    expect(response.statusCode).toBe(400);

    expect(response.body.errors[0].field).toBe("price");

  });


  it("POST /api/products should reject non-integer stock", async () => {

    const response = await request(app)

      .post("/api/products")

      .send({

        name: "Invalid Product",

        price: 100,

        stock: 2.5

      });


    expect(response.statusCode).toBe(400);

    expect(response.body.errors[0].field).toBe("stock");

  });


  it("GET /api/products/:id should reject invalid ID", async () => {

    const response = await request(app)

      .get("/api/products/not-a-number");


    expect(response.statusCode).toBe(400);

    expect(response.body.message).toBe("Validation failed");

    expect(response.body.errors[0].field).toBe("id");

  });


  it("GET unknown route should return 404", async () => {

    const response = await request(app)

      .get("/api/not-found");


    expect(response.statusCode).toBe(404);

    expect(response.body).toEqual({

      message: "Route not found"

    });

  });

});