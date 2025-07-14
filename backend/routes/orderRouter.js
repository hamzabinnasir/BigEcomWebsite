import express from "express";
import { placeOrder,cancelOrder ,getAllUserOrders, getAllOrders, deleteUserOrder, updateStatus, deleteOrder, getSingleOrder, filterOrder, allFiteredOrders } from "../controllers/orderController.js"
import userAuth from "../middlewares/userAuth.js"
const orderRouter = express.Router();

orderRouter.post("/place", userAuth, placeOrder);
orderRouter.post("/cancel",userAuth, cancelOrder); 
orderRouter.post("/allUserOrders",userAuth, getAllUserOrders); 
orderRouter.get("/all", getAllOrders);
orderRouter.get("/single/:orderId", getSingleOrder);
orderRouter.delete("/deleteUserOrder", userAuth, deleteUserOrder);
orderRouter.post("/delete", deleteOrder);
orderRouter.post("/updateStatus", updateStatus);
orderRouter.post("/filterOrder", userAuth , filterOrder); 
orderRouter.post("/allFilterOrders" , allFiteredOrders);

export default orderRouter;