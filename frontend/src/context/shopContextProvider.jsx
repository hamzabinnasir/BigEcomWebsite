import shopContext from "./shopContext.js";
import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import { toast } from "react-toastify"
export default function ShopContextProvider({ children }) {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const currency = "$";
    const freeDelivery = 100;
    const popupRef = useRef();
    let [cartQuantity, setCartQuantity] = useState("");
    let [totalPrice, setTotalPrice] = useState(0);
    let [totalDiscount, setTotalDiscount] = useState(0);
    let [totalAmount, setTotalAmount] = useState(0);
    let [userAllCartItems, setUserAllCartItems] = useState([]);
    let [isLogin, setIsLogin] = useState(false);
    let [isDeliveryAddress, setIsDeliveryAddress] = useState(false);
    let [isOrderSummary, setIsOrderSummary] = useState(false);
    let [isPayment, setIsPayment] = useState(false);
    let [location, setLocation] = useState("");
    let [orderIdState, setOrderId] = useState("");
    let [role, setRole] = useState("");
    let [profileData, setProfileData] = useState("");
    let [loginPopup, setLoginPopup] = useState(false);
    let [loginState, setLoginState] = useState("register");
    const [token, setToken] = useState("");
    useEffect(() => {
        const getUserCartQuantity = async () => {
            try {
                let response = await axios.post(`${backendURL}/api/cart/all`, {}, { headers: { token: token } });
                if (response.data.success) {
                    let quantity = 0;
                    let priceSum = 0;
                    let totalDiscount = 0;
                    response.data.findedUserCartData?.cartData?.forEach((cd) => {
                        quantity += cd.quantity;
                        priceSum += cd.cartProducts.price * cd.quantity;
                        totalDiscount += cd.cartProducts.discount * cd * quantity;
                    });
                    setTotalPrice(priceSum);
                    setCartQuantity(quantity);
                    setTotalDiscount(totalDiscount);
                    setTotalAmount(totalPrice - totalDiscount);

                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }

        getUserCartQuantity();
    }, [backendURL, totalPrice, token]);


    useEffect(() => {
        if (token && token !== "") {
            setIsLogin(true);
        }
    }, [token])

    useEffect(() => {
        if (location === "/checkout") {
            setIsDeliveryAddress(true);
            setIsOrderSummary(false);
        } else if (location === `/orderDetails/${orderIdState}`) {
            setIsOrderSummary(true);
            setIsDeliveryAddress(true);
        } else {
            setIsDeliveryAddress(false);
            setIsOrderSummary(false);
        }
    }, [location, orderIdState]);


    useEffect(() => {
        if (token === "" && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
        }
    }, [token]);

    useEffect(() =>{
        if(token && token!== ""){
            setLoginPopup(false);
        }
    }, [token]);

    useEffect(() => {
        if (role === "admin") {
            if (!token) {
                toast.error("No token available for admin navigation");
                return;
            }
            // if (!process.env.REACT_APP_ADMIN_URL) {
            //     toast.error("Admin URL not configured in environment variables");
            //     return;
            // }

            const adminAppUrl = `http://localhost:${5173}`;
            window.location.href = adminAppUrl;;
        }
    }, [role, token]);


    useEffect(() => {
        const getUserProfileData = async () => {
            try {
                let response = await axios.post(`${backendURL}/api/user/getUserProfile`, {}, { headers: { token: token } });
                if (response.data.success) {
                    setProfileData(response.data.findedUser);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUserProfileData();
    }, [backendURL, token]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setLoginPopup(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setLoginPopup]);

    const contextValue = {
        currency,
        freeDelivery,
        backendURL,
        cartQuantity,
        setCartQuantity,
        userAllCartItems,
        setUserAllCartItems,
        totalPrice,
        setTotalPrice,
        totalDiscount,
        setTotalDiscount,
        totalAmount,
        setTotalAmount,
        isLogin,
        isDeliveryAddress,
        isOrderSummary,
        isPayment,
        setLocation,
        setOrderId,
        setIsPayment,
        token,
        setToken,
        role,
        setRole,
        profileData,
        loginPopup,
        setLoginPopup,
        loginState,
        setLoginState,
        popupRef,
    }

    return (
        <shopContext.Provider value={contextValue}>
            {children}
        </shopContext.Provider>
    )
}