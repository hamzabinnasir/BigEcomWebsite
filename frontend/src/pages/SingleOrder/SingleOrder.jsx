import "./singleOrder.css"
import shopContext from "../../context/shopContext.js"
import Header from "../../components/Header/Header.jsx"
import Navbar from "../../components/Navbar/Navbar.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import SingleOrderProgress from "../../components/SingleOrderProgress/SingleOrderProgress.jsx"
import OrderPlacedMessage from "../../components/OrderPlacedMessage/OrderPlacedMessage.jsx"
import React, { useContext, useState, useEffect, currency } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
export default function SingleOrder() {
    const { orderId } = useParams();
    const { backendURL } = useContext(shopContext);
    const [userSingleOrder, setUserSingleOrder] = useState([]);
    useEffect(() => {
        const getSingleOrder = async () => {
            try {
                let response = await axios.get(`${backendURL}/api/order/single/${orderId}`);
                if (response.data.success) {
                    setUserSingleOrder(response?.data?.findedSingleOrder);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
        getSingleOrder();
    }, [backendURL, orderId]);
    return (
        <>
            <div className="singleOrderPage">
                <Header />
                <Navbar />
                <OrderPlacedMessage />
                <SingleOrderProgress />
                <div className="singleOrderContainer">
                    {
                        userSingleOrder?.orderCartProducts?.map((item) =>
                            <div key={item._id} className="singleOrderCartItem">
                                <div className="imgAndContentDiv">
                                    <div className="sinOrderImgDiv">
                                        <img src={item?.cartProducts?.imageUrl} alt="no img" />
                                    </div>
                                    <div className="singleOrderContentDiv">
                                        <p className="sinCartItemTitle">{item?.cartProducts?.title}</p>

                                        <div className="singleOrderColorAndSizes">
                                            <p className="singleOrderColor">Color: <span>{item?.cartProducts?.color}</span></p>
                                            <div className="singleOrderSize">
                                                <p>Size:</p>
                                                <span>{item?.size?.sizeName}</span>
                                            </div>
                                        </div>
                                        <p className="singleOrderSeller">{item?.cartProducts?.brand}</p>

                                        <p className="singleOrderProductPrice">
                                            {currency} <span>{item?.cartProducts?.price}</span>
                                        </p>
                                    </div>
                                </div>


                                <div className="singleOrderDetails">
                                    <h3 className="singleOrderUserName">{userSingleOrder.username}</h3>
                                    <p className="singleOrderUserAddress">{userSingleOrder.address}</p>
                                    <h3>Phone Number</h3>
                                    <p className="singleOrderUserPhoneNum">{userSingleOrder.phoneNumber}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
                <Footer />
            </div>
        </>
    )
}