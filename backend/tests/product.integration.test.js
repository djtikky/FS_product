import request from "supertest";

import app from "../src/app.js";

import pool from "../src/db/pool.js";


const validProduct = {

  name: "Test Mechanical Keyboard",

  description: "Product created by automated test",

  price: 2490,

  stock: 10,

  status: "active"

};

const expectedValidProduct = {

  ...validProduct,

  price: "2490.00"

};

beforeEach(async () => {

  await pool.query("TRUNCATE TABLE products RESTART IDENTITY");

});


afterAll(async () => {

  await pool.end();

});


describe("Product CRUD integration tests", () => {

  it("POST /api/products should create a product", async () => {

    const response = await request(app)

      .post("/api/products")

      .send(validProduct);


    expect(response.statusCode).toBe(201);

    expect(response.body).toMatchObject(expectedValidProduct);

    expect(response.body).toHaveProperty("id", 1);

    expect(response.body).toHaveProperty("created_at");

    expect(response.body).toHaveProperty("updated_at");

  });


  it("GET /api/products should return products", async () => {

    await request(app)

      .post("/api/products")

      .send(validProduct);


    const response = await request(app)

      .get("/api/products");


    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveLength(1);

    expect(response.body[0]).toMatchObject(expectedValidProduct);

  });


  it("GET /api/products/:id should return one product", async () => {

    const created = await request(app)

      .post("/api/products")

      .send(validProduct);


    const response = await request(app)

      .get(`/api/products/${created.body.id}`);


    expect(response.statusCode).toBe(200);

    expect(response.body).toMatchObject(expectedValidProduct);

  });


  it("GET /api/products should search and filter products", async () => {

    await request(app)

      .post("/api/products")

      .send(validProduct);


    await request(app)

      .post("/api/products")

      .send({

        name: "Inactive Mouse",

        description: "Test mouse",

        price: 890,

        stock: 5,

        status: "inactive"

      });


    const response = await request(app)

      .get("/api/products?search=keyboard&status=active");


    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveLength(1);

    expect(response.body[0].name).toBe("Test Mechanical Keyboard");

    expect(response.body[0].status).toBe("active");

  });


  it("PUT /api/products/:id should update a product", async () => {

    const created = await request(app)

      .post("/api/products")

      .send(validProduct);


    const updatedProduct = {

      name: "Updated Keyboard",

      description: "Updated by automated test",

      price: 2990,

      stock: 8,

      status: "inactive"

    };

    const expectedUpdatedProduct = {

  ...updatedProduct,

  price: "2990.00"

};



    const response = await request(app)

      .put(`/api/products/${created.body.id}`)

      .send(updatedProduct);


    expect(response.statusCode).toBe(200);

    expect(response.body).toMatchObject(expectedUpdatedProduct);

    expect(response.body.id).toBe(created.body.id);

  });


  it("DELETE /api/products/:id should delete a product", async () => {

    const created = await request(app)

      .post("/api/products")

      .send(validProduct);


    const deleteResponse = await request(app)

      .delete(`/api/products/${created.body.id}`);


    expect(deleteResponse.statusCode).toBe(204);


    const getResponse = await request(app)

      .get(`/api/products/${created.body.id}`);


    expect(getResponse.statusCode).toBe(404);

    expect(getResponse.body).toEqual({

      message: "Product not found"

    });

  });


  it("GET /api/products/:id should return 404 for a missing product", async () => {

    const response = await request(app)

      .get("/api/products/999");


    expect(response.statusCode).toBe(404);

    expect(response.body).toEqual({

      message: "Product not found"

    });

  });

});