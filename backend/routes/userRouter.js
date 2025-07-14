import express from "express";
import userAuh from "../middlewares/userAuth.js"
import { registerUser, loginUser, getAllUsers, getUserProfile} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/all", getAllUsers);
userRouter.post("/getUserProfile",userAuh,  getUserProfile);

export default userRouter;