import "./statusDate.css"
import React, { useEffect, useState, useMemo } from "react"
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AdjustIcon from '@mui/icons-material/Adjust';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CancelIcon from '@mui/icons-material/Cancel';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export default function StatusDate({ data, type, status }) {
    const [statusData, setStatusData] = useState("");
    const ORDER_STATUSES = useMemo(() => [
        {
            key: "shipped",
            icon: <LocalShippingIcon color="primary" />,
            title: "Expected Delivery On",
            date: new Date(new Date(data?.updatedAt).getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            message: "Order has been processed and shipped."
        },
        {
            key: "delivered",
            icon: <AdjustIcon style={{ color: "green" }} />,
            title: "Expected Delivery On",
            date: data?.updatedAt,
            message: "Your item Has Been Delivered"
        },
        {
            key: "cancelled",
            icon: <CancelIcon style={{ color: "red" }} />,
            title: "Cancelled On",
            date: data?.updatedAt,
            message: "No further actions allowed (except maybe reorder)."
        },
        {
            key: "returned",
            icon: <AssignmentReturnIcon color="secondary" />,
            title: "Returned On",
            date: data?.updatedAt,
            message: "Return has been processed."
        },
        {
            key: "pending",
            icon: <HourglassEmptyIcon style={{ color: "#FFA500" }} />,
            title: "Created On",
            date: data?.updatedAt,
            message: "Order pending. Awaiting processing or payment."
        },
        {
            key: "placed",
            icon: <ShoppingCartIcon color="action" />,
            title: "Expected Delivery On",
            date: new Date(new Date(data.updatedAt).getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            message: "Order placed. Awaiting payment confirmation."
        },
        {
            key: "confirmed",
            icon: <CheckCircleIcon style={{ color: "#1976d2" }} />,
            title: "Confirmed On",
            date: data?.updatedAt,
            message: "Order confirmed and preparing for shipment."
        }
    ], [data?.updatedAt]);


    const ORDER_PRODUCT_STATUS = useMemo(() => [
        {
            key: "shipped",
            icon: <LocalShippingIcon color="primary" />,
            title: "Expected Delivery On",
            date: new Date(new Date(data?.orderUpdateDate).getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            message: "Order has been processed and shipped."
        },
        {
            key: "delivered",
            icon: <AdjustIcon style={{ color: "green" }} />,
            title: "Delivered On",
            date: data?.updatedAt,
            message: "Your item Has Been Delivered"
        },
        {
            key: "cancelled",
            icon: <CancelIcon style={{ color: "red" }} />,
            title: "Cancelled On",
            date: data?.orderUpdateDate,
            message: "No further actions allowed (except maybe reorder)."
        },
        {
            key: "returned",
            icon: <AssignmentReturnIcon color="secondary" />,
            title: "Returned On",
            date: data?.orderUpdateDate,
            message: "Return has been processed."
        },
        {
            key: "pending",
            icon: <HourglassEmptyIcon style={{ color: "#FFA500" }} />,
            title: "Created On",
            date: data?.orderUpdateDate,
            message: "Order pending. Awaiting processing or payment."
        },
        {
            key: "placed",
            icon: <FiberManualRecordIcon color="action" />,
            title: "Expected Delivery On",
            date: new Date(new Date(data.updatedAt).getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            message: "Order placed. Awaiting payment confirmation."
        },
        {
            key: "confirmed",
            icon: <CheckCircleIcon style={{ color: "#1976d2" }} />,
            title: "Confirmed On",
            date: data?.orderUpdateDate,
            message: "Order confirmed and preparing for shipment."
        }
    ], [data?.orderUpdateDate, data?.updatedAt]);


    useEffect(() => {
        if (type === "RatePage") {
            switch (status) {
                case "shipped":
                    setStatusData(ORDER_PRODUCT_STATUS.find((item) => item.key === status));
                    break;
                case "delivered":
                    setStatusData(ORDER_PRODUCT_STATUS.find((item) => item.key === status));
                    break;
                case "cancelled":
                    setStatusData(ORDER_PRODUCT_STATUS.find((item) => item.key === status));
                    break;
                case "returned":
                    setStatusData(ORDER_PRODUCT_STATUS.find((item) => item.key === status));
                    break;
                case "pending":
                    setStatusData(ORDER_PRODUCT_STATUS.find((item) => item.key === status));
                    break;
                case "placed":
                    setStatusData(ORDER_PRODUCT_STATUS.find((item) => item.key === status));
                    break;
                case "confirmed":
                    setStatusData(ORDER_PRODUCT_STATUS.find((item) => item.key === status));
                    break;
                default:
                    break;
            }
        } else {
            switch (status) {
                case "shipped":
                    setStatusData(ORDER_STATUSES.find((item) => item.key === status));
                    break;
                case "delivered":
                    setStatusData(ORDER_STATUSES.find((item) => item.key === status));
                    break;
                case "cancelled":
                    setStatusData(ORDER_STATUSES.find((item) => item.key === status));
                    break;
                case "returned":
                    setStatusData(ORDER_STATUSES.find((item) => item.key === status));
                    break;
                case "pending":
                    setStatusData(ORDER_STATUSES.find((item) => item.key === status));
                    break;
                case "placed":
                    setStatusData(ORDER_STATUSES.find((item) => item.key === status));
                    break;
                case "confirmed":
                    setStatusData(ORDER_STATUSES.find((item) => item.key === status));
                    break;
                default:
                    break;
            }
        }
    }, [ORDER_PRODUCT_STATUS, ORDER_STATUSES, status, type]);


    return (
        <>
            <div key={statusData.key} className="statusDateDiv">
                <div className="statusDateContext">
                    {statusData.icon}
                    <p className="statusDate">
                        {statusData.title}
                        <span>{statusData.date}</span>
                    </p>
                </div>
                <p className="statusDatePara">{statusData.message}</p>
            </div>
        </>
    )
}