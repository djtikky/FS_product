import axios from "axios";


/*
const api = axios.create({

  baseURL: "http://localhost:5000/api"

});
*/
const api = axios.create({
  baseURL: "https://fsproduct-production.up.railway.app/api",
});

/*
const api = axios.create({
  // ถ้าไม่มี VITE_API_URL ให้ใช้ค่า default เป็น /api สำหรับกรณีที่ใช้ Nginx
  baseURL: import.meta.env.VITE_API_URL || "/api"
});








const api = axios.create({

  // เปลี่ยน baseURL ให้ชี้ไปที่ /api/products หรือแค่ /api แล้วค่อยไปเติม /products ในคำสั่ง get

  // วิธีที่ปลอดภัยที่สุดคือให้ baseURL เป็นแค่ http://localhost:5000/api

  baseURL: "http://localhost:5000/api" 

});

*/

/*
export async function getProducts() {

  const response = await api.get("/products");

  return response.data;

}
*/
/*
export async function getProducts(filters = {}) {
  const response = await api.get("/products", {
    params: filters
  });

  return response.data;
}
*/
/*
export async function getProducts(filters = {}) {
  const params = {};
  if (filters.search) params.search = filters.search;
  if (filters.status) params.status = filters.status;
  
  const response = await api.get("/products", { params });
  return response.data;
}

*/
/*
export async function getProducts(filters = {}) {

  // ตรงนี้คือจุดสำคัญ ต้องเรียกไปที่ /products (ซึ่งรวมกับ baseURL จะกลายเป็น /api/products)

  const response = await api.get("/products", {

    params: filters

  });

  return response.data;

}
*/

export async function getProducts(filters = {}) {
  const params = {};

  // ส่งเฉพาะเมื่อมีค่า และไม่ใช่ค่าว่าง
  if (filters.search && filters.search.trim() !== "") {
    params.search = filters.search;
  }
  if (filters.status && filters.status !== "") {
    params.status = filters.status;
  }
  const response = await api.get("/products", { params });
  return response.data;
}

export async function createProduct(product) {

  const response = await api.post("/products", product);

  return response.data;

}

export async function updateProduct(id, product) {

  const response = await api.put(`/products/${id}`, product);

  return response.data;

}


export async function deleteProduct(id) {

  await api.delete(`/products/${id}`);

}