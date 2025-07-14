import "./orderDetails.css"
import React, { useContext, useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import shopContext from "../../context/shopContext.js";
import Header from "../../components/Header/Header.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import StarIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/Check';
import { useParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
export default function OrderDetailsProgress() {
    const { orderId } = useParams();
    const [singleOrderDetails, setSingleOrderDetails] = useState([]);
    const { backendURL, setCartQuantity, setTotalPrice, setTotalDiscount, setTotalAmount, totalPrice, totalDiscount, currency, token } = useContext(shopContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getSingleOrderDetails = async () => {
            try {
                let response = await axios.get(`${backendURL}/api/order/single/${orderId}`);
                if (response.data.success) {
                    setSingleOrderDetails(response.data.findedSingleOrder);
                    let cartQuantity = 0;
                    let priceSum = 0;
                    let totalDis = 0;
                    response?.data?.findedSingleOrder?.orderCartProducts?.forEach((cd) => {
                        cartQuantity += cd.quantity;
                        priceSum += cd.cartProducts.price * cd.quantity;
                        totalDis += cd.cartProducts.discountPrice * cd.quantity;
                    })
                    setCartQuantity(cartQuantity);
                    setTotalPrice(priceSum);
                    setTotalDiscount(totalDis);
                    setTotalAmount(totalPrice - totalDiscount);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }

        getSingleOrderDetails();
    }, [backendURL, orderId, setCartQuantity, setTotalAmount, setTotalDiscount, setTotalPrice, totalDiscount, totalPrice, setSingleOrderDetails]);

    const handleCancelOrder = async () => {
        try {
            let payload = {
                orderId,
            }
            let response = await axios.post(`${backendURL}/api/order/cancel`,payload, { headers: { token: token } });
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

    return (
        <>
            <div className="orderDetailsProgressPage">
                <Header />
                <Navbar />
                <div className="orderDetContainer">
                    {
                        <div className="orderUserDetails">
                            <h3 className="ordererName"><span className="ordererFirstName">{singleOrderDetails?.username}</span> <span className="ordererLastName">{singleOrderDetails?.lastName}</span></h3>
                            <p className="ordererAddress">{singleOrderDetails?.address}</p>
                            <h3 className="ordererNumberHead">Phone Number</h3>
                            <p className="ordererAddress">{singleOrderDetails?.phoneNumber}</p>
                        </div>
                    }

                    {/* Order Details Progress */}
                    <div className="singleOrderProgressSection">
                        <div className="singleOrderProgressContainer">
                            <div className="singleProgressWidget">
                                <div className="sinOrdProIcon">
                                    <CheckIcon />
                                </div>
                                <p>Placed Order</p>
                            </div>
                            <div className="singleProgressWidget">
                                <div className="sinOrdProIcon">
                                    <CheckIcon />
                                </div>
                                <p>Order Confirmed</p>
                            </div>
                            <div className="singleProgressWidget">
                                <div className="sinOrdProIcon">
                                    <CheckIcon />
                                </div>
                                <p>Shipped</p>
                            </div>
                            <div className="singleProgressWidget">
                                <div className="sinOrdProIcon">
                                    <CheckIcon />
                                </div>
                                <p>Out For Delivery</p>
                            </div>
                            <div className="singleProgressWidget">
                                <div className="sinOrdProIcon">
                                    <CheckIcon />
                                </div>
                                <p>Delivered</p>
                            </div>
                        </div>


                        <button onClick={handleCancelOrder} id="cancelOrderBtn">Cancel Order</button>
                    </div>


                    <div className="orderDetailsProducts">
                        {
                            singleOrderDetails?.orderCartProducts?.map((item) =>
                                <div key={item._id} className="singOrderDetContainer">
                                    <div className="sinODetImgAndContent">
                                        <div className="sonOrderDetImgDiv">
                                            <img src={item?.cartProducts?.imageUrl} alt="no img" />
                                        </div>

                                        <div className="orDetSizeCol">
                                            <p className="colPara">
                                                Color:
                                                <span>{item?.cartProducts?.color}</span>
                                            </p>

                                            <p className="orDetSizPar">
                                                Size:
                                                <span>{item?.size}</span>
                                            </p>
                                        </div>

                                        <p className="orderDetSeller">
                                            Seller : <span>{item?.cartProducts?.brand}</span>
                                        </p>

                                        <p className="sinOrDetPrice">
                                            {currency}
                                            <span>
                                                {item?.cartProducts?.price}
                                            </span>
                                        </p>
                                    </div>


                                    <div onClick={()=>navigate(`/rate/${item?.cartProducts?._id}`)} className="rateAndReviewBtn">
                                        <StarIcon style={{ color: "#473680" }} />
                                        <p>Rate & Review Product</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}