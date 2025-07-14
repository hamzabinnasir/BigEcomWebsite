import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js"

const placeOrder = async (req, res) => {
    try {
        const { firstName, lastName, address, city, state, zipCode, phoneNumber } = req.body;

        if (!firstName || !lastName || !address || !city || !state || !zipCode || !phoneNumber) {
            return res.status(400).json({ success: false, message: "All fileds are required" });
        }

        const { userId } = req.body;
        if (!userId) {
            return res.status(404).json({ success: false, message: "User nor found" });
        }
        let findedUser = await userModel.findById(userId);

        if (!findedUser.cartData || findedUser.cartData.length === 0) {
            return res.status(400).json({ success: false, message: "First, add it to the cart." });
        }

        let newOrder = await orderModel.create({
            username: firstName,
            lastName,
            address,
            city,
            state,
            zipCode: parseInt(zipCode),
            phoneNumber: parseInt(phoneNumber),
            orderCartProducts: findedUser.cartData,
            placedBy: userId,
        })


        await userModel.findByIdAndUpdate(userId, {
            $push: { orderDetails: newOrder._id },
        });

        let findedOrder = await orderModel.findById(newOrder._id);
        findedOrder.orderCartProducts.forEach((ocp) => {
            ocp.cartProducts.orderUpdateDate = findedOrder.updatedAt;
            ocp.cartProducts.orderProductStatus = findedOrder.status;
        })

        return res.status(200).json({ success: true, message: "Order Placed Successfully", orderId: newOrder._id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


const cancelOrder = async (req, res) => {
    try {
        const { userId, orderId } = req.body;
        if (!userId) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!orderId) {
            return res.status(400).json({ success: false, message: "Order not found" });
        }

        let cancelledOrder = await orderModel.findByIdAndUpdate(orderId, {
            status: "cancelled",
        })

        await userModel.findByIdAndUpdate(userId, {
            $pull: { orderDetails: cancelledOrder._id },
        });

        return res.status(200).json({ success: true, message: "Order Cancelled Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: true, message: "Internal Server Error" });
    }
}

const getAllUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let findedUserOrderDetails = await userModel.findById(userId).populate({
            path: "orderDetails",
            populate: {
                path: "orderCartProducts",
                populate: [
                    { path: "cartProducts" },
                ]
            }
        })
        return res.status(200).json({ success: true, findedUserOrderDetails });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


const getAllOrders = async (req, res) => {
    try {
        let findedFilteredAllorder = await orderModel.find().populate({
            path: "orderCartProducts",
            populate: { path: "cartProducts" },
        });
        if (!findedFilteredAllorder) {
            return res.status(404).json({ success: false, message: "Orders not found" });
        }
        return res.status(200).json({ success: true, findedFilteredAllorder });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Intenal Server Error" });
    }
}

const deleteUserOrder = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { orderId } = req.body;
        if (!orderId) {
            return res.status(400).json({ success: false, message: "Order not found" });
        }

        await userModel.findByIdAndUpdate(userId, {
            $pull: { orderDetails: orderId },
        })

        await orderModel.findByIdAndDelete(orderId);
        return res.status(200).json({ success: true, message: "Order deleted Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internel Server Error" });
    }
}

const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        if (!orderId) {
            return res.status(400).json({ success: true, message: "Order not found" });
        }
        await orderModel.findByIdAndDelete(orderId);

        let findedFilteredAllorder = await orderModel.find().populate({
            path: "orderCartProducts",
            populate: { path: "cartProducts" },
        });

        return res.status(200).json({ success: true, message: "Order deleted Successfully", findedFilteredAllorder });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


const updateStatus = async (req, res) => {
    try {
        const { status, orderId } = req.body;
        if (!orderId) {
            return res.status(400).json({ success: false, message: "Status not found" });
        }

        if (!status || status === null) {
            return res.status(400).json({ success: false, message: "Status is required" });
        }

        await orderModel.findByIdAndUpdate(orderId, {
            status,
        });

        let findedFilteredAllorder = await orderModel.find().populate({
            path: "orderCartProducts",
            populate: { path: "cartProducts" },
        })


        let findedOrder = await orderModel.findById(orderId);
        findedOrder.orderCartProducts.forEach((ocp) => {
            ocp.cartProducts.orderUpdateDate = findedOrder.updatedAt;
            ocp.cartProducts.orderProductStatus = findedOrder.status;
        })

        return res.status(200).json({ success: true, message: "Status Updated Successfully", findedFilteredAllorder })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getSingleOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        if (!orderId) {
            return res.status(400).json({ success: false, message: "Order Id not found" });
        }
        let findedSingleOrder = await orderModel.findById(orderId).populate({
            path: "orderCartProducts",
            populate: [
                { path: "cartProducts" },
                { path: "size" },
            ]
        })
        if (!findedSingleOrder) {
            return res.status(400).json({ success: false, message: "Order not found" });
        }

        return res.json({ success: true, findedSingleOrder });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const filterOrder = async (req, res) => {
    try {
        const { userId, orderStatus } = req.body;
        if (!userId) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        let filterOrderData = {};
        // let visibleStatuses = [
        //     "shipped",
        //     "delivered",
        //     "cancelled",
        //     "returned"
        // ]

        if (userId) {
            filterOrderData.placedBy = userId;
        }

        if (orderStatus && Array.isArray(orderStatus) && orderStatus.length > 0) {
            filterOrderData.status = { $in: orderStatus };
        }
        // else{
        //     filterOrderData.status = {$in: visibleStatuses};
        // }

        let userFilteredOrders = await orderModel.find(filterOrderData).populate(
            [
                {
                    path: "orderCartProducts",
                    populate: [{ path: "cartProducts" }, { path: "size" }],
                },
                { path: "placedBy" },
            ]
        );
        return res.status(200).json({ success: true, userFilteredOrders });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const allFiteredOrders = async (req, res) => {
    try {
        let { orderStatus } = req.body;
        let filterAllOrderData = {};
        if (orderStatus && orderStatus !== "") {
            filterAllOrderData.status = orderStatus;
        }

        let findedFilteredAllorder = await orderModel.find(filterAllOrderData).populate({
            path: "orderCartProducts",
            populate: { path: "cartProducts" },
        });
        return res.status(200).json({ success: true, findedFilteredAllorder });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export { placeOrder, cancelOrder, getAllUserOrders, getAllOrders, deleteUserOrder, updateStatus, deleteOrder, getSingleOrder, filterOrder, allFiteredOrders };