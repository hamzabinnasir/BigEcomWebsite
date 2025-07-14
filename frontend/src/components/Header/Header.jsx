import "./header.css"
import React, { useContext } from "react"
import shopContext from "../../context/shopContext"
export default function Header() {
    const { freeDelivery, currency } = useContext(shopContext);
    return (
        <>
            <h3>Get free delivery on orders over {freeDelivery}{currency}</h3>
        </>
    )
}