import express, { Application } from 'express';
import routesProduct from '../routes/product'
import routesUser from '../routes/user'
import { Product } from './product';
import { User } from './user';

class Server {
    private app: Application;
    private port: string | undefined;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.midlewares();
        this.listen();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
        });
    }

    routes() {
        this.app.use('/api/products', routesProduct)
        this.app.use('/api/users', routesUser)
    }

    midlewares() {
        this.app.use(express.json())
    }

    async dbConnect() {
        try {
            await Product.sync();
            await User.sync();
        } catch (error) {
            console.log('Unable to connect to database, [error]: ', error);
        }
    }
}

export default Server