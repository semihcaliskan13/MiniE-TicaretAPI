import React from 'react'
import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon, IconButton, Tooltip, Fab, Modal } from '@mui/material'
import { Add, Audiotrack, ExpandLess, FormatQuote, Movie, Person } from '@mui/icons-material';
import { Link } from "react-router-dom";
import AddModal from '../components/AddModal';
import { useState } from 'react';

const Sidebar = () => {

  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <Box flex={2} p={0} sx={{ display: { xs: "none", sm: "block" }, marginTop: "16px" }}>
      <Box bgcolor="#82929A" position="fixed" sx={{ borderRadius: "6px", width: "280px" }} >
        <IconButton >
          <ExpandLess color='navyBlue'></ExpandLess>
        </IconButton>
        <List>
          <ListItem disablePadding>
            <Link to="movies" style={{ textDecoration: 'none' }}>
              <ListItemButton>
                <ListItemIcon >
                  <Movie color='cyan' />
                </ListItemIcon>
                <ListItemText primary="Filmler" />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Audiotrack color='sky' />
              </ListItemIcon>
              <ListItemText primary="Müzikler" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FormatQuote color='blue' />
              </ListItemIcon>
              <ListItemText primary="Alıntılar" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Person color='indigo' />
              </ListItemIcon>
              <ListItemText primary="Yönetmenler" />
            </ListItemButton>
          </ListItem>

        </List>
      </Box>
      <Box position="fixed" sx={{ justifyContent: "center", alignItems: "center", mt: "35%", ml: "6%" }}>
        <Tooltip title="Ekle" onClick={e => setOpenAddModal(true)}>
          <Fab color="blueGreen" aria-label="add" >
            <Add />
          </Fab>
        </Tooltip>
        <Modal
          open={openAddModal}
          onClose={e => setOpenAddModal(false)}
        >
          <AddModal />
        </Modal>
      </Box>
    </Box>
  )
}

export default Sidebar
