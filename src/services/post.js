
const API_URL = import.meta.env.VITE_API_LINK
import axios from "axios";

export const createBook = async(categoryId, data) => {
    const book = await axios.post(API_URL+"categories/"+categoryId+"/books", data);
    return book.data;
}

export const createBookCategory = async(data) => {
    const category = await axios.post(`${API_URL}categories`, data);
    return category.data;
}