import mongoose from 'mongoose'

async function connectToDB() {
    try {
        const dbConnection = await mongoose.connect(process.env.MONGO_URI);
        console.log(dbConnection)
        if (dbConnection) {
            console.log('Database connected succesfully :', dbConnection.connection.host)
        }
    } catch (error) {
        console.log('Database connection failed..!! ', error)
    }

}

export default connectToDB;
