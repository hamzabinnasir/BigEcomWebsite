import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
        min: 0,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
        required: true,
    },
    discountPercentage: {
        type: String,
        required: true,
    },
    topLevelCategory: {
        type: String,
        required: true,
    },
    secondLevelCategory: {
        type: String,
        required: true,
    },
    thirdLevelCategory: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    size: [
        {
            sizeName: {
                type: String,
            },
            sizeQuantity: {
                type: String,
            }
        }
    ],
    ratingsAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "review",
        }
    ],
    orderUpdateDate: {
        type: Date,
    },
    orderProductStatus: {
        type: String,
    }
}, { timestamps: true });

const productModel = mongoose.models.products || mongoose.model("product", productSchema);
export default productModel;