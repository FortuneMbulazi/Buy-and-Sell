import Hapi, { server } from '@hapi/hapi';
import routes from './routes';
import { db } from './database';

let server;

const start = async() => {
    server = Hapi.Server({
        port: 8000,
        host: 'localhost'
    });

    routes.forEach(route => server.route(route));

    db.connect();
    await server.start();
    console.log(`Server is listining on ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});

process.on('SIGINT', async () =>{
    console.log('Stopping server...');
    await server.stop({timeout: 1000});
    db.end();
    console.log('Server stopped');
    process.exit(0);
});

start();