import { Button, FormGroup,  FormLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import categoryService from '../../../services/category-services/category-service';
import productService from '../../../services/product-services/product-service';

const UpdateProduct = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const [category,setCategory]=useState([]);
  
  const [age, setAge] = useState(0);

  useEffect(() => {

    categoryService.getAllCategories().then(function (response) {
      //handle success
      setCategory(response.data);
      console.log(response.data)
    })
      .catch(function (error) {
        //handle error
        console.log(error);
      });

  }, []);

  useEffect(() => {

    productService.getProductById(id).then(function (response) {
      //handle success
      setProduct(response.data);
      setAge(response.data.categoryId)
      
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
      "Name": formData.get("name"),
      "Price": parseInt(formData.get("price")),
      "CategoryId": parseInt(formData.get("categoryId")),
      "Stock": parseInt(formData.get("stock"))
    }
    console.log(data)

    productService.updateProduct(data).then(function (response) {
      //handle success
      console.log(response);
      navigate("/admin/ListProducts")
    })
      .catch(function (error) {
        //handle error
        console.log(error);
      });
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      {product.id===undefined?null: <Box component={"form"} onSubmit={handleSubmit} sx={{
        marginTop: 3, 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>        
        <FormGroup sx={{ width: '50%' }}>
          <FormLabel id='id'>Ürün ID</FormLabel>
          <TextField name='id' type="input" defaultValue={id} disabled={true}></TextField>

          <FormLabel id='name'>Ürün Adı</FormLabel>
          <TextField name='name' defaultValue={product.name} type="input" placeholder={'Ürün adı giriniz...'}></TextField>
          <br />
          <FormLabel id='category' >Kategori</FormLabel>
          
            <Select aria-labelledby='category'
              labelId="category"
              id="categoryId"
              name='categoryId'
              value={age}
              label="Kategori"
              onChange={handleChange}>                                
              {category.map((category) => (
                <MenuItem value={category.id} >
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
         
          <FormLabel id='price'>Fiyat</FormLabel>
          <TextField name='price' defaultValue={product.price} type="input" placeholder='Ürün Fiyat giriniz...'></TextField>

          <FormLabel id='stock'>Stok</FormLabel>
          <TextField name='stock' defaultValue={product.stock} type="input" placeholder='Ürün Stok giriniz...'></TextField>
          <br />
          <Button type='submit' color='warning' variant='contained'>Güncelle</Button>
        </FormGroup>
      </Box>}
    </>
  )
}

export default UpdateProduct