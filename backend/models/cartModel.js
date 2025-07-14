import mongoose from "mongoose";
const cartSchema = mongoose.Schema({
    cartProducts:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    },

    quantity: {
        type: Number,
        default: 1,
    },
    adder: {
        type: mongoose.Schema.Types.ObjectId,
    },
    size: {
        type: String,
        // required: true,
    }
}, { timestamps: true });

const cartModel = mongoose.models.carts || mongoose.model("cart", cartSchema);
export default cartModel;