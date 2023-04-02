import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ShoppingBag } from '@mui/icons-material';
import { Button,Box,FormGroup, Card, CardHeader, Grid, TextField, Typography } from '@mui/material'
import m1 from '../images/m1.webp'
import orderService from '../services/order-services/order-service';
import { useEffect } from 'react';
import { useState } from 'react';
import productservices from '../services/product-services/product-service';

const Order = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const[product,setProduct]=useState([]);
  var images = [];
  const [img,setImg]=useState([])
  useEffect(() => {
    if (product.length === 0) {
      productservices.getProductById(id).then(function (response) {
        //handle success
        setProduct(response.data);
        productservices.getImage(response.data.id,response.data.name).then(function(response2){
          console.log(response2.data)
          setImg(response2.data)
               
      })
      })
        .catch(function (error) {
          //handle error
          console.log(error);
        });
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    var data = {
      "Id": parseInt(0),
      "Description": formData.get("description"),
      "Address":formData.get("address"),
      "UserId":4,
      "ProductId":parseInt(product.id)
    }
    console.log(data)

    orderService.createOrder(data).then(function (response) {
      //handle success
      console.log(response);
      navigate("/")
    })
      .catch(function (error) {
        //handle error
        console.log(error);
      });
  };
  return (
    <Card sx={{ borderRadius: "5%", border: "solid 2px antiquewhite", maxWidth: "80%", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "450px" }}>
      <CardHeader>
        <Typography variant="body2" color="text.secondary">
          Bla-Bla Adlı Ürünün Detayları
        </Typography>
      </CardHeader>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
        {product.name!==undefined? <img style={{ height: "350px" }} src={`https://minieticaretdesign.blob.core.windows.net/${product.id}-${product.name.toLowerCase()}/${img}`} />:null}
        </Grid>
        <Grid item xs={6} sx={{ ml: "-100px" }}>
          <Typography sx={{ lineHeight: "45px", mt: "20px" }}>Ürün adı: {product.name}</Typography>
          <Typography sx={{ lineHeight: "45px" }}>Kategori: {product.categoryName}</Typography>
          <Typography sx={{ lineHeight: "45px" }}>Açıklama: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quasi, dicta optio odit reiciendis in suscipit sequi qui possimus eaque quas sint obcaecati saepe, rerum, officiis vitae corrupti quod sunt?</Typography>
          <Typography sx={{ lineHeight: "45px" }}>Fiyat: {product.price}₺</Typography>
        </Grid>
        <Grid item xs={6}>
          Adres Bilgisi Giriniz:
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          deneme

        </Grid>
        <Grid item xs={6}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              marginTop: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>

            <FormGroup sx={{ width: '50%' }} >
              <TextField name='description' placeholder='açıklama'></TextField>
              <br></br>
              <TextField name='address' placeholder='adres'></TextField>            
                <br/> 
                <Button  type='submit' variant="outlined" color='inherit'
                  sx={{ color: "#5B4342", ml: "19%" }} startIcon={<ShoppingBag />}
                  size="large"
                >Sipariş Ver</Button>            
            </FormGroup>
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}

export default Order