import "./addProduct.css"
import adminContext from "../../context/adminContext.js"
import React, { useState, useContext, useEffect } from "react"
import { Select, TextField, FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { toast } from "react-toastify"
import axios from "axios"
export default function AddProduct() {
    const { backendURL } = useContext(adminContext);
    let [imageUrl, setImageUrl] = useState("");
    let [brand, setBrand] = useState("");
    let [title, setTitle] = useState("");
    let [color, setColor] = useState("");
    let [quantity, setQuantity] = useState(null);
    let [price, setPrice] = useState(null);
    let [discountPrice, setDiscountPrice] = useState(null);
    let [discountPercentage, setDiscountPercentage] = useState(null);
    let [description, setDescription] = useState("");
    let [topLevelCategory, setTopLevelCategory] = useState("");
    let [secondLevelCategory, setSecondLevelCategory] = useState("");
    let [thirdLevelCategory, setThirdLevelCategory] = useState("");
    let [size, setSize] = useState([
        {
            sizeName: "",
            sizeQuantity: null,
        },
        {
            sizeName: "",
            sizeQuantity: null,
        },
        {
            sizeName: "",
            sizeQuantity: null,
        },
    ]);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            let payload = {
                imageUrl,
                brand,
                title,
                color,
                quantity,
                price,
                discountPrice,
                discountPercentage,
                description,
                size,
                topLevelCategory,
                secondLevelCategory,
                thirdLevelCategory,
            }
            let response = await axios.post(`${backendURL}/api/product/create`, payload);
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }


    const handleSize = (event, index) => {
        let { name, value } = event.target;
        let updatedSizes = [...size];
    
        if (name === "sizeQuantity") {
            const numericValue = Number(value);
            updatedSizes[index][name] = numericValue === 0 ? null : numericValue;
        } else {
            updatedSizes[index][name] = value;
        }
    
        setSize(updatedSizes);
    };
    

    useEffect(() => {
        console.log(size);
    }, [size]);

    return (
        <>
            <div className="addProductPage">
                <h1>Add New Product</h1>
                <form onSubmit={(e) => handleAddProduct(e)} id="addProductForm">
                    <TextField
                        label="Image URL"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setImageUrl(e.target.value)}
                        value={imageUrl}
                    />

                    <div className="addProducInptFieldDiv">
                        <TextField
                            label="Brand"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setBrand(e.target.value)}
                            value={brand}
                        />
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>
                    <div className="addProducInptFieldDiv">
                        <TextField
                            label="Color"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setColor(e.target.value)}
                            value={color}
                        />
                        <TextField
                            label="Quantity"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setQuantity(e.target.value)}
                            value={quantity}
                            type="number"
                        />
                    </div>
                    <div className="addProductThreeFieldsDiv">
                        <TextField
                            label="Price"
                            variant="outlined"
                            type="number"
                            fullWidth
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                        />
                        <TextField
                            label="Discount Price"
                            variant="outlined"
                            type="number"
                            fullWidth
                            onChange={(e) => setDiscountPrice(e.target.value)}
                            value={discountPrice}
                        />
                        <TextField
                            label="Discount Percentage"
                            variant="outlined"
                            type="number"
                            fullWidth
                            onChange={(e) => setDiscountPercentage(e.target.value)}
                            value={discountPercentage}
                        />
                    </div>
                    <div className="addProductSelectFieldDiv">
                        <FormControl fullWidth>
                            <InputLabel id="tier-category-label">Top Level Category</InputLabel>
                            <Select
                                labelId="tier-category-label"
                                label="Top Level Category"
                                onChange={(e) => setTopLevelCategory(e.target.value)}
                            >
                                <MenuItem value="men">Men</MenuItem>
                                <MenuItem value="women">Women</MenuItem>
                                <MenuItem value="kids">Kids</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="secLevelCatLab">Second Level Category</InputLabel>
                            <Select
                                labelId="secLevelCatLab"
                                value={secondLevelCategory}
                                onChange={(e) => setSecondLevelCategory(e.target.value)}
                                displayEmpty
                                label="Second Level Category"
                                inputProps={{ 'aria-label': 'Order status filter' }}
                                sx={{
                                    minWidth: 180,
                                    backgroundColor: 'background.paper',
                                    borderRadius: 1,
                                    '& .MuiSelect-select': {
                                        padding: '8px 12px'
                                    }
                                }}
                            >
                                <MenuItem value="clothing">Clothing</MenuItem>
                                <MenuItem value="accessories">Accessories</MenuItem>
                                <MenuItem value="brands">Brands</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="thirdLevelCatLabel">Third Level Category</InputLabel>
                            <Select
                                labelId="thirdLevelCatLabel"
                                value={thirdLevelCategory}
                                onChange={(e) => setThirdLevelCategory(e.target.value)}
                                label="Third level Category"
                                displayEmpty
                                inputProps={{ 'aria-label': 'Order status filter' }}
                                sx={{
                                    minWidth: 180,
                                    backgroundColor: 'background.paper',
                                    borderRadius: 1,
                                    '& .MuiSelect-select': {
                                        padding: '8px 12px'
                                    }
                                }}
                            >
                                <MenuItem value="tops">Tops</MenuItem>
                                <MenuItem value="dress">Dresses</MenuItem>
                                <MenuItem value="tShirts">T-Shirts</MenuItem>
                                <MenuItem value="sarees">Saree</MenuItem>
                                <MenuItem value="lenghaCholi">Lengha Chloi</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <TextField
                        label="Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    {
                        size.map((sizeItem, index) =>
                            <div key={index} className="addProducInptFieldDiv">
                                <TextField
                                    label="Size Name *"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => handleSize(e, index)}
                                    value={sizeItem.sizeName}
                                    name="sizeName"
                                />
                                <TextField
                                    label="Quantity *"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => handleSize(e, index)}
                                    value={sizeItem.sizeQuantity}
                                    name="sizeQuantity"
                                />
                            </div>
                        )
                    }
                    <button type="submit" className="addNewBtn">Add New Product</button>
                </form >
            </div >
        </>
    )
}