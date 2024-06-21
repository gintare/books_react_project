const API_URL = import.meta.env.VITE_API_LINK;
import axios from "axios";

export const getAllCategories = async () => {
    const categories = await axios.get(API_URL+"categories");
    return categories.data;
}

export const getAllBooks = async () => {
    const books = await axios.get(`${API_URL}books`);
    // console.log(books.data);
    return books.data;
}