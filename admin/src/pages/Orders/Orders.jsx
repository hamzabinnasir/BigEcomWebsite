import "./orders.css"
import adminContext from "../../context/adminContext.js"
import React, { useContext, useState, useEffect } from "react"
import Pagination from '@mui/material/Pagination';
import axios from "axios"
import { toast } from "react-toastify"
export default function Orders() {
    const { backendURL } = useContext(adminContext);
    let [allFilteredOrders, setAllFilteredOrders] = useState([]);
    let [statusOpen, setStatusOpen] = useState("");
    let [orderStatus, setOrderStatus] = useState("");
    let [pageData, setPageData] = useState([]);
    let [page, setPage] = useState(1);
    let itemsPerPage = 10;
    let totalItems = allFilteredOrders?.length;
    let totalPage = Math.ceil(totalItems / itemsPerPage);

    const handlePage = (event, value) => {
        setPage(value);
        let lastIndex = value * itemsPerPage;
        let firstIndex = lastIndex - itemsPerPage;
        setPageData(allFilteredOrders?.slice(firstIndex, lastIndex));
    }

    useEffect(() => {
        let lastIndex = page * itemsPerPage;
        let firstIndex = lastIndex - itemsPerPage;
        setPageData(allFilteredOrders?.slice(firstIndex, lastIndex));
    }, [page, itemsPerPage, setPageData, allFilteredOrders]);

    useEffect(() => {
        let getAllFilteredOrders = async () => {
            try {
                setPage(1);
                let payload = { orderStatus };
                let response = await axios.post(`${backendURL}/api/order/allFilterOrders`, payload);
                if (response.data.success) {
                    setAllFilteredOrders(response.data.findedFilteredAllorder);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
        getAllFilteredOrders();
    }, [backendURL, orderStatus]);


    const totalOrderPrice = (orderCartProducts) => {
        return orderCartProducts?.reduce((sum, item) => {
            return sum += item?.cartProducts?.price || 0;
        }, 0)
    }

    const handleUpdateStatus = async (orderId, status) => {
        setStatusOpen("");
        try {
            let payload = {
                orderId,
                status,
            }
            let response = await axios.post(`${backendURL}/api/order/updateStatus`, payload);
            if (response.data.success) {
                toast.success(response.data.message);
                setAllFilteredOrders(response.data.findedFilteredAllorder);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const handleDeleteOrder = async (orderId) => {
        try {
            let response = await axios.post(`${backendURL}/api/order/delete`, { orderId });
            if (response.data.success) {
                toast.success(response.data.message);
                setAllFilteredOrders(response.data.findedFilteredAllorder);
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
            <div className="ordersPage">
                <div className="orderSortDiv">
                    <h2>Sort</h2>
                    <select onChange={(e) => setOrderStatus(e.target.value)} className="adminSortSelect" id="orderFilterSelect">
                        <option value="pending">pending</option>
                        <option value="placed">placed</option>
                        <option value="confirmed">confirmed</option>
                        <option value="shipped">shipped</option>
                        <option value="delivered">delivered</option>
                        <option value="cancelled">cancelled</option>
                        <option value="returned">returned</option>
                    </select>
                    <select className="adminSortSelect" id="orderSortSelect">
                        <option value="car">car</option>
                        <option value="bus">bus</option>
                        <option value="truck">truck</option>
                    </select>
                </div>

                <div className="allOrdersPage">
                    <h1>All Orders</h1>
                    <div className="allOrderDataTable">
                        <div className="allOrdersPageHeader">
                            <p className="allOrderPageHeaderCol">Image</p>
                            <p className="allOrderPageHeaderCol">Title</p>
                            <p className="allOrderPageHeaderCol">Price</p>
                            <p className="allOrderPageHeaderCol">Id</p>
                            <p className="allOrderPageHeaderCol">Status</p>
                            <p className="allOrderPageHeaderCol">Update</p>
                            <p className="allOrderPageHeaderCol">Delete</p>
                        </div>
                        <div className="allOrdersItems">
                            {
                                pageData.map((pageItem) =>
                                    <div key={pageItem._id} className="allOrderPageItem">
                                        <div className="allOrdersImgsDiv">
                                            {
                                                pageItem?.orderCartProducts?.map((ocp, index) =>
                                                    <img key={index} src={ocp?.cartProducts?.imageUrl} alt="no img" />
                                                )
                                            }
                                        </div>

                                        <div className="allOrderTitleAndBrandDiv">
                                            {
                                                pageItem?.orderCartProducts?.map((ocp, index) =>
                                                    <p key={index} className="allOrdersTitles">
                                                        {ocp?.cartProducts?.title}
                                                    </p>
                                                )
                                            }
                                            {
                                                pageItem?.orderCartProducts?.map((ocp, index) =>
                                                    <p key={index} className="allOrdersBrands">
                                                        {ocp?.cartProducts?.brand}
                                                    </p>
                                                )
                                            }

                                        </div>

                                        <div className="allOrdersPriceDiv">
                                            {
                                                <p className="allOrdersBrands">
                                                    {totalOrderPrice(pageItem?.orderCartProducts)}
                                                </p>

                                            }
                                        </div>

                                        <div className="orderIdDiv">
                                            <p>{pageItem?._id}</p>
                                        </div>
                                        <div>
                                            <button style={{ backgroundColor: pageItem?.status === "pending" ? "#f0ad4e" : pageItem?.status === "placed" ? "#0275d8" : pageItem?.status === "confirmed" ? "#5bc0de" : pageItem?.status === "shipped" ? "#5cb85c" : pageItem?.status === "delivered" ? "#3c763d" : pageItem?.status === "cancelled" ? "#d9534f" : pageItem?.status === "returned" ? "#a94442" : "" }}>{pageItem?.status}</button>
                                        </div>

                                        <div className="allOrderUpdateStatusDiv">
                                            <button onClick={() => setStatusOpen(pageItem?._id)}>Status</button>

                                            {
                                                statusOpen === pageItem?._id ?
                                                    <div className="statusPopup">
                                                        <p onClick={() => handleUpdateStatus(pageItem?._id, "confirmed")}>confirmed order</p>
                                                        <p onClick={() => handleUpdateStatus(pageItem?._id, "shipped")}>shipped order</p>
                                                        <p onClick={() => handleUpdateStatus(pageItem?._id, "delivered")}>delivered order</p>
                                                    </div>
                                                    :
                                                    ""
                                            }
                                        </div>

                                        <div className="allOrdersDeleteDiv">
                                            <button onClick={() => handleDeleteOrder(pageItem?._id)}>Delete</button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="allOrderPageDiv">
                        <Pagination onChange={handlePage} count={totalPage} color="primary" />
                    </div>
                </div>
            </div>
        </>
    )
}