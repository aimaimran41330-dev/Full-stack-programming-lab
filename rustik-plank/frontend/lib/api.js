import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: API_BASE });

// Products
export const getProducts = (params) => api.get("/products", { params });
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (data) => api.post("/products", data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const seedProducts = () => api.post("/products/seed/all");

// Categories
export const getCategories = () => api.get("/categories");

// Orders
export const getOrders = () => api.get("/orders");
export const createOrder = (data) => api.post("/orders", data);
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}`, { status });
export const deleteOrder = (id) => api.delete(`/orders/${id}`);
