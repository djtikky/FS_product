import axios from "axios";


/*
const api = axios.create({

  baseURL: "http://localhost:5000/api"

});
*/


const api = axios.create({
  // ถ้าไม่มี VITE_API_URL ให้ใช้ค่า default เป็น /api สำหรับกรณีที่ใช้ Nginx
  baseURL: import.meta.env.VITE_API_URL || "/api"
});


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

export async function getProducts(filters = {}) {
  const params = {};
  if (filters.search) params.search = filters.search;
  if (filters.status) params.status = filters.status;
  
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