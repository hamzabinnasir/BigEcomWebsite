import "./productGallery.css"
import React, { useContext, useEffect, useState } from "react"
import shopContext from "../../context/shopContext.js"
import Product from "../Product/Product.jsx";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from "axios"
import { toast } from "react-toastify"
export default function ProductGallery({ title, topLevelCategory, secondLevelCategory, thirdLevelCategory }) {
    const [filteredCatProducts, setFilteredCatProducts] = useState([]);
    const { backendURL} = useContext(shopContext);

    useEffect(() =>{
        const getFilteredCategoryProducts = async () => {
            let payload = {
                topLevelCategory,
                secondLevelCategory,
                thirdLevelCategory,
            }
            try{
                let resposne = await axios.post(`${backendURL}/api/product/filter`, payload);
            if(resposne.data.success){
                setFilteredCatProducts(resposne.data.findedFilteredProducts);
            }else{
                toast.error(resposne.data.message);
            }
            }catch(error){
                console.log(error);
                toast.error(error.message);
            }
        }
        getFilteredCategoryProducts();
    } , [backendURL, topLevelCategory, secondLevelCategory, thirdLevelCategory]);  
    return (
        <>
            <div className="productGallerySection">
                <h2>{title}</h2>
                <div className="productGalleryContainer">
                    <button className="leftBtn">
                        <ArrowBackIosNewIcon className="arrowLeft" />
                    </button>
                    <button className="leftBtn">
                        <ArrowBackIosNewIcon className="arrowRight" />
                    </button>

                    <div className="productGalleryProductsBox">
                        {
                            filteredCatProducts?.map((item, index) =>
                                <Product key={index} imageUrl={item?.imageUrl} brand={item?.brand} title={item?.title} />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}