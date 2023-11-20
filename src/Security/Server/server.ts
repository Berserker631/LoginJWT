import express, { Application } from 'express';
import routesItem from "../Routes/item";
import routesUser from '../Routes/user';
import { Employee } from '../../HumanResources/Models/employee';
import  routesEmployee  from '../../HumanResources/Routes/employee';
import { Item } from '../Models/menu-item';
import { User } from '../Models/user';
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
        this.app.use('/api/users', routesUser)
        this.app.use('/api/menu', routesItem)
        this.app.use('/api/employee', routesEmployee)
    }

    midlewares() {
        this.app.use(express.json())
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await User.sync();
            await Item.sync();
            await Employee.sync();
        } catch (error) {
        }
    }
}

export default Server