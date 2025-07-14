import "./App.css"
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import shopContext from "./context/shopContext.js";
import Home from "./pages/Home/Home.jsx";
import ProductCategory from "./pages/ProductCategory/ProductCategory.jsx";
import SingleProduct from "./pages/SingleProduct/SingleProduct.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Checkout from "./pages/CheckOutPage/Checkout.jsx"
import OrderSummary from "./pages/OrderSummary/OrderSummary.jsx";
import SingleOrder from "./pages/SingleOrder/SingleOrder.jsx";
import FilterOrders from "./pages/FilterOrders/FilterOrders.jsx";
import OrderDetails from "./pages/OrderDetails/OrderDetails.jsx";
import RatePage from "./pages/RatePage/RatePage.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
export default function App() {
    const { loginPopup, loginState } = useContext(shopContext)
    return (
        <BrowserRouter>
            {
                loginPopup === true ? (
                    loginState === "register" ?
                        <Register />
                        :
                        <Login />
                )
                    :
                    ""
            }
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productCategory/:topLevelCategory/:secondLevelCategory/:thirdLevelCategory" element={<ProductCategory />} />
                <Route path="/single/:productId" element={<SingleProduct />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orderSummary/:orderId" element={<OrderSummary />} />
                <Route path="/singleOrder/:orderId" element={<SingleOrder />} />
                <Route path="/filterOrders" element={<FilterOrders />} />
                <Route path="orderDetails/:orderId" element={<OrderDetails />} />
                <Route path="/rate/:productId" element={<RatePage />} />
            </Routes>
        </BrowserRouter>
    )
}