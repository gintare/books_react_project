import { useState, useEffect } from "react";
import { getAllCategories } from "../services/get";
import { Controller, useForm } from "react-hook-form";
import { createBook } from "../services/post";
import { useLoaderData } from "react-router-dom";
import { MenuItem, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { getDefaultToken } from "../services/service";

export default function CreateBook() {
  const book = useLoaderData();
  // console.log(book.description);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const {
    register,
    control,
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
      categoryId: 0,
      category: book?.category || "",
    },
  });

  const onClickHandler = async (data) => {
    console.log(data);
    try {
      const book = await createBook(data.categoryId, data);
      if (!book) {
        throw new Error("No book created");
      }
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {

    setCategory(event.target.value);
    // console.log(event.target);
    // setAge(event.target.value);
    setValue("categoryId", event.target.value);
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categor = await getAllCategories();
        //   console.log(categor);
        if (categor.length == 0) {
          throw new Error("no data found");
        }
        setCategories(categor);

        if (book) {
          setValue("title", book.title, { shouldValidate: true });
          setValue("description", book.description, { shouldValidate: true });
          setValue("isbn", book.isbn, { shouldValidate: true });
          setValue("photo", book.photo, { shouldValidate: true });
          setValue("pagesCount", book.pagesCount, { shouldValidate: true });
          setValue("categoryId", book.categoryId);
          //setCategory(book.categoryId);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  return (
    <>
      {!book && <h1>Create book</h1>}
      {book && <h1>Edit book</h1>}
      <div>
        <div className="create-edit-book-form-content">
          <form onSubmit={handleSubmit(onClickHandler)}>
            <TextField
              id="filled-basic"
              label="Title"
              variant="filled"
              {...register("title")}
            />
            <br />
            <TextField
              id="standard-multiline-flexible"
              label="Description"
              multiline
              maxRows={4}
              variant="standard"
              {...register("description")}
            />
            <br />
            <TextField
              id="filled-basic"
              label="ISBN"
              variant="filled"
              {...register("isbn")}
            />
            <br />
            <TextField
              id="filled-basic"
              label="Photo"
              variant="filled"
              {...register("photo")}
            />
            <br />
            <TextField
              id="filled-basic"
              label="Pages Count"
              variant="filled"
              {...register("pagesCount")}
            />
            <br />
            {/* <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <select {...field}>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category}
                    </option>
                  ))}
                </select>
              )}
            /> */}

            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={handleChange}
              // {...register("categoryId")}
            >
              {categories.map((category) => {
                 return <MenuItem key={category.id} value={category.id}>{category.category}</MenuItem>
              })}
            </Select>
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </>
  );
}
