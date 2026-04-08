import { configDotenv } from 'dotenv';
configDotenv();     // path optional

import app from './src/app.js'
import dbConnect from './src/common/config/db.config.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
    await dbConnect();
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT} port in ${process.env.NODE_ENV} environment`);
    });
};

startServer()
    .then(() => console.log('Server is connected succesfully'))
    .catch(err => {
        console.error('Error while connnecting to server', err)
        process.exit(1)
    })