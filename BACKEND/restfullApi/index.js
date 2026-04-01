import dotenv from 'dotenv'
dotenv.config();
import app from './src/app.js';
import connectDB from './src/common/config/db.js';

const PORT = process.env.PORT || 3000

async function startServer() {
    await connectDB()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}, in ${process.env.NODE_ENV} mode`)
    })
}

startServer()
    .then(() => console.log('Server is running..'))
    .catch(err => {
        console.log('Failed to start server ', err)
        process.exit(1)
    })