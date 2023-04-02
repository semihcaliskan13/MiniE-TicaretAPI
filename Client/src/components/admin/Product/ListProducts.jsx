import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom'
import productService from '../../../services/product-services/product-service';
import { useState } from 'react';
import { ImageOutlined, Message } from '@mui/icons-material';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

const ListProducts = () => {
  const [product, setProduct] = useState([]);
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
  useEffect(() => {
    createHubConnection();
    if (product.length === 0) {
      productService.getAllProducts().then(function (response) {
        //handle success
        setProduct(response.data);
      })
        .catch(function (error) {
          //handle error
          console.log(error);
        });
    }
    
  }, []);
  if (hubConnection) {
      
    hubConnection.on("receiveMessage", message => {
      console.log(message)
      setProduct(message)
      
    })
  }


  const columns = [
    { field: 'id',  width: 70 },
    { field: 'name', headerName: 'Ürün Adı', width: 130 },
    { field: 'categoryName', headerName: 'Kategori', width: 130 },
    {
      field: 'price',
      headerName: 'Ürün Fiyatı',
      type: 'number',
      width: 90,
    },

    {
      field: 'stock',
      headerName: 'Stok Bilgisi',
      //description: 'This column has a value getter and is not sortable.',
      //sortable: false,
      width: 160,
      type: 'number',
      //valueGetter: (params) =>
      //`${params.row.productName || ''} ${params.row.categoryName || ''}`,
    },
    {
      field: 'image',
      headerName: 'Resim Ekle',
      width: 200,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const currentRow = params.row;
        return (
          <Box >
            <Link to={`/admin/CreateImage/${currentRow.id}`}
              state={{ productName: currentRow.name }}
              style={{ textDecoration: "none" }}>
              <IconButton color="error" size="small"><ImageOutlined
              /></IconButton>
            </Link>
          </Box>
        )
      },
    },
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
            <Link to={`/admin/UpdateProduct/${currentRow.id}`}
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
            <Link to={`/admin/DeleteProduct/${currentRow.id}`}
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
        rows={product}
        getRowId={(row)=>row.id}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      <Link to={"/admin/CreateProduct"}
        style={{ textDecoration: "none" }}>
        <Button variant='contained' sx={{ backgroundColor: '#00bcd4' }} >ÜRÜN EKLE</Button>
      </Link>
    </div>
  )
}

export default ListProducts