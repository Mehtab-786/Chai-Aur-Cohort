import {createServer} from 'node:http';
import { createApplication } from './app/index.js';

async function main() {
    try {
        const server = createServer(createApplication());
        const PORT:number = 8000;
        server.listen(PORT,() => {
            console.log('Server running onnn port: ',PORT);
        })
    } catch (error) {
        console.log('Error starting the server')
        throw error;
    }
}
main()