const API_URL = import.meta.env.VITE_API_LINK
import axios from "axios"
import { getDefaultToken } from "./service";

export const deleteCategory = async (id) => {
    const userToken = getDefaultToken();
    const data = await axios.delete(`${API_URL}/api/categories/${id}`, {
        headers: {
            'Authorization': `Bearer ${userToken}`
          }
        });
    return data;
}