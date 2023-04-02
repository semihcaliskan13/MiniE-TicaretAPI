import { Handshake, ShoppingBag } from '@mui/icons-material';
import { Box, Button, Card, CardHeader, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import productService from '../services/product-services/product-service';
import httpClientService from '../services/http-client-service';
import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';

const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState([]);
  const [img,setImg]=useState();
  const [offer,setOffer]=useState();
  const [offerValue, setOfferValue]=useState();
  useEffect(() => {
    if (product.length === 0) {
      productService.getProductById(id).then(function (response) {
        //handle success
        setProduct(response.data);
        productService.getImage(response.data.id,response.data.name).then(function(response2){
          console.log(response2.data)
          setImg(response2.data)
               
      })
      })
        .catch(function (error) {
          //handle error
          console.log(error);
        });
        createHubConnection();
    if (product.length === 0) {
      httpClientService.getOffers(id).then(function (response) {
        //handle success
        setOffer(response.data);
        console.log(response.data)
      })
        .catch(function (error) {
          //handle error
          console.log(error);
        });
    }
    }
  }, []);



  const [hubConnection, setHubConnection] = useState();
  

  const createHubConnection = async () => {
    const connection = new HubConnectionBuilder()

      .withUrl("https://localhost:7140/productshub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .build();

    try {
      await connection.start();
      console.log(connection.connectionId)
      setHubConnection(connection)
    } catch (e) {
      console.log("e", e)
    }
  }
  
  if (hubConnection) {
      
    hubConnection.on("receiveMessage", message => {
      
      setOffer(message)
      
    })
  }


  const handleOffer=()=>{ 
     
      const offerJson ={
        "OfferPrice":offerValue,      
      }
            
      
      httpClientService.putOffer(id,offerJson).then(function (response) {
        //handle success
       
       
      })
        .catch(function (error) {
          //handle error
          console.log(error);
        });;
    
  }

  return (
    <Box sx={{  marginTop:'100px',  display: "flex", justifyContent: "center", alignItems: "center"}}>
    <Card sx={{  border: "solid 2px antiquewhite", maxWidth: "80%", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "450px" }}>
      <CardHeader>
        <Typography variant="body2" color="text.secondary">
          {product.name}
        </Typography>
      </CardHeader>
      <Grid container spacing={2}>
        <Grid item xs={6}>
         {product.name!==undefined? <img style={{ height: "350px" }} src={"https://picsum.photos/400/400"} />:null}
        </Grid>
        <Grid item xs={6} sx={{ ml: "-100px" }}>
          <Typography sx={{ lineHeight: "45px", mt: "20px" }}>Ürün adı: {product.name}</Typography>
          <Typography sx={{ lineHeight: "45px" }}>Kategori: {product.categoryName}</Typography>
          <Typography sx={{ lineHeight: "45px" }}>Açıklama: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quasi, dicta optio odit reiciendis in suscipit sequi qui possimus eaque quas sint obcaecati saepe, rerum, officiis vitae corrupti quod sunt?</Typography>
          <Typography sx={{ lineHeight: "45px" }}>Açılış Fiyatı: {product.price}₺</Typography>

          <Link to={`/order/${id}`}
            style={{ textDecoration: 'none' }} >
            {/* <Button variant="outlined" color='inherit'
              sx={{ color: "#5B4342", ml: "19%" }} startIcon={<ShoppingBag />}
              size="large"
            >Sipariş Ver</Button> */}
            
          </Link>
          <TextField type='number' onChange={(e) => {setOfferValue(e.target.value)}} placeholder='Teklif ver'></TextField>
          <Button onClick={()=>handleOffer()} variant="outlined" color='inherit'
              sx={{ color: "blue", ml: "19%" }} startIcon={<Handshake />}
              size="large"
            >Teklif Ver</Button>
            <Typography fontSize={25} fontWeight={"bold"}>Son Teklif</Typography>
            <Typography fontSize={20} color={"blueviolet"}>{offer? "$"+offer.offerPrice : "Teklif Burada Gözükecektir"}</Typography>
        </Grid>
      </Grid>
    </Card>
    </Box>
  )
}

export default ProductDetail
