import { Button, CardContent, CardHeader, Container, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import m1 from "../images/m1.webp"

const AddModal = () => {

    const outfits = [
        {
            id: 1,
            img: m1,
            price: 450
        },
    ];

    return (
        <Container sx={{
            backgroundColor: "white",
            
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', borderRadius: 4
        }} component="main" maxWidth="md" >
            <CardHeader
                title="Alışveriş"
            />
            <CardContent sx={{ width: "75%" }}>
                <Grid container spacing={2}>
                    {
                        outfits.map(fits => (
                            <>
                                <Grid xs={6} sx={{ mb: 2 }}>
                                    <img src={fits.img} style={{ width: "38%" }} />
                                </Grid>
                                <Grid xs={6}>
                                    <div style={{ marginLeft: "-58%", fontSize: "14px", marginTop: 5, lineHeight: "30px" }}>Ürün Adı: Mont</div>
                                    <div style={{ marginLeft: "-58%", fontSize: "14px", marginTop: 5, lineHeight: "30px" }}>Kategori: Giyim</div>
                                    <div style={{ marginLeft: "-58%", fontSize: "14px", marginTop: 5, lineHeight: "30px" }}>Marka: Başka</div>
                                    <div style={{ marginLeft: "-58%", fontSize: "14px", marginTop: 5, lineHeight: "30px" }}>Fiyat: {fits.price} TL</div>
                                </Grid>
                            </>
                        ))
                    }
                </Grid>
                <Divider sx={{ margin: 5 }} />
                <Typography>Toplam Tutar: {outfits[0].price}</Typography>
            
                <Button
                    sx={{ bgcolor: "#523A28", ml: "19%", float: 'right'}}size="large"
                >
                    <Typography color="white">satın al</Typography>
                </Button>

                 <Button
                    sx={{ bgcolor: "#AB6B51", ml: "19%", float: 'right' }}size="large"
                >
                    <Typography color="white">vazgeç</Typography>
                </Button>

            </CardContent>
        </Container>
    )
}
export default AddModal
