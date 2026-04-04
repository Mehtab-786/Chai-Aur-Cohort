import { config } from 'dotenv'
config();

import app from './src/app.js'
import connectToDB from './src/common/config/db.js';

const PORT = process.env.PORT || 5000

async function startServer() {
    await connectToDB()
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT} in ${process.env.development} environment`);
        process.exit(1);
    });
};

startServer()
    .then(() => {
        console.log('Server is running succesfully');
    })
    .catch(error => {
        console.log('Failed to start server : ', error)
    })
