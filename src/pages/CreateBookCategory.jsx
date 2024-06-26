import { useForm } from "react-hook-form";
import { createBookCategory } from "../services/post";
import { useState, useEffect } from "react";
import { getAllCategories } from "../services/get";
import { deleteCategory } from "../services/delete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getDefaultToken } from "../services/service";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { updateBookCategory } from "../services/put";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function CreateBookCategory() {
  const categoryOne = useLoaderData();
  //console.log(categoryOne)
  const [categories, setCategories] = useState([]);
  const [update, setUpdate] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      category: "",
    },
  });

  const onClickHandler = async (data) => {
    console.log(data);
    try {
      if (categoryOne) {
        //console.log("update");
        const cat = await updateBookCategory(categoryOne.id, data);
        if(cat) {
          console.log("update"+data.category)
          setValue("category", data.category);
          setUpdatedCategory(data.category);
        }
        
      } else {
        const cat = await createBookCategory(data);
        if (!cat) {
          throw new Error("No book category created");
        }
      }
      reset();
      setUpdate((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickDeleteHandler = async (category_id) => {
    console.log("aaa"+category_id);
    try {
      const result = await deleteCategory(category_id);
      if (result) {
        setUpdate((prev) => !prev);
      } else {
        throw new Error("no category deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const getCategories = async () => {
      //console.log(categoryOne+"****");
      if (categoryOne) {
        if(updatedCategory){
          setValue("category", updatedCategory);
          setUpdatedCategory(null)
        } else{
          setValue("category", categoryOne.category);
        }
        
      }
      try {
        const cat = await getAllCategories();
        if (!cat) throw new Error("No categories selected");
        setCategories(cat);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, [update, categoryOne]);

  return (
    <>
      { !categoryOne && <h1>Create book category</h1>}
      { categoryOne && <h1>Update book category</h1>}
      <div className="categories-create-form-content">
        <div className="cotegory-crete-form-content-inner">
        <form onSubmit={handleSubmit(onClickHandler)}>
          <TextField
            id="filled-basic"
            label="Category"
            variant="filled"
            {...register("category", { required: "Category text is required" })}
          />
          <div className="error">{errors.category?.message}</div>
          {/* <input type="submit" value="Submit" /> */}
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
        </div>
        <div>
          <h2>Created categories:</h2>
          {/* <table>
            <tbody> */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 250 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Category&nbsp;name</TableCell>
                  <TableCell align="right">Update</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category) => {
                  return (
                    <TableRow
                      key={category.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {category.category}
                      </TableCell>
                      <TableCell align="right">
                        <Link to={`/editcat/${category.id}`}>
                          <button><EditIcon/></button>
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onClickDeleteHandler(category.id);
                          }}
                        >
                          <DeleteIcon/>
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                  // return (
                  //   <>
                  //     <Grid item xs={6} key={category.id+2}>
                  //       {category.category}
                  //     </Grid>
                  //     <Grid item xs={2} key={category.id+1}>
                  //       <Link to={`/editcat/${category.id}`}>
                  //         <button>Edit 🖋️</button>
                  //       </Link>
                  //     </Grid>
                  //     <Grid item xs={2} key={category.id}>
                  //     <button
                  //         onClick={(e) => {
                  //           e.stopPropagation();
                  //           onClickDeleteHandler(category.id);
                  //         }}
                  //       >
                  //         🗑️
                  //       </button>
                  //     </Grid>
                  //   </>
                  // );

                  // return <tr key={category.id}><td>{category.category}</td><td><button onClick={(e) => {
                  //     e.stopPropagation();
                  //     onClickDeleteHandler(category.id);
                  //   }
                  //     }>Delete 🗑️</button>
                  //     <Link to={`/editcat/${category.id}`}><button>Edit 🖋️</button></Link></td></tr>;
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
