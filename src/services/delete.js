const API_URL = import.meta.env.VITE_API_LINK
import axios from "axios"

export const deleteCategory = async (id) => {
    const data = await axios.delete(`${API_URL}categories/${id}`);
    return data;
}