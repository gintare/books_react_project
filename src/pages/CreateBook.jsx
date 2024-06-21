
import { useState, useEffect } from "react";
import { getAllCategories } from "../services/get";
import { useForm } from "react-hook-form";
import { createBook } from "../services/post";

export default function CreateBook() {
  const[ categories, setCategories ] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      isbn: "",
      photo: "",
      pagesCount: 0,
      categoryId: 0
    },
  });

  const onClickHandler = async (data) => {
     console.log(data);
     try{
        const book = await createBook(data.categoryId, data);
        if(!book){
           throw new Error("No book created");
        }
        reset();

     }catch(error){
       console.log(error);
     }
  }

  useEffect(() => {
    const getCategories = async () => {
       try{
          const categor = await getAllCategories();
        //   console.log(categor);
          if(categor.length == 0){
            throw new Error("no data found");
          }

          setCategories(categor);
       }catch(error){
          console.log(error);
       }
    };
    getCategories();

  }, []);

  return (
    <>
      <h1>Create book</h1>
      <form onSubmit={handleSubmit(onClickHandler)}>
        <label htmlFor="title">Title</label>
        <br />
        <input type="text" id="title" {...register("title")}/>
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <textarea id="description" {...register("description")}/>
        <br />
        <label htmlFor="isbn">ISBN</label>
        <br />
        <input type="text" id="isbn" {...register("isbn")} />
        <br />
        <label htmlFor="photo">photo</label>
        <br />
        <input type="text" id="photo" {...register("photo")}/>
        <br />
        <label htmlFor="pagesCount">Pages count</label>
        <br />
        <input type="text" id="pagesCount" {...register("pagesCount")} />
        <br />
        <select name="categories" id="categories" {...register("categoryId")}>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.category}</option>)}
        </select><br/>
        <input type="submit" value="Submit"/>
      </form>
    </>
  );
}
