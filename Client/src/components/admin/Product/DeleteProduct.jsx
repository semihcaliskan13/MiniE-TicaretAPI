import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, useNavigate, useParams } from 'react-router-dom';
import productService from '../../../services/product-services/product-service';

export default function DeleteProduct() {
  const [open, setOpen] = React.useState(true);
    let {id} = useParams();
    const navigate=useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete=()=>{
    productService.deleteProduct(id).then(function (response) {
      //handle success
      console.log(response)        
    }).finally(function(){
      navigate("/admin/ListProducts")
    })
      .catch(function (error) {
        //handle error
        console.log(error);
      });
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>     
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Sil"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Gerçekten silmek istiyor musunuz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/admin/ListProducts" style={{textDecoration:"none"}}>
          <Button sx={{textDecoration:"none"}} onClick={handleClose}>Vazgeç</Button>
          </Link>
          
          <Button type='submit' onClick={() =>{handleDelete()}} autoFocus>
            Onayla
          </Button>
           
        </DialogActions>
      </Dialog>
    </div>
  );
}