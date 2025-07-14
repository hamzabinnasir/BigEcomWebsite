import "./product.css"
import React from "react"
import { Link } from "react-router-dom"
export default function Product({ imageUrl, brand, title, productId }) {
    return (
        <>
            <Link className="link" to={`/single/${productId}`}>
                <div className="productBox">
                    <div className="productImgBox">
                        <img src={imageUrl} alt="no img" />
                    </div>

                    <div className="imgBoxContent">
                        <h3>{brand}</h3>
                        <p>{title}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}