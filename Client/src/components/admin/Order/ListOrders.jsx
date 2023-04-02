import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom'
import orderService from '../../../services/order-services/order-service';
import { useState } from 'react';

const ListOrders = () => {

  const [order, setOrder] = useState([]);
      
    useEffect(() => {
      if(order.length===0)
      {
        orderService.getAllOrders().then(function (response) {
          //handle success
          setOrder(response.data);
          console.log(response.data)
        })
          .catch(function (error) {
            //handle error
            console.log(error);
          });
      }
    }, [order.length]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'userId', headerName: 'Alıcı Id', width: 70 },
    { field: 'productId', headerName: 'Ürün Id', width: 70 },
    { field: 'name', headerName: 'Ürün Adı', width: 70 },
    { field: 'description', headerName: 'Açıklama', width: 170 },
    { field: 'address', headerName: 'Adres', width: 230 },     
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
            <Link to={`/admin/UpdateOrder/${currentRow.id}`}
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
        rows={order}
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

export default ListOrders