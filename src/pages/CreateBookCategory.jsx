import { useForm } from "react-hook-form";
import { createBookCategory } from "../services/post";
import { useState, useEffect } from "react";
import { getAllCategories } from "../services/get";
import { deleteCategory } from "../services/delete";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getDefaultToken } from "../services/service";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

export default function CreateBookCategory() {
    const categoryOne = useLoaderData(); 
    console.log(categoryOne)
    const [ categories, setCategories] = useState([]);
    const [ update, setUpdate ] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
      } = useForm({
        defaultValues: {
          category: ""
        },
      });

    const onClickHandler = (data) => {
        console.log(data);
        try{
           const cat = createBookCategory(data);
           if(!cat){
              throw new Error("No book category created");
           }
           reset();
           setUpdate((prev) => !prev);
        }catch(error){
           console.log(error)
        }
    }

    const onClickDeleteHandler = async (category_id) => {
      // console.log("aaa"+category_id);
      try{
        const result = await deleteCategory(category_id);
        if(result){
          setUpdate((prev) => !prev);
        } else{
          throw new Error("no category deleted");
        }
        
      }catch(error) {
         console.log(error);
      }
    }

    const onClickEditHandler = (category_id, category) => {
      console.log("aaa"+category_id+ " "+category);
      setValue("category", category);
    }

    useEffect(() => {
       const getCategories = async () => {
        console.log(categoryOne+"****");
        if(categoryOne){
           setValue("category", categoryOne.category);
        }
        try{      
          const cat = await getAllCategories();
          if( !cat) throw new Error("No categories selected");
          setCategories(cat); 
        } catch (error) {
           console.log(error);
        }
       }
       getCategories();
    }, [update, categoryOne])

    return (<>
    <h1>Create book category</h1>
    <div className="categories-create-form-content">
        <form onSubmit={handleSubmit(onClickHandler)}>
          <TextField id="filled-basic" label="Category" variant="filled" {...register("category", { required: "Category text is required" })} />
          <div className="error">{errors.category?.message}</div>
          <Button variant="contained" type="submit">Submit</Button>
        </form>
        <div>
          <h2>Created categories:</h2>
          <table>
            <tbody>
          {categories.map((category) => {
            return <tr key={category.id}><td>{category.category}</td><td><button onClick={(e) => {
                e.stopPropagation();
                onClickDeleteHandler(category.id);
              }
                }>Delete 🗑️</button>
                <Link to={`/editcat/${category.id}`}><button>Edit 🖋️</button></Link></td></tr>;
          })}
          </tbody>
          </table>
        </div>
    </div>
    </>);
}