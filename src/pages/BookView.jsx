import { useLoaderData } from "react-router-dom";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getCommentsByBook } from "../services/get";
import FormDialog from "../components/FormDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteComment } from "../services/delete";
import EditIcon from "@mui/icons-material/Edit";

export default function BookView() {
  const book = useLoaderData();
  const [comments, setComments] = React.useState([]);
  //console.log(book);

  const deleteOnClickHandler = async (comment_id) => {
    console.log(comment_id);
    try {
      const data = await deleteComment(comment_id);
      if (!data) {
        throw new Error("No delete comment success");
      }
      if (data) {
        setComments(await getCommentsByBook(book.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        const comm = await getCommentsByBook(book.id);
        if (comm) {
          setComments(comm);
          console.log(comm);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <h1>Book view</h1>

      <div className="book-content">
        <img src={book.photo} alt="book cover" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  <h2>{book.title}</h2>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{book.description}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">Puslapiai: {book.pagesCount}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  Kategorija: {book.category.category}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="comment-header">
        <h3>Komentarai</h3>
      </div>
      <div>
        <div className="comment-main-content">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {comments.map((comment) => {
                  return (
                    <TableRow
                      key={comment.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {comment.text}
                      </TableCell>
                      <TableCell align="right">
                      <FormDialog book={book} setComments={setComments} comment={comment} />
                        {/* <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteOnClickHandler(comment.id);
                          }}
                        >
                          <EditIcon />
                        </button> */}
                      </TableCell>
                      <TableCell align="right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteOnClickHandler(comment.id);
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                  // return <div key={comment.id}>{comment.text}</div>;
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <FormDialog book={book} setComments={setComments} />
        </div>
      </div>
    </>
  );
}
