import mongoose from 'mongoose'

async function connectDB() {
    try {
        const cont = await mongoose.connect(process.env.MONGO_URI);
        console.log('Connection logs db : ', cont)
        console.log('Database connected successfully,', cont.connection.host)
    } catch (error) {
        console.log('Failed to connect to DB ', error)
    }
}

export default connectDB;
