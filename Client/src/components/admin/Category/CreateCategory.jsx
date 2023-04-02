import { Button, FormGroup, FormLabel,TextField } from '@mui/material';
import { Box} from '@mui/system';
import React from 'react'
import { useNavigate} from 'react-router-dom'
import categoryService from '../../../services/category-services/category-service';

const CreateCategory = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        var data = {
            "Id": 0,
            "Name": formData.get("categoryName"),
        }
        console.log(data)

        categoryService.createCategory(data).then(function (response) {
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
            {<Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    marginTop: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>

                <FormGroup sx={{ width: '50%' }} >
                    <FormLabel id='categoryName'>Kategori Adı</FormLabel>
                    <TextField id='categoryName' name='categoryName' type="input" placeholder='Kategori adı giriniz...'></TextField>
                    <br />
                    <Button type='submit' color='pink' variant='contained'>Kaydet</Button>
                </FormGroup>
            </Box>}
        </>
    )
}

export default CreateCategory