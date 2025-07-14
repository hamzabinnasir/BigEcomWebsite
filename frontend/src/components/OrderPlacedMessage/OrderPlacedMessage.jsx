import "./orderPlacedMessage.css"
import React from "react"
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
export default function OrderPlacedMessage(){
    return(
        <>
        <div className="orderPlacedMessageBox">
            <div className="orderPlacedCheckIcon">
                <CheckCircleOutlineSharpIcon />
            </div>

            <div className="orderPlacedMessage">
                <p className="paySuc">Payment Success</p>
                <p className="paySucDes">Congratulation Your Order Get Placed</p>
            </div>
        </div>
        </>
    )
}