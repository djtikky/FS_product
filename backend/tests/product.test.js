import request from "supertest";

import app from "../src/server.js";  // ตรวจสอบว่าคุณ export app ออกมาจาก server.js


describe("GET /api/products", () => {

  it("ควรดึงรายการสินค้าได้สำเร็จ", async () => {

    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(200);

    expect(Array.isArray(res.body)).toBe(true);

  });

});