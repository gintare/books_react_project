import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function MediaCard({book}) {

  // const editLinkClickHandler = (book_id) => {
  //   console.log(book_id);
  //   // "/editBook/{book.id}"
  //   window.open("/editBook/"+book_id);
  // }

  return (
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
           {book.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
           { book.category && <>{book.category.category}</>}
        </Typography>
        <Typography variant="body2" color="text.secondary">
           ISBN: {book.isbn} , pages: {book.pagesCount}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to = {"/editBook/" + book.id}>
        <Button size="small" 
        // onClick={(e) => {
        //   e.stopPropagation()
        //   editLinkClickHandler(book.id);
        // }}
        >Edit</Button></Link>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}