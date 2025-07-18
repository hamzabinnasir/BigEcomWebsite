import mongoose from "mongoose";
const connectDB = async (req, res) =>{
    try{
        mongoose.connection.on("connected" , () =>{
            console.log("Database Connected Successfully");
        })
        await mongoose.connect(`${process.env.MONGODB_URI}e-commerse`);
    }catch(error){
        console.log(error.message);
    }
}

export default connectDB;

