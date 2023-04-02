import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, styled, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { AcUnit} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import httpClientService from '../services/http-client-service'

const Navbar = () => {

  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
  });

  const Icons = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "20px",
  }));

  const [open, setOpen] = useState(false);
  const handleSingOut=()=>{
    httpClientService.SignOut();
    window.location.replace('http://localhost:3000/Login');
  }
  return (
    <AppBar position='sticky' sx={{ bgcolor: "#CFA084" }}>
      <StyledToolbar>
        <Link to="/" style={{ textDecoration: 'none' }}><Typography variant='h6'
          sx={{ color: "white", display: { xs: "none", sm: "block" } }}>
          MİNİ
        </Typography></Link>
        <AcUnit fontSize='medium' sx={{ color: "#75E6DA", display: { xs: "block", sm: "none" } }} />

        <Icons sx={{ display: { xs: "none", sm: "flex" } }}>
          <Link style={{textDecoration:'none'}} to="/Register"><Button>Üye Ol</Button></Link>


          <Link style={{textDecoration:'none'}} to="/Login" ><Button>Giriş Yap</Button></Link>
          <Button onClick={()=>handleSingOut()}  >Çıkış Yap</Button>


          <Link style={{textDecoration:'none'}} to={"/admin/ListProducts"}>
          <IconButton  sx={{color:'black'}}><AdminPanelSettingsIcon/>  </IconButton>
          </Link>

          
        </Icons>       
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={e => (setOpen(false))}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Link to="profile" style={{ textDecoration: 'none' }}>
          <MenuItem> Profile</MenuItem>
        </Link>

        <MenuItem> My account</MenuItem>
        <MenuItem> Logout</MenuItem>
      </Menu>
    </AppBar>
  )
}

export default Navbar