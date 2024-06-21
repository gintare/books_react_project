import { useForm } from "react-hook-form";
import { createBookCategory } from "../services/post";

export default function CreateBookCategory() {
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
        }catch(error){
           console.log(error)
        }
    }

    return (<>
    <h1>Create book category</h1>
    <div>
        <form onSubmit={handleSubmit(onClickHandler)}>
          <label htmlFor="category">Category</label><br/>
          <input type="text" id="category" {...register("category", { required: "Category text is required" })} /><br/>
          <div className="error">{errors.category?.message}</div>
          <input type="submit" value="Submit" />
        </form>
    </div>
    </>);
}