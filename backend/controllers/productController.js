import productModel from "../models/productModel.js";
import reviewModel from "../models/reviewsModel.js";
import userModel from "../models/userModel.js"
const createProduct = async (req, res) => {
    try {
        const { imageUrl, brand, title, color, quantity, price, discountPrice, discountPercentage, topLevelCategory, secondLevelCategory, description, thirdLevelCategory, size } = req.body;
        if (!imageUrl || !brand || !title || !color || !quantity || !price || !discountPrice || !discountPercentage || !topLevelCategory || !secondLevelCategory || !thirdLevelCategory || !description) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        let newProduct = await productModel.create({
            imageUrl,
            brand,
            title,
            color: color ? color.toLowerCase() : "",
            quantity,
            price,
            description,
            discountPrice,
            discountPercentage,
            topLevelCategory,
            secondLevelCategory,
            thirdLevelCategory,
            size,
        });

        res.json({ success: true, message: "Product Added Successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(200).json({ success: false, message: "Internal Server Error" });
    }
}


const getAllProducts = async (req, res) => {
    try {
        let findAllProducts = await productModel.find();
        if (!findAllProducts) {
            return res.status(404).json({ success: false, message: "Products not found" });
        }
        res.json({ success: true, findAllProducts });
    } catch (error) {
        return res.json({ success: false, message: "Internal Server Error" });
        console.log(error);
    }
}

const getSingleProduct = async (req, res) => {
    try {
        const { productId, topLevelCategory, secondLevelCategory, thirdLevelCategory, userId } = req.body;
        if (!productId) {
            return res.status(400).json({ success: false, message: "Product not found" });
        }
        let singleProduct = await productModel.findById(productId).populate({
            path: "ratingsAndReviews",
            populate: { path: "ratedProductId", path: "raterId" },
        });
        if (!singleProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        let filterProductData = {};
        if (topLevelCategory && topLevelCategory !== "") filterProductData.topLevelCategory = topLevelCategory;
        if (secondLevelCategory && secondLevelCategory !== "") filterProductData.secondLevelCategory = secondLevelCategory;
        if (thirdLevelCategory && thirdLevelCategory !== "") filterProductData.thirdLevelCategory = thirdLevelCategory;

        let findedFilteredProducts = await productModel.find(filterProductData);

        res.json({ success: true, singleProduct, findedFilteredProducts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) {
            return res.json({ success: false, message: "Product not found" });
        }
        await productModel.findByIdAndDelete(productId);

        let findedFilteredProducts = await productModel.find();
        if (!findedFilteredProducts) {
            return res.status(400).json({ success: false, message: "Products not found" });
        }
        res.json({ success: true, message: "Product deleted Successfully", findedFilteredProducts });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { productId, imageUrl, brand, title, color, quantity, price, discountPrice, discountPercentage, topLevelCategory, secondLevelCategory, thirdLevelCategory, description, size } = req.body;
        if (!productId) {
            return res.status(400).json({ success: false, message: "Product not found" });
        }

        if (!imageUrl || !brand || !title || !color || !quantity || !price || !discountPrice || !discountPercentage || !topLevelCategory || !secondLevelCategory || !thirdLevelCategory || !description || !size) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        let productUpdated = await productModel.findByIdAndUpdate(
            productId,
            {
                imageUrl,
                brand,
                title,
                color,
                quantity,
                price,
                discountPrice,
                discountPercentage,
                topLevelCategory,
                secondLevelCategory,
                thirdLevelCategory,
                description,
                size,
            })

        if (!productUpdated) {
            return res.status(400).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product Updated Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const filterProduct = async (req, res) => {
    try {
        const { topLevelCategory, secondLevelCategory, thirdLevelCategory, color, priceRange, discountRange, availability, size } = req.body;

        let filterProductData = {};
        if (topLevelCategory && topLevelCategory !== "") filterProductData.topLevelCategory = topLevelCategory;
        if (secondLevelCategory && secondLevelCategory !== "") filterProductData.secondLevelCategory = secondLevelCategory;
        if (thirdLevelCategory && thirdLevelCategory !== "") filterProductData.thirdLevelCategory = thirdLevelCategory;


        // When I have to check the whole array field from backend with single field in the backend
        if (color && Array.isArray(color) && color.length > 0) {
            filterProductData.color = { $in: color };
        }

        // When one field have to compare with multiple fields in the backend model
        //     if (size) {
        //     filterProductData["$or"] = [
        //         { sizeName1: size },
        //         { sizeName2: size },
        //         { sizeName3: size },
        //     ]
        // }

        if (priceRange && priceRange !== "") {
            let [minPrice, maxPrice] = priceRange.split("to").map((p) => Number(p.trim()));
            if (isNaN(minPrice) || isNaN(maxPrice)) {
                return res.status(400).json({ success: false, message: "Price must be in numbers" });
            }
            filterProductData.price = { $gte: minPrice, $lte: maxPrice };
        }
        if (discountRange && discountRange !== "") {
            let discountRangeNum = parseInt(discountRange);
            if (isNaN(discountRange)) {
                return res.status(400).json({ success: false, message: "Discount range must be in numbers" })
            }
            filterProductData.discountPercentage = { $gte: discountRangeNum }
        }

        if (availability && availability !== "" && availability == "inStock") filterProductData.quantity = { $gt: 0 };
        if (availability && availability !== "" && availability == "outOfStock") filterProductData.quantity = 0;

        if (size && Array.isArray(size) && size.length > 0) {
            filterProductData["size.sizeName"] = { $in: size };
        }

        let findedFilteredProducts = await productModel.find(filterProductData);
        return res.status(200).json({ success: true, findedFilteredProducts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// _____________________ ** Product Ratings APIS **__________________________


const rateProduct = async (req, res) => {
    try {
        const { title, description, ratings, userId, productId } = req.body;
        if (!userId) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!productId) {
            return res.status(400).json({ success: false, message: "Product not found" });
        }

        let productReview = await reviewModel.create({
            title,
            description,
            ratings: parseInt(ratings),
            raterId: userId,
            ratedProductId: productId,
        })


        await productModel.findByIdAndUpdate(productId, {
            $push: { ratingsAndReviews: productReview._id },
        })
        await userModel.findByIdAndUpdate(userId, {
            $push: { productRatingsDetails: productReview._id },
        })

        return res.status(200).json({ success: true, message: "Product Rated Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


const getUserRatedProducts = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let userProductRatingDetails = await userModel.findById(userId).populate({
            path: "productRatingsDetails",
        });

        return res.status(200).json({ success: true, data: userProductRatingDetails });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


const allUserRatings = async (req, res) => {
    try {
        let allUsersRatingsDetails = await userModel.find().populate({
            path: "productRatingsDetails",
        })

        if (!allUsersRatingsDetails) {
            return res.json({ success: false, message: "Rating Details not found" });
        }

        return res.status(200).json({ success: true, allUsersRatingsDetails });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export { createProduct, getAllProducts, getSingleProduct, deleteProduct, updateProduct, rateProduct, getUserRatedProducts, allUserRatings, filterProduct };