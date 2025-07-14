import "./product.css"
import adminContext from "../../context/adminContext";
import React, { useState, useEffect, useContext } from "react"
import Pagination from '@mui/material/Pagination';
import axios from "axios"
import { toast } from "react-toastify";
export default function Product() {
    const { backendURL } = useContext(adminContext);
    let [availability, setAvailability] = useState("");
    let [topLevelCategory, setTopLevelCategory] = useState("");
    let [allFilteredProducts, setAllFilteredProducts] = useState([]);
    let [proPage, setProPage] = useState(1);
    let [proPageData, setProPageData] = useState([]);

    useEffect(() => {
        const handleGetFilteredproducts = async () => {
        setProPage(1);
            try {
                let payload = {
                    topLevelCategory,
                    availability,
                }
                let response = await axios.post(`${backendURL}/api/product/filter`, payload);
                if (response.data.success) {
                    setAllFilteredProducts(response.data.findedFilteredProducts);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }

        handleGetFilteredproducts();
    }, [availability, backendURL, topLevelCategory]);


    const handleDeleteProduct = async (productId) => {
        try {
            let response = await axios.post(`${backendURL}/api/product/delete`, { productId });
            if (response.data.success) {
                toast.success(response.data.message);
                setAllFilteredProducts(response.data.findedFilteredProducts);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    let itemsPerPage = 10;
    let totalPages = Math.ceil(allFilteredProducts?.length / itemsPerPage);

    const handleProPage = (event, value) => {
        setProPage(value);
        let lastIndex = value * itemsPerPage;
        let firstIndex = lastIndex - itemsPerPage;
        setProPageData(allFilteredProducts?.slice(firstIndex, lastIndex));
    }

    useEffect(() => {
        let lastIndex = proPage * itemsPerPage;
        let firstIndex = lastIndex - itemsPerPage;
        setProPageData(allFilteredProducts?.slice(firstIndex, lastIndex));
    }, [allFilteredProducts, itemsPerPage, proPage]);


    useEffect(() =>{
        console.log(proPageData);
    } , [proPageData]);

    const handleSort = (value) => {
        const sorted = [...allFilteredProducts].sort((a, b) =>
            value === "lowToHigh" ? a.price - b.price : b.price - a.price
        );
        setAllFilteredProducts(sorted);
    }

    return (
        <>
            <div className="productPage">
                <div className="productSortDiv">
                    <h2>Sort</h2>
                    <select className="proSelDiv" onChange={(e) => setTopLevelCategory(e.target.value)} id="proCatSor">
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                    </select>
                    <select className="proSelDiv" onChange={(e) => setAvailability(e.target.value)} id="proCatSor">
                        <option value="inStock">In Stock</option>
                        <option value="outOfStock">Out of Stock</option>
                    </select>
                    <select className="proSelDiv" onChange={(e) => handleSort(e.target.value)} id="proCatSor">
                        <option value="lowToHigh">Low to High</option>
                        <option value="highToLow">High to Low</option>
                    </select>
                </div>

                <div className="filterProDataTableAndPagination">
                    <div className="filterOrderDataTable">
                        <h2>All Products</h2>
                        <div className="filterProHeader">
                            <p className="allOrderPageHeaderCol">Image</p>
                            <p className="allOrderPageHeaderCol">Title</p>
                            <p className="allOrderPageHeaderCol">Category</p>
                            <p className="allOrderPageHeaderCol">Price</p>
                            <p className="allOrderPageHeaderCol">Quantity</p>
                            <p className="allOrderPageHeaderCol">Delete</p>
                        </div>
                        <div className="filterProTable">
                            {
                                proPageData.map((product) =>
                                    <div key={product?._id} className="sinGleProductDiv">
                                        <div className="sinProImgDiv">
                                            <img src={product.imageUrl} alt="no img" />
                                        </div>
                                        <div className="sinProTitleDiv">
                                            <p>{product?.title}</p>
                                        </div>
                                        <div className="sinProCateDiv">
                                            <p>{product?.topLevelCategory}</p>
                                            <span>_</span>
                                            <p>{product?.thirdLevelCategory}</p>
                                        </div>
                                        <div className="sinProPriceDiv">
                                            <p>{product?.price}</p>
                                        </div>
                                        <div className="sinProQuantDiv">
                                            <p>{product?.quantity}</p>
                                        </div>
                                        <div className="sinProDelBtnDiv">
                                            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="filterProPagDiv">
                        <Pagination onChange={handleProPage} count={totalPages} color="primary" />
                    </div>
                </div>
            </div>
        </>
    )
}