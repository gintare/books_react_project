const API_URL = import.meta.env.VITE_API_LINK;
import axios from "axios";
import { UserContext } from "../App";
import { useContext } from "react";
import { getDefaultToken } from "./service";



export const getAllCategories = async () => {
    const userToken = getDefaultToken();

    const categories = await axios.get(API_URL+"/api/categories", {
        headers: {
            'Authorization': `Bearer ${userToken}`
          }
    });
    return categories.data;
}

export const getAllBooks = async () => {
    const userToken = getDefaultToken();
    //console.log(userToken);
    const books = await axios.get(`${API_URL}/api/books`, {
        headers: {
            'Authorization': `Bearer ${userToken}`
          }
    });
    // console.log(books.data);
    return books.data;
}

export const getOneBook = async (id) => {
   const userToken = getDefaultToken();
   const book = await axios.get(`${API_URL}/api/books/${id}`, {
    headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
//    console.log(book.data);
   return book.data;
}

export const getOneCategory = async (id) => {
    const userToken = getDefaultToken();
    const category = await axios.get(`${API_URL}/api/categories/${id}`, {
     headers: {
         'Authorization': `Bearer ${userToken}`
       }
     });
 //    console.log(book.data);
    return category.data;
 }