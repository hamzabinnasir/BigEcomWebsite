import userModel from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        let exist = await userModel.findOne({ email: email });

        if (exist) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid Email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a valid password" });
        }

        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(password, salt, async (error, hash) => {
                const newUser = await userModel.create({
                    username: firstName,
                    lastName,
                    email,
                    password: hash,
                })

                const user = newUser;
                const token = jwt.sign({ email: email, userId: user._id }, process.env.JWT_SECRET);
                res.json({ success: true, token });
            })
        })
    } catch (error) {
        res.json({ success: false, message: "internal Server Error" });
        console.log(error.message);
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }
        let findedUser = await userModel.findOne({ email: email });
        if (!findedUser) {
            return res.json({ success: false, message: "user doesn't exist" });
        }

        let role = findedUser.role;

        bcrypt.compare(password, findedUser.password, (error, result) => {
            if (result) {
                const token = jwt.sign({ email: email, userId: findedUser._id }, process.env.JWT_SECRET);
                res.status(200).json({ success: true, token, role });
            } else {
                res.status(400).json({ success: false, message: "Invalid Credentials" });
            }
        })
    } catch (error) {
        res.json({ success: false, message: "internal Server Error" });
        console.log(error.message);
    }
}

const getAllUsers = async (req, res) => {
    let allUsers = await userModel.find();
    if (!allUsers) {
        return res.status(404).json({ success: false, message: "Users not found" })
    }
    return res.status(200).json({ success: true, allUsers });
}


const getUserProfile = async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(404).json({ success: false, message: "Not Authorized Login Again" });
    }

    let findedUser = await userModel.findById(userId);
    if (!findedUser) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, findedUser });
}



export { registerUser, loginUser, getAllUsers, getUserProfile };