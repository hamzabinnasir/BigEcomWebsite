import "./orderSummary.css"
import shopContext from "../../context/shopContext.js"
import React, { useContext, useState, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import Header from "../../components/Header/Header.jsx"
import Navbar from "../../components/Navbar/Navbar.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import Progress from "../../components/Progress/Progress.jsx"
import { toast } from "react-toastify"
import axios from "axios"
export default function OrderSummary() {
    const { backendURL, setCartQuantity, setTotalPrice, setTotalDiscount, totalPrice, totalDiscount, setTotalAmount, currency, totalCartItems, totalAmount, isOrderSummary, isLogin, isPayment, isDeliveryAddress, setLocation } = useContext(shopContext);
    const [singleOrder, setSingleOrder] = useState(null);
    const [singleOrderCartProducts, setSingleOrderCartProducts] = useState([]);
    let { orderId } = useParams();
    const navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        const getSingleOrder = async () => {
            try {
                let response = await axios.get(`${backendURL}/api/order/single/${orderId}`);
                if (response.data.success) {
                    setSingleOrder(response.data.findedSingleOrder);
                    let cartQuantity = 0;
                    let priceSum = 0;
                    let totalDis = 0;
                    setSingleOrderCartProducts(response?.data?.findedSingleOrder?.orderCartProducts);
                    singleOrderCartProducts?.forEach((cd) => {
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

        getSingleOrder();
    }, [backendURL, orderId, setCartQuantity, setTotalAmount, setTotalDiscount, setTotalPrice, singleOrderCartProducts, totalDiscount, totalPrice]);


    useEffect(() => {
        setLocation(location.pathname);
    }, [location.pathname, setLocation]);

    return (
        <>
            <div className="orderDetailsPage">
                <Header />
                <Navbar />
                <div className="orderDetailsSection">
                    <Progress isDeliveryAddress={isDeliveryAddress} isLogin={isLogin} isPayment={isPayment} isOrderSummary={isOrderSummary} />

                    <button onClick={() => navigate("/checkout")} className="backBtn">Back</button>
                    <div className="orderDetailsContainer">
                        {
                            <div className="orderUserDetails">
                                <h3 className="ordererName"><span className="ordererFirstName">{singleOrder?.username}</span> <span className="ordererLastName">{singleOrder?.lastName}</span></h3>
                                <p className="ordererAddress">{singleOrder?.address}</p>
                                <h3 className="ordererNumberHead">Phone Number</h3>
                                <p className="ordererAddress">{singleOrder?.phoneNumber}</p>
                            </div>
                        }
                        <div className="userAllOrdersDataAndSummary">
                            <div className="userAllOrdersData">
                                {
                                    singleOrderCartProducts.map((singleOrderProducts) =>
                                        <div key={singleOrderProducts._id} className="singleOrderCartProduct">
                                            <div className="sinOrdCarProImg">
                                                <img src={singleOrderProducts?.cartProducts?.imageUrl} alt="no img" />
                                            </div>

                                            <div className="sinOrderProductContent">
                                                <h3 className="sinOrderProName">{singleOrderProducts?.cartProducts?.title}</h3>

                                                <div className="sinOrderSizeAndColor">
                                                    <p>Size:</p>
                                                    <span>{singleOrderProducts?.size}</span>
                                                    <p>{singleOrderProducts?.cartProducts?.color}</p>
                                                </div>

                                                <p className="orderBrand">Seller: <span>{singleOrderProducts?.cartProducts?.brand}</span></p>

                                                <div className="singleOrderPriceDiv">
                                                    <p className="sinOrdDis lineThrough">{currency}{singleOrderProducts?.cartProducts?.price}</p>
                                                    <p className="sinOrdPrice">{currency}{singleOrderProducts?.cartProducts?.discountPrice}</p>
                                                    <p className="sinOrdPrcPer">{singleOrderProducts?.cartProducts?.discountPercentage}%Off</p>
                                                </div>


                                                {/* Order Summary */}
                                                <div className="cartSummaryContainer">
                                                    <p className="pDetPara">Price Details</p>
                                                    <div className="priceDetailsDiv">
                                                        <div className="crtSmallDiv cartPriceDiv">
                                                            <p className="cpdPara totalCartItemsPara">Price <span>{totalCartItems} item</span></p>
                                                            <p className="totalCartPrice">{currency} <span>{totalPrice}</span></p>
                                                        </div>

                                                        <div className="crtSmallDiv cartDiscountDiv">
                                                            <p className="cpdPara">Discount</p>
                                                            <p className="cpdPara green">{currency} <span>-{totalDiscount}</span></p>
                                                        </div>

                                                        <div className="crtSmallDiv crtDeliveryChDiv">
                                                            <p>Delivery Charges</p>
                                                            <p className="green">{singleOrderCartProducts[0]?.deliveryCharges === 0 ? "Free" : singleOrderCartProducts[0]?.deliveryCharges}</p>
                                                        </div>
                                                    </div>

                                                    <div className="cartTotalAmountDiv">
                                                        <div className="totalAmSmDiv">
                                                            <p className="toSmDivBold">Total Amount</p>
                                                            <p>{currency} <span className="boldPlusGreen">{totalAmount}</span></p>
                                                        </div>

                                                        <button className="purpleBtn" onClick={() => navigate(`/singleOrder/${orderId}`)} id="cartPageCheckoutBtn">Payment</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                            <div className="userordersSummary"></div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}