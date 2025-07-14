import cartModel from "../models/cartModel.js"
import userModel from "../models/userModel.js";
const addToCart = async (req, res) => {
    try {
        const { userId, productId, deliveryCharges, quantity, size } = req.body;
        if (!productId) {
            return res.json({ success: false, message: "Product not found" });
        }
        if (!userId) {
            return res.json({ success: false, message: "User not found" });
        }

        if (!size || size == "") {
            return res.json({ success: false, message: "You must select the size first" });
        }

        let existingCartItem = await cartModel.findOne({ cartProducts: productId, adder: userId, size: size });

        if (existingCartItem) {
            await cartModel.findByIdAndUpdate(existingCartItem._id, {
                quantity: quantity + 1,
                deliveryCharges,
            });

            let findedUserCartData = await userModel.findById(userId).populate(
                { path: "cartData" },
            )

            res.status(200).json({ success: true, findedUserCartData });
        } else {
            let cartItem = await cartModel.create({
                cartProducts: productId,
                deliveryCharges,
                quantity,
                adder: userId,
                size,
            });

            let findedUser = await userModel.findByIdAndUpdate(userId, {
                $addToSet: { cartData: cartItem._id }
            });

            let findedUserCartData = findedUser.populate({
                path: "cartData",
                populate:{ path: "cartProducts" },
            })
            return res.status(200).json({ success: true, findedUserCartData });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        console.log(error.message);
    }
}


const updateCart = async (req, res) => {
    try {
        const { productId, deliveryCharges, quantity } = req.body;
        if (!productId) {
            return res.status(404).json({ success: false, message: "Product does not exists" });
        }

        const { userId } = req.body;
        if (!userId) {
            return res.status(404).json({ success: false, message: "User does not exists" });
        }
        let findedUserCartData = await userModel.findById(userId).populate(
            {
                path: "cartData",
                populate:{ path: "cartProducts" },
            });

        if (quantity === 0) {
            await cartModel.findOneAndDelete({ cartProducts: productId, adder: userId })
        } else {
            await cartModel.findOneAndUpdate({ cartProducts: productId, adder: userId }, {
                quantity,
                deliveryCharges,
            })
            res.status(200).json({ success: true, findedUserCartData });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        console.log(error.message);
    }
}

const removeCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        if (!userId) {
            return res.status(404).json({ success: false, message: "User does not exists" });
        }

        if (!productId) {
            return res.status(400).json({ success: false, message: "Product not found" });
        }
        let UserCartItem = await cartModel.findOne({ cartProducts: productId, adder: userId });

        if (!UserCartItem) {
            return res.json({ success: false, message: "No Items in the Cart" });
        }

        await userModel.findByIdAndUpdate(userId, {
            $pull: { cartData: UserCartItem._id },
        });

        await cartModel.findByIdAndDelete(UserCartItem._id);

        let findedUserCartData = await userModel.findById(userId).populate(
            {
                path: "cartData",
                populate:{ path: "cartProducts" },
            });
        res.status(200).json({ success: true, message: "Cart Item deleted Successfully", findedUserCartData });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getAllCartItems = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(404).json({ success: false, message: "User does not exists" });
        }

        let findedUserCartData = await userModel.findById(userId).populate(
            {
                path: "cartData",
                populate:{ path: "cartProducts" },
            });

        if (!findedUserCartData) {
            return res.status(404).json({ success: false, message: "No Items in the Cart" });
        }
        res.json({ success: true, findedUserCartData });
    } catch (error) {
        res.status(500).json({ success: false, message: "internal Server Error" });
        console.log(error.message);
    }
}

export { addToCart, updateCart, removeCart, getAllCartItems };
