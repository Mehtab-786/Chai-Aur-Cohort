import mongoose from "mongoose";

async function dbConnect() {
    try {
        const connectionString = await mongoose.connect(process.env.MONGO_URI);
        // console.log(connectionString.connection.host);
    } catch (error) {
        console.log('DB connection failed', error);
        throw new Error("DB connection failed");        
    }
}
export default dbConnect;