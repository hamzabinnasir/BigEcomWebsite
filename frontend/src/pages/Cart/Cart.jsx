import React, { useContext, useEffect, useState } from "react"
import shopContext from "../../context/shopContext.js"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Header from "../../components/Header/Header.jsx"
import Navbar from "../../components/Navbar/Navbar.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import axios from "axios"
export default function Cart() {
    const { backendURL, userAllCartItems, setUserAllCartItems, currency, totalPrice, setCartQuantity, setTotalPrice, setTotalDiscount, totalDiscount, totalAmount, setTotalAmount, token } = useContext(shopContext);

    const navigate = useNavigate();
    let [totalCartItems, setTotalCartItems] = useState();
    useEffect(() => {
        const handleGetCartItems = async () => {
            try {
                let response = await axios.post(`${backendURL}/api/cart/all`, {}, { headers: { token: token } });
                if (response.data.success) {
                    let quantity = 0;
                    let priceSum = 0;
                    let totalDis = 0;
                    setUserAllCartItems(response?.data?.findedUserCartData?.cartData);
                    userAllCartItems?.forEach((cd) => {
                        quantity += cd.quantity;
                        priceSum += cd.cartProducts.price * cd.quantity;
                        totalDis += cd.cartProducts.discountPrice * cd.quantity;
                    })
                    setCartQuantity(quantity);
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

        handleGetCartItems();
    }, [backendURL, setCartQuantity, userAllCartItems, setUserAllCartItems, setTotalPrice, setTotalDiscount, setTotalAmount, totalDiscount, totalPrice, token]);



    const handleUpdateCart = async (quantity, productId) => {
        try {
            let payload = {
                productId,
                quantity,
            }
            let response = await axios.post(`${backendURL}/api/cart/update`, payload, { headers: { token: token } });
            if (response.data.success) {
                let quantity = 0;
                let priceSum = 0;
                let totalDis = 0;
                setUserAllCartItems(response?.data?.findedUserCartData?.cartData);
                userAllCartItems?.forEach((cd) => {
                    quantity += cd.quantity;
                    priceSum += cd.cartProducts.price * cd.quantity;
                    totalDis += cd.cartProducts.discountPrice * cd.quantity;
                })
                setCartQuantity(quantity);
                setTotalPrice(priceSum);
                setTotalDiscount(totalDis);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }


    const handleIncreseCartQuantity = (cartQuantity, productId) => {
        let newQuantity = cartQuantity + 1;
        handleUpdateCart(newQuantity, productId);
    }

    const handleDecreaseCartQuantity = (cartQuantity, productId) => {
        let newQuantity;
        if(cartQuantity >=1){
            newQuantity = cartQuantity - 1;
        }
        handleUpdateCart(newQuantity, productId);
    }


    const handleRemoveCart = async (productId) => {
        try {
            let payload = {
                productId,
            }
            let response = await axios.post(`${backendURL}/api/cart/delete`, payload, { headers: { token: token } });
            if (response.data.success) {
                toast.success(response.data.message);
                setUserAllCartItems(response?.data?.findedUserCartData?.cartData)
                setTotalCartItems(userAllCartItems.length);
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
            <div className="cartPage">
                <Header />
                <Navbar />
                <div className="cartProductsContainerAndSummary">
                    <div className="cartProductsContainer">
                        {
                            userAllCartItems?.map((cartItem) =>
                                <div key={cartItem._id} className="singleCartItem">
                                    <div className="cartImgAndContent">
                                        <div className="cartItemImg">
                                            <img src={cartItem.cartProducts.imageUrl} alt="no img" />
                                        </div>

                                        <div className="cartContentDiv">
                                            <p className="cartItemTitle">{cartItem.cartProducts.title}</p>
                                            <div className="cartSizesAndColor">
                                                <p>Size:</p>
                                                <span>{cartItem?.size}</span>
                                                <p>{cartItem.cartProducts.color}</p>
                                            </div>
                                        </div>

                                        <p className="cartBrand">Seller: <span>{cartItem?.cartProducts?.brand}</span></p>

                                        <div className="cartPriceDiv">
                                            <p className="sinProDiscPrice lineThrough">{currency}{cartItem?.cartProducts?.price}</p>
                                            <p className="sinProPrice">{currency}{cartItem?.cartProducts?.discountPrice}</p>
                                            <p className="sinProDisPercentage">{cartItem?.cartProducts?.discountPercentage}%Off</p>
                                        </div>
                                    </div>

                                    <div className="cartQuantitySection">
                                        <div className="cartQuantityController">
                                            {
                                                cartItem.quantity <= 1 ? (
                                                    <RemoveCircleOutlineRoundedIcon
                                                        style={{ color: 'gray', cursor: 'not-allowed', pointerEvents: 'none' }}
                                                    />
                                                ) : (
                                                    <RemoveCircleOutlineRoundedIcon
                                                        onClick={() =>
                                                            handleDecreaseCartQuantity(cartItem.quantity, cartItem.cartProducts._id)
                                                        }
                                                    />
                                                )
                                            }
                                            <input type="number" onChange={(e) => handleUpdateCart(e.target.value, cartItem.cartProducts._id)} value={cartItem.quantity} min="0" />
                                            <AddCircleOutlineRoundedIcon onClick={() => handleIncreseCartQuantity(cartItem.quantity, cartItem.cartProducts._id)} />
                                        </div>

                                        <button onClick={() => handleRemoveCart(cartItem.cartProducts._id)} id="removeCartBtn">Remove</button>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                    {/* Cart Summary */}
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
                                <p className="green">Free</p>
                            </div>
                        </div>

                        <div className="cartTotalAmountDiv">
                            <div className="totalAmSmDiv">
                                <p className="toSmDivBold">Total Amount</p>
                                <p>{currency} <span className="boldPlusGreen">{totalAmount}</span></p>
                            </div>

                            <button className="purpleBtn" onClick={() => navigate("/checkout")} id="cartPageCheckoutBtn">check out</button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}