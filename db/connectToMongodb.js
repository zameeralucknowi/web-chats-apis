import mongoose from "mongoose";

const connectToMongodb = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connection Successfull!");
    } catch (error) {
        console.log("Error connecting to mongodb",error.message)
    }
}

export default connectToMongodb;