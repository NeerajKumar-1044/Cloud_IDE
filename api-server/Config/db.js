import mongoose from "mongoose";
// import 'dotenv/config'

export const connectDb = async function () {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/codeeditor`);
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`Error while connection to database: ${error.message}`);
    }
    
}