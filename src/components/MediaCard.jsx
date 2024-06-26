import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { deleteBook } from '../services/delete';
import CustomizedDialogs from './CustomizedDialogs';

export default function MediaCard({book, setDeleteBook}) {

  // const editLinkClickHandler = (book_id) => {
  //   console.log(book_id);
  //   // "/editBook/{book.id}"
  //   window.open("/editBook/"+book_id);
  // }

  const deleteClickHandler = (book_id) => {
      console.log(book_id);
      try{
        const data = deleteBook(book_id);
        if(!data) throw new Error("No deletion success");
         setDeleteBook(book_id);
      }catch(error){
        console.log(error);
      }
  }

  return (
    <>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={book.photo}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
           {book.description.substring(0, 20)} <CustomizedDialogs book={book} />
        </Typography>
        <Typography variant="body2" color="text.secondary">
           { book.category && <>{book.category.category}</>}
        </Typography>
        <Typography variant="body2" color="text.secondary">
           ISBN: {book.isbn} , pages: {book.pagesCount}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to = {"/editBook/" + book.id}><Button size="small" >Edit</Button></Link>
        <Button size="small" onClick={(e) =>{
          e.stopPropagation();
           deleteClickHandler(book.id);
        }
          }>Delete</Button>
      </CardActions>
    </Card>
    
    </>
  );
}