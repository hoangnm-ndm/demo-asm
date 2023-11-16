// api.js
import axios from "axios";

const API_URL = "http://localhost:3004";
const api = {
  getProducts: async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  },

  getProduct: async (productId) => {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data;
  },

  addProduct: async (newProduct) => {
    const response = await axios.post(`${API_URL}/products`, newProduct);
    return response.data;
  },

  updateProduct: async (productId, updatedProduct) => {
    const response = await axios.put(
      `${API_URL}/products/${productId}`,
      updatedProduct
    );
    return response.data;
  },

  deleteProduct: async (productId) => {
    await axios.delete(`${API_URL}/products/${productId}`);
  },
};

export default api;
