import { Button, FormGroup, FormLabel, TextField } from '@mui/material';
import { Box} from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import categoryService from '../../../services/category-services/category-service';

const UpdateCategory = () => {
  let { id } = useParams();
  const navigate = useNavigate(); 

  const [category,setCategory]=useState([]);
  useEffect(() => {

    categoryService.getCategoryById(id).then(function (response) {
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
      "Id": parseInt(id),
      "Name": formData.get("categoryName"),     
    }
    console.log(data)

    categoryService.updateCategory(data).then(function (response) {
      //handle success
      console.log(response);
      navigate("/admin/ListCategories")
    })
      .catch(function (error) {
        //handle error
        console.log(error);
      });
  };

  return (
    <>
      {category.id===undefined?null: <Box component={"form"} onSubmit={handleSubmit} sx={{
        marginTop: 3, 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        
        <FormGroup sx={{ width: '50%' }}>
          <FormLabel id='id'>Kategori ID</FormLabel>
          <TextField name='id' type="input" defaultValue={id} disabled={true}></TextField>

          <FormLabel id='categoryName'>Kategori Adı</FormLabel>
          <TextField name='categoryName' defaultValue={category.categoryName} type="input" placeholder={'Kategori adı giriniz...'}></TextField>
          <br />         
          <Button type='submit' color='warning' variant='contained'>Güncelle</Button>
        </FormGroup>
      </Box>}
    </>
  )
}

export default UpdateCategory