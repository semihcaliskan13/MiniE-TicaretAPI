import { Button, FormGroup, FormLabel, TextField} from '@mui/material';
import { Box} from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import orderService from '../../../services/order-services/order-service';

const UpdateOrder = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [order,setOrder]=useState([]);
  useEffect(() => {

    orderService.updateOrder(id).then(function (response) {
      //handle success
      setOrder(response.data);      
      console.log(response.data)

    })
      .catch(function (error) {
        //handle error
        console.log(error);
      });

  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    var data = {
      "Id": parseInt(id),
      "UserId": formData.get("userId"),   
      "ProductId": formData.get("productId"),   
      "Description": formData.get("description"),   
      "Address": formData.get("address"),   
    }
    console.log(data)

    orderService.updateOrder(data).then(function (response) {
      //handle success
      console.log(response);
      navigate("/admin/ListOrders")
    })
      .catch(function (error) {
        //handle error
        console.log(error);
      });
  };

  return (
    <>
      {order.id===undefined?null: <Box component={"form"} onSubmit={handleSubmit} sx={{
        marginTop: 3, 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        
        <FormGroup sx={{ width: '50%' }}>
          <FormLabel id='id'>Sipariş ID</FormLabel>
          <TextField name='id' type="input" defaultValue={id} disabled={true}></TextField>

          <FormLabel id='userId'>Alıcı</FormLabel>
          <TextField name='userId' defaultValue={order.UserId} type="input" placeholder={'Kategori adı giriniz...'}></TextField>

          <FormLabel id='productId'>Ürün</FormLabel>
          <TextField name='productId' defaultValue={order.ProductId} type="input" placeholder={'Kategori adı giriniz...'}></TextField>

          <FormLabel id='description'>Açıklama</FormLabel>
          <TextField name='description' defaultValue={order.Description} type="input" placeholder={'Kategori adı giriniz...'}></TextField>

          <FormLabel id='address'>Adres</FormLabel>
          <TextField name='address' defaultValue={order.Address} type="input" placeholder={'Kategori adı giriniz...'}></TextField>
          <br />         
          <Button type='submit' color='warning' variant='contained'>Güncelle</Button>
        </FormGroup>
      </Box>}
    </>
  )
}

export default UpdateOrder