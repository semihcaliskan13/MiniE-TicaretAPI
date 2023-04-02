import React, { useState } from 'react'
import { Button } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import productService from '../services/product-services/product-service';

const CreateImage = () => {
    const [file, setFile] = useState([]);
    const [imgData, setImgData] = useState(null);

    let { id } = useParams();
    const location = useLocation();
    const { productName } = location.state;

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    if (file.length === 0) {

    }
    else {
        productService.createImage(file, id, productName).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error)
        })
    }

    return (
        <div>
            <label htmlFor="btn-upload">
                <input
                    id="btn-upload"
                    name="btn-upload"
                    style={{ display: 'none' }}
                    type="file"
                    onChange={handleFileChange} />
                <Button
                    className="btn-choose"
                    variant="outlined"
                    component="span" >
                    Resim Seç
                </Button>
            </label>
            <div className="file-name">
                {file && `${file.name}`}
            </div>
            <img src={imgData} style={{width:"30%"}}></img>
        </div>
    )
}

export default CreateImage