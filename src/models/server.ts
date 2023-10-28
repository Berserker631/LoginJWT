import express, { Application } from 'express';
import routesProduct from '../routes/product'
import routesUser from '../routes/user'
import routesLogin from "../routes/login";
import { Product } from './product';
import { User } from './user';
import cors from 'cors';

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
        this.app.use('/api/', routesLogin)
    }

    midlewares() {
        this.app.use(express.json())
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await Product.sync();
            await User.sync();
        } catch (error) {
        }
    }
}

export default Server