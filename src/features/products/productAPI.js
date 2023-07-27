import axios from "axios";
export function fetchProduct() {
  return axios.get(`http://localhost:8080/products`);
}
