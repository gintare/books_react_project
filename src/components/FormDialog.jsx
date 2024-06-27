import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createComment } from '../services/post';
import { getCommentsByBook } from '../services/get';
import { updateComment } from '../services/put';

export default function FormDialog({book, setComments, comment}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {!comment && <Button variant="outlined" onClick={handleClickOpen}>
        Add comment
      </Button>}
      {comment && <Button variant="outlined" onClick={handleClickOpen}>
        Edit comment
      </Button>}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            //console.log("aaaa"+formJson.comment);
            if(comment){
               const com = await updateComment(book.id, formJson, comment.id);
               if(!com){
                  throw new Error("No comment updated")
               }
            } else { 
                const com = await createComment(book.id, formJson);
                if(!com){
                  throw new Error("No comment created");
                }
            }
            setComments(await getCommentsByBook(book.id));
            handleClose();
          },
        }}
      >
        <DialogTitle>Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="text"
            label="Komentuokite"
            type="text"
            defaultValue={comment && comment.text}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Comment</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}