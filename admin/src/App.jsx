import "./App.css"
import React from "react"
import Navbar from "./components/Navbar/Navbar.jsx"
import Sidebar from "./components/Sidebar/Sidebar.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard/Dashboard.jsx"
import Orders from "./pages/Orders/Orders.jsx"
import Product from "./pages/Product/Product.jsx"
import AddProduct from "./pages/AddProduct/AddProduct.jsx"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify"
export default function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer/>
        <Navbar />
        <div className="mainContainer">
          <Sidebar />
          <div className="containerRouter">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/products" element={<Product />} />
              <Route path="/addProduct" element={<AddProduct />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}