import { Box } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListCategories from '../components/admin/Category/ListCategories'
import UpdateCategory from '../components/admin/Category/UpdateCategory'
import CreateProduct from '../components/admin/Product/CreateProduct'
import ListProducts from '../components/admin/Product/ListProducts'
import UpdateProduct from '../components/admin/Product/UpdateProduct'
import Order from '../components/Order'
import Product from '../components/Product'
import ProductDetail from '../components/ProductDetail'
import Navbar from './Navbar'
import CreateCategory from '../components/admin/Category/CreateCategory'
import ListOrders from '../components/admin/Order/ListOrders'
import UpdateOrder from '../components/admin/Order/UpdateOrder'
import DeleteProduct from '../components/admin/Product/DeleteProduct'
import DeleteOrder from '../components/admin/Order/DeleteOrder'
import DeleteCategory from '../components/admin/Category/DeleteCategory'
import CreateImage from '../components/CreateImage'
import Register from '../pages/Register'
import Login from '../pages/Login'


const Feed = () => {
  return (
    <Box>
      <Navbar />
      <Box flex={4} p={2} >   
      <Routes>
        <Route path='/' element={<Product />}></Route>
        <Route path='/productdetails/:id/' element={<ProductDetail/>}></Route>
        <Route path='/order/:id' element={<Order/>}></Route>
        <Route path='/admin/ListProducts' element={<ListProducts/>}></Route>
        <Route path='/admin/UpdateProduct/:id' element={<UpdateProduct/>}></Route>
        <Route path='/admin/CreateProduct' element={<CreateProduct/>}></Route>
        <Route path='/admin/ListCategories' element={<ListCategories/>}></Route>
        <Route path='/admin/UpdateCategory/:id' element={<UpdateCategory/>}></Route>
        <Route path='/admin/CreateCategory' element={<CreateCategory/>}></Route>
        <Route path='/admin/ListOrders' element={<ListOrders/>}></Route>
        <Route path='/admin/UpdateOrder/:id' element={<UpdateOrder/>}></Route>
        <Route path='/admin/DeleteProduct/:id' element={<DeleteProduct/>}></Route>
        <Route path='/admin/DeleteOrder/:id' element={<DeleteOrder/>}></Route>
        <Route path='/admin/DeleteCategory/:id' element={<DeleteCategory/>}></Route>
        <Route path='/admin/CreateImage/:id' element={<CreateImage/>}></Route>
        <Route path='/Register' element={<Register/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        </Routes>      
      </Box>
    </Box>
  )
}

export default Feed
