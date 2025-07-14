import "./singleOrderProgress.css"
import React from "react"
import CheckIcon from '@mui/icons-material/Check';
export default function SingleOrderProgress() {
    return (
        <>
            <div className="singleOrderProgressSection">
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
        </>
    )
}