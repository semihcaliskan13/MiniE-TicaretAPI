import { Button,FormGroup, FormLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box} from '@mui/system';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom'
import categoryService from '../../../services/category-services/category-service';
import productService from '../../../services/product-services/product-service';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    var data = {
      "Id": 0,
      "Name": formData.get("name"),
      "Price": parseInt(formData.get("price")),
      "CategoryId": parseInt(formData.get("category")),
      "Stock": parseInt(formData.get("stock"))

    }
    console.log(data)   
    productService.createProduct(data).then(function (response) {
      //handle success
      console.log(response);
      navigate("/admin/ListProducts")
    })
      .catch(function (error) {
        //handle error
        console.log(error);
      });
  };

  const [age, setAge] = useState(1);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Box>
      {//category.length===0?null:
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
          <FormLabel id='name'>Ürün Adı</FormLabel>
          <TextField id='name' name='name' type="input" placeholder='Ürün adı giriniz...'></TextField>
          <br />
          <FormLabel id='category' >Kategori</FormLabel>

          <Select aria-labelledby='category'
            labelId="category"
            id="category"
            name='category'
            value={age}
            label="Kategori"

            onChange={handleChange}>
            {category.map((category) => (
              <MenuItem value={category.id} >
                {category.categoryName}
              </MenuItem>
            ))}         
          </Select>

          <FormLabel id='name'>Fiyat</FormLabel>
          <TextField id='price' name='price' type="input" placeholder='Ürün Fiyat giriniz...'></TextField>

          <FormLabel id='name'>Stok</FormLabel>
          <TextField id='stock' name='stock' type="input" placeholder='Ürün Stok giriniz...'></TextField>
          <br />
          <Box>

          <Button style={{float:'right',width:'100px'}} type='submit' color='pink' variant='contained'>Kaydet</Button>
          </Box>
        </FormGroup>
      </Box>}
      </Box>
  )
}

export default CreateProduct