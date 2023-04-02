import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Box} from '@mui/system';
import { Link } from 'react-router-dom'
import categoryService from '../../../services/category-services/category-service';
import { useState } from 'react';

const ListCategories = () => {

  const [category, setCategory] = useState([]);
     
    useEffect(() => {
      if(category.length===0)
      {
        categoryService.getAllCategories().then(function (response) {
          //handle success
          setCategory(response.data);
          console.log(response.data)
        })
          .catch(function (error) {
            //handle error
            console.log(error);
          });
      }
    }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'categoryName', headerName: 'Kategori Adı', width: 130 },     
    {
      field: 'edit',
      headerName: 'Edit',
      width: 200,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const currentRow = params.row;
        return (
          <Box >
            <Link to={`/admin/UpdateCategory/${currentRow.id}`}
              style={{ textDecoration: "none" }}>
              <Button variant="contained" color="warning" size="small">Edit</Button>
            </Link>
          </Box>
        )
      },
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 200,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {

        const currentRow = params.row;
        return (
          <Box >
            <Link to={`/admin/Delete/${currentRow.id}`}
              style={{ textDecoration: "none" }}>
              <Button variant="contained" color="secondary" size="small"             
              >Delete</Button>
            </Link>
          </Box>
        )
      },
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={category}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      <Link to={"/admin/CreateCategory"}
        style={{ textDecoration: "none" }}>
        <Button variant='contained' sx={{ backgroundColor: '#00bcd4' }} >KATEGORİ EKLE</Button>
      </Link>
    </div>
  )
}

export default ListCategories