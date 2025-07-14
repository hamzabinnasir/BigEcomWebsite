import "./ratePage.css"
import React, { useState, useContext, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import shopContext from "../../context/shopContext.js";
import Header from "../../components/Header/Header.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import StarRating from "../../components/StarRating/StarRating.jsx"
import StatusDate from "../../components/StatusDate/StatusDate.jsx";
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import axios from "axios"
import { toast } from "react-toastify";
export default function RatePage() {
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    const [ratings, setRatings] = useState(0);
    const { backendURL, currency, token } = useContext(shopContext);
    const { productId } = useParams();
    let [orderSinglePro, setOrderSinglePro] = useState("");
    let [oSinRateSum, setOrSinRateSum] = useState(0);
    let [oSinRateAvg, setOSinRateAvg] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const getOrderSingleProduct = async () => {
            try {
                let response = await axios.post(`${backendURL}/api/product/single/`, {productId});
                if (response.data.success) {
                    setOrderSinglePro(response.data.singleProduct);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }

        getOrderSingleProduct();
    }, [backendURL, productId]);


    useEffect(() => {
        if (orderSinglePro && orderSinglePro.ratingsAndReviews && orderSinglePro.ratingsAndReviews.length > 0) {
            let oSiProRaR = 0;
            orderSinglePro.ratingsAndReviews.forEach((ra) => {
                oSiProRaR += ra.ratings;
            })
            setOrSinRateSum(oSiProRaR);
            setOSinRateAvg(oSinRateSum / orderSinglePro.ratingsAndReviews.length);
        }
    }, [orderSinglePro, oSinRateSum]);


    const handleRateProduct = async (e) => {
        e.preventDefault();
        try {
            let payload = {
                title,
                description,
                ratings,
                productId,
            }
            let response = await axios.post(`${backendURL}/api/product/rate`, payload, { headers: { token: token } });
            if (response.data.success) {
                navigate(`/single/${productId}`);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <>
            <div className="ratePage">
                <Header />
                <Navbar />

                <div className="ratePageSection">
                    <div className="ratePageHeader">
                        <h2>Rate & Review Product</h2>
                    </div>

                    <div className="rateProductContainer">
                        {
                            <div className="rateProductImgAndContent">
                                <div className="rateProImgDiv">
                                    <img src={orderSinglePro?.imageUrl} alt="no img" />
                                </div>

                                <div className="ratProContentDiv">
                                    <p className="rateProTitle">{orderSinglePro?.title}</p>
                                    <p className="rateProBrand">{orderSinglePro?.brand}</p>
                                    <p className="rateProPrice">{currency}{orderSinglePro?.price}</p>
                                    {
                                        <p className="rateProSize">
                                            Size:
                                            {
                                                orderSinglePro?.size?.map((sizeItem, index) =>
                                                    <span key={index}>{sizeItem.sizeName}</span>
                                                )
                                            }
                                        </p>
                                    }
                                    <p className="rateProColor">
                                        Color:
                                        <span>{orderSinglePro?.color}</span>
                                    </p>

                                    <div className="sinProRatingsDiv">
                                        <div className="ratingsDiv">
                                            <StarRating ratingAvg={oSinRateAvg} />
                                        </div>
                                        <p className="totalRatings"><span>{oSinRateSum}</span> ratings</p>
                                        <p className="totalReviews"><span>{orderSinglePro?.ratingsAndReviews?.length}</span> reviews</p>
                                    </div>

                                    {/* Status Div */}
                                    <StatusDate data={orderSinglePro} type={"RatePage"} status={orderSinglePro?.orderProductStatus}/>
                                </div>
                            </div>
                        }

                        <div className="rateProFormDiv">
                            <form onSubmit={(e) => handleRateProduct(e)} className="rateProForm">
                                <div className="rateProFormRatingsDiv">
                                    <h2>Rate This Product</h2>
                                    {/* <StarRating /> */}
                                    <Rating
                                        name="user-rating"
                                        value={ratings}
                                        onChange={(e) => setRatings(e.target.value)}
                                    />
                                </div>
                                <TextField
                                    label="Title *"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                />
                                <TextField
                                    label="Description *"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                />
                                <button type="submit" id="rateProBtn">Submit Review</button>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}