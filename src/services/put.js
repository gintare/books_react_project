
const API_URL = import.meta.env.VITE_API_LINK
import axios from "axios";
import { getDefaultToken } from "./service";

export const updateBookCategory = async(category_id, data) => {
    const userToken = getDefaultToken();
    const category = await axios.put(`${API_URL}/api/categories/${category_id}`, data, {
        headers: {
            'Authorization': `Bearer ${userToken}`
          }
        });
    return category.data;
}

export const updateBook = async(category_id, data, books_id) => {
    const userToken = getDefaultToken();
    const book = await axios.put(`${API_URL}/api/categories/${category_id}/books/${books_id}`, data, {
        headers: {
            'Authorization': `Bearer ${userToken}`
          }
        });
    return book.data;
}

export const updateComment = async(book_id, data, comment_id) => {
    const userToken = getDefaultToken();
    const comment = await axios.put(`${API_URL}/api/books/${book_id}/comments/${comment_id}`, data, {
        headers: {
            'Authorization': `Bearer ${userToken}`
          }
        });
    return comment.data;
}