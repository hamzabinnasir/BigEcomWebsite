import "./progress.css"
import React from "react"
import CheckIcon from '@mui/icons-material/Check';
export default function Progress({ isDeliveryAddress, isLogin, isPayment, isOrderSummary }) {
    return (
        <>
            <div className="checkOutPageProgressSection">
                <div className="progressWidget loginWidget">
                    {
                        isLogin ?
                            <div className="checkDivCircle">
                                <CheckIcon />
                            </div>
                            :
                            <div className="divCircle">
                                <span>1</span>
                            </div>
                    }
                    <p>Login</p>
                </div>
                <div className="progressWidget deliveryAddressWidget">
                    {
                        isDeliveryAddress ?
                            <div className="checkDivCircle">
                                <CheckIcon />
                            </div>
                            :
                            <div className="divCircle">
                                <span>2</span>
                            </div>
                    }
                    <p>Delivery Address</p>
                </div>
                <div className="progressWidget orderSummaryWidget">
                    {
                        isOrderSummary ?
                            <div className="checkDivCircle">
                                <CheckIcon />
                            </div>
                            :
                            <div className="divCircle">
                                <span>3</span>
                            </div>
                    }
                    <p>Order Summary</p>
                </div>
                <div className="progressWidget paymentWidget">
                    {
                        isPayment ?
                            <div className="checkDivCircle">
                                <CheckIcon />
                            </div>
                            :
                            <div className="divCircle">
                                <span>4</span>
                            </div>
                    }
                    <p>Payment</p>
                </div>
            </div>
        </>
    )
}