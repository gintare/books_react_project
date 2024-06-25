
const API_URL = import.meta.env.VITE_API_LINK
import axios from "axios";
import { getDefaultToken } from "./service";

export const createBook = async(categoryId, data) => {
    const userToken = getDefaultToken();
    const book = await axios.post(API_URL+"/api/categories/"+categoryId+"/books", data, {
        headers: {
            'Authorization': `Bearer ${userToken}`
          }
        });
    return book.data;
}

export const createBookCategory = async(data) => {
    const userToken = getDefaultToken();
    const category = await axios.post(`${API_URL}/api/categories`, data, {
        headers: {
            'Authorization': `Bearer ${userToken}`
          }
        });
    return category.data;
}

export const loginToBooks = async(data) => {
    const token = await axios.post(`${API_URL}/auth/authenticate`, data);
    return token.data;
}