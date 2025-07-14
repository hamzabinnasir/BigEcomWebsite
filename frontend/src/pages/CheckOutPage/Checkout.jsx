import "./checkout.css"
import Header from "../../components/Header/Header.jsx"
import Navbar from "../../components/Navbar/Navbar.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import Progress from "../../components/Progress/Progress.jsx"
import TextField from '@mui/material/TextField';
import shopContext from "../../context/shopContext.js"
import { useNavigate, useLocation } from "react-router-dom"
import React, { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
export default function Checkout() {
    const { backendURL, isDeliveryAddress, isLogin, isPayment, isOrderSummary, setLocation, token } = useContext(shopContext);
    const navigate = useNavigate();
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [address, setAddress] = useState("");
    let [city, setCity] = useState("");
    let [state, setState] = useState("");
    let [zipCode, setZipCode] = useState(null);
    let [phoneNumber, setPhoneNumber] = useState(null);
    const onSubmitOrderHandler = async (e) => {
        e.preventDefault();
        try {
            let payload = {
                firstName,
                lastName,
                address,
                city,
                state,
                zipCode,
                phoneNumber,
            }
            let response = await axios.post(`${backendURL}/api/order/place`, payload, { headers: { token: token } });
            if (response.data.success) {
                toast.success(response.data.message);
                navigate(`/orderSummary/${response.data.orderId}`)
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    let location = useLocation();
    useEffect(() => {
        setLocation(location.pathname);
    }, [location.pathname, setLocation])

    return (
        <>
            <div className="checkOutPage"></div>
            <Header />
            <Navbar />
            <div className="checkOutPageSection">
                {/* Progress Section */}
                <Progress isDeliveryAddress={isDeliveryAddress} isLogin={isLogin} isPayment={isPayment} isOrderSummary={isOrderSummary} />
                <button onClick={()=>navigate("/cart")} className="backBtn" id="orderSummaryBackBtn">Back</button>
                <div className="orderSummaryFormSection">
                    <div className="orderSummaryBlankSec"></div>

                    <form onSubmit={(e) => onSubmitOrderHandler(e)} id="orderSummaryForm">
                        <div className="orderSummFormFieldRow">
                            <TextField
                                label="First Name *"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                            />
                            <TextField
                                label="Last Name *"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                            />
                        </div>
                        <TextField
                            label="Address *"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                        />
                        <div className="orderSummFormFieldRow">
                            <TextField
                                label="City *"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => setCity(e.target.value)}
                                value={city}
                            />
                            <TextField
                                label="State/Province/Region *"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => setState(e.target.value)}
                                value={state}
                            />
                        </div>
                        <div className="orderSummFormFieldRow">
                            <TextField
                                label="Zip / Postal Code *"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => setZipCode(e.target.value)}
                                value={zipCode}
                            />
                            <TextField
                                label="Phone Number *"
                                variant="outlined"
                                fullWidth
                                type="tel"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                value={phoneNumber}
                            />
                        </div>
                        <button id="orderSummaryDeliverBtn" type="submit">Delivered Here</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}