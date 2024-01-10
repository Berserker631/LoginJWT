import express, { Application } from 'express';
import { Item, User } from '../../Security';
import { Employee } from "../../HumanResources";
import { routesEmployee } from "../../HumanResources";
import { routesUser, routesItem } from "../../Security";
import cors from 'cors';
import routesAccess from '../../Administration/Routes/access';
import bodyParser from "body-parser";

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
        this.app.use('/api/administration', routesAccess)
    }

    midlewares() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(express.json());
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