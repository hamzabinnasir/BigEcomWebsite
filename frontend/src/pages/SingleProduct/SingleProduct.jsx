import "./singleProduct.css"
import shopContext from "../../context/shopContext.js"
import React, { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header.jsx"
import Navbar from "../../components/Navbar/Navbar.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import Product from "../../components/Product/Product.jsx"
import RatingBars from "../../components/RatingBars/RatingBars.jsx"
import StarRating from "../../components/StarRating/StarRating.jsx"
import { thirdLevelCategoryData } from "./singleProductData.js"
import axios from "axios"
import { toast } from "react-toastify"
export default function SingleProduct() {
    const { productId } = useParams();
    const { backendURL, currency, setCartQuantity, userAllCartItems, setUserAllCartItems, setTotalPrice, setTotalDiscount, totalPrice, totalDiscount, setTotalAmount, token } = useContext(shopContext)
    const [singleProduct, setSingleProduct] = useState("");
    const navigate = useNavigate();
    let [size, setSize] = useState();
    let [allThreeCatArr, setAllThreeCatArr] = useState([]);
    let [secondLvlCatProArr, setSecondLvlCatProArr] = useState([]);
    let [thrdLvlCatData, setThrdLvlCatData] = useState([]);
    let [barData, setBarData] = useState([]);
    let [totalReviews, setTotalReviews] = useState(0);
    let [ratingAvg, setRatingAvg] = useState(0);
    let [rateSum, setRateSum] = useState(0);
    let [allUsersRatingsData, setAllUsersRatingsData] = useState([]);

    useEffect(() => {
        const getSingleProduct = async () => {
            try {
                let payload = {
                    topLevelCategory: singleProduct.topLevelCategory,
                    secondLevelCategory: singleProduct.secondLevelCategory,
                    thirdLevelCategory: singleProduct.thirdLevelCategory,
                    productId,
                };
                let response = await axios.post(`${backendURL}/api/product/single`, payload);
                if (response.data.success) {
                    setSingleProduct(response.data.singleProduct);
                    setAllThreeCatArr(response?.data?.findedFilteredProducts.slice(0,4));
                    setSecondLvlCatProArr(response?.data?.findedFilteredProducts?.filter((product) => product.secondLevelCategory === singleProduct.secondLevelCategory));
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }

        getSingleProduct();

    }, [productId, backendURL, singleProduct.quantity, singleProduct?.secondLevelCategory, singleProduct?.thirdLevelCategory, singleProduct?.topLevelCategory]);

    
    const handleAddToCart = async () => {
        let addToCartPayLoad = {
            productId,
            quantity: 1,
            size,
        }
        try {
            let response = await axios.post(`${backendURL}/api/cart/addToCart` ,addToCartPayLoad, { headers: { token: token } });
            if (response.data.success) {
                let cartQuantity = 0;
                let priceSum = 0;
                let totalDis = 0;
                setUserAllCartItems(response?.data?.findedUserCartData?.cartData);
                userAllCartItems?.forEach((cd) => {
                    cartQuantity += cd.quantity;
                    priceSum += cd.cartProducts.price * cd.quantity;
                    totalDis += cd.cartProducts.discountPrice * cd.quantity;
                })
                setCartQuantity(cartQuantity);
                setTotalPrice(priceSum);
                setTotalDiscount(totalDis);
                setTotalAmount(totalPrice - totalDiscount);
                navigate("/cart");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (singleProduct) {
            if (singleProduct.ratingsAndReviews?.length > 0) {
                let sum = 0;
                let excProArr = [];
                let veryGoodProArr = [];
                let goodProArr = [];
                let avgProArr = [];
                let poorProArr = [];

                singleProduct.ratingsAndReviews.forEach((review) => {
                    sum += review.ratings;
                    switch (review.ratings) {
                        case 5: excProArr.push(review); break;
                        case 4: veryGoodProArr.push(review); break;
                        case 3: goodProArr.push(review); break;
                        case 2: avgProArr.push(review); break;
                        case 1: poorProArr.push(review); break;
                        default: break;
                    }
                });

                setRateSum(sum);
                setRatingAvg(sum / singleProduct.ratingsAndReviews.length);
                setTotalReviews(singleProduct.ratingsAndReviews.length);
                setBarData([
                    { label: 'Excellent', value: excProArr.length, color: '#4caf50' },
                    { label: 'Very Good', value: veryGoodProArr.length, color: '#2e7d32' },
                    { label: 'Good', value: goodProArr.length, color: '#ffeb3b' },
                    { label: 'Average', value: avgProArr.length, color: '#8d6e63' },
                    { label: 'Poor', value: poorProArr.length, color: '#f44336' }
                ]);
            }
        }
    }, [singleProduct]);

    useEffect(() => {
        if (thirdLevelCategoryData) {
            setThrdLvlCatData(thirdLevelCategoryData.filter((item) => item.thirdLevelCategory === singleProduct.thirdLevelCategory));
        }
    }, [singleProduct.thirdLevelCategory]);


    useEffect(() =>{
        const getAllUsersRatingsAndReviews = async () =>{
            try{
                let response = await axios.get(`${backendURL}/api/product/allUserRatings`);
            if(response.data.success){
                setAllUsersRatingsData(response.data.allUsersRatingsDetails);
            }else{
                toast.error(response.data.message);
            }
            }catch(error){
                console.log(error);
                toast.error(error.message);
            }
        }

        getAllUsersRatingsAndReviews();
    } , [backendURL]);


    useEffect(() =>{
        console.log(allUsersRatingsData);
    } , [allUsersRatingsData]);

    return (
        <>
            <div className="singleProductSection">
                <Header />
                <Navbar />
                <div className="singProCatSec">
                    <p className="tlCat">{singleProduct.topLevelCategory}</p>
                    <p className="slCat">{singleProduct.secondLevelCategory}</p>
                    <p>{singleProduct.thirdLevelCategory}</p>
                </div>

                <div className="singleProductDetails">
                    <div className="singleImgBox">
                        <div className="sinMainImg">
                            <img src={singleProduct.imageUrl} alt="no img" />
                        </div>

                        <div className="sinProImgGrid">
                            {
                                allThreeCatArr.map((item, index) =>
                                    <img key={index} src={item.imageUrl} alt="no img" />
                                )
                            }
                        </div>
                    </div>

                    <div className="singleProductContent">
                        <h3 className="sinProBrand">{singleProduct.brand}</h3>
                        <p className="sinProTitle">{singleProduct.title}</p>

                        <div className="singlePriceDetails">
                            <p className="sinProPrice">{currency}{singleProduct.discountPrice}</p>
                            <p className="sinProDisPrice">{currency}{singleProduct.price}</p>
                            <p className="sinProDisPercentage">{singleProduct.discountPercentage}%Off</p>
                        </div>

                        <div className="sinProRatingsDiv">
                            <div className="ratingsDiv">
                                <StarRating ratingAvg={ratingAvg} />
                            </div>
                            <p className="totalRatings"><span>{rateSum}</span> ratings</p>
                            <p className="totalReviews"><span>{totalReviews}</span> reviews</p>
                        </div>

                        <div className="sinProSizesDetails">
                            <p>size</p>
                            <div className="sinPrSizeDiv">
                                {
                                    singleProduct?.size?.map((sizeItem, index) =>
                                        <button onClick={() => setSize(sizeItem.sizeName)} key={index} className={sizeItem.sizeName === size ? "sinProSizeBtn highlight" : "sinProSizeBtn"}>{sizeItem.sizeName}</button>
                                    )
                                }
                            </div>

                            <button onClick={() => handleAddToCart()} id="sinProAddToCartBtn">Add To Cart</button>

                            <p className="sinProCatDes">{singleProduct.description}</p>
                        </div>

                        <div className="highlightsAndDetails">
                            <ul className="highLightsUl">
                                <li>Hand out and sewn locally</li>
                                <li>Dyed with our proprietary colors</li>
                                <li>Pre-washed & Pre-Shrunk</li>
                                <li>Ultra-soft 100% cotton</li>
                            </ul>

                            <div className="detailsDiv">
                                <h4>Details</h4>
                                {
                                    thrdLvlCatData?.map((item, index) =>
                                        <p key={index} className="thirdLvlCatDetailsPara">{item.details}</p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* Recent Review and Ratings */}
                <div className="ratingsAndReviewsDiv">
                    <h2>Recent Review & Ratings</h2>
                    <div className="ratingsSummaryAndUserRatings">
                        {/* Recent Reviews and ratings data */}
                        <div className="recentUserRatingsContainer">
                                {
                                    allUsersRatingsData?.map((ratingData) =>{
                                        return ratingData?.productRatingsDetails?.map((item) =>
                                            <div key={item._id} className="sinRatDetDiv">
                                            {
                                                ratingData?.profilePic === ""?
                                                <div className="profilePic">
                                                    <p>{ratingData?.username?.charAt(0).toUpperCase()}</p>
                                                </div>
                                                :
                                                <div className="allUserRatProPic">
                                                    <img src={ratingData?.profilePic} alt="no img" />
                                                </div>
                                            }
                                            <div className="allUserRatContent">
                                                <p className="sinUserRatName">
                                                    {ratingData?.username}
                                                </p>
                                                <p className="sinUserRateDate">
                                                    {new Date(ratingData?.createdAt).toDateString()}
                                                </p>
                                                 <StarRating ratingAvg={item?.ratings} />
                                                 <p className="sinProSinReview">{item?.description}</p>
                                            </div>
                                        </div>
                                        )
                                    })
                                }
                        </div>

                        <div className="productRatingsContainer">
                            <div className="productRatingsBox">
                                <div className="productRatingsSec">
                                    <h3>Product ratings</h3>
                                    <div className="startsPlusRatings">
                                        <div className="starsDiv">
                                            <StarRating ratingAvg={ratingAvg} />
                                        </div>
                                        <p className="totalRatings"><span>{rateSum}</span> ratings</p>
                                    </div>

                                    <div className="mUiProgressBars">
                                        <RatingBars barData={barData} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Second Level Category Products */}
                <div className="secLvlCatProContainer">
                    <h2>Similar Products</h2>
                    {
                        secondLvlCatProArr.map((secLvlCatPro) =>
                            <Product key={secLvlCatPro._id} productId={secLvlCatPro._id} imageUrl={secLvlCatPro.imageUrl} title={secLvlCatPro.title} brand={secLvlCatPro.brand} />
                        )
                    }
                </div>

                <Footer />
            </div>
        </>
    )
}