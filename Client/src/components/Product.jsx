import { Favorite, FavoriteBorder, Handshake, ShoppingBag } from '@mui/icons-material'
import { Button, Checkbox, IconButton} from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import productservices from "../services/product-services/product-service"
import { useNavigate } from "react-router-dom";

const Product = () => {
    const navigate = useNavigate();
    var images = [];
    const [img,setImg]=useState([])
    useEffect(() => {
      productservices.getAllProducts().then(function(response){
        console.log(response.data)
        SetProduct(response.data)
        
        response.data.map(img=>{
            productservices.getImage(img.id,img.name).then(function(response2){
                images.push(response2.data)
                setImg(images)           
                          
            })
        })

      }).catch(function(error){
        console.log("deneme");
        navigate("/Login")
       
      })
    
      
    }, [])
    
    console.log(img)
    
   

    const [product,SetProduct]=useState();

    const [Open, SetOpen] = useState(false);
    const handleOpen = () => SetOpen(true);
    const handleClose = () => SetOpen(false);

    const [openProduct, SetOpenProduct] = useState(false);
    const handleOpenProduct = () => SetOpenProduct(true);
    const handleCloseProduct = () => SetOpenProduct(false);
    //https://minieticaretdesign.blob.core.windows.net/${fits.id}-${fits.name.toLowerCase()}/${img[i]}
    return (
        <Box sx={{justifyContent:'center',display:'flex',alignItems:'center',marginTop:'20px'}} >
            {
                 product!==undefined ? product.map((fits,i)=> 

                    <span className="container">
                        <IconButton className="fas fa-download" aria-label="Beğen">
                            <Checkbox icon={<FavoriteBorder fontSize='medium' />} checkedIcon={<Favorite fontSize='medium' sx={{ color: "red" }} />} />
                        </IconButton>
                       
                        <Link to={`/productdetails/${fits.id}`}>  <img width={200} height={200} className='outfits' src={`https://picsum.photos/1400/700`} onClick={handleOpenProduct} />
                        </Link>
                        {images}
                        <Link to={`/productdetails/${fits.id}`}
                        style={{ textDecoration: 'none'}} >
                        { <Button variant="outlined" color='secondary'
                        sx={{ml: "10%",mt:'5%' }} startIcon={<Handshake />}
                        size="large"
                    >Açık Arttırmaya Katıl</Button> }
                        </Link>                        
                    </span>
                ): null
            }
        </Box>
    )
}

export default Product
