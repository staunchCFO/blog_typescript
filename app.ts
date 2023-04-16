import express, { Application, urlencoded } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from '@/middleware/error.middleware';


class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControlllers(controllers);
        this.initialiseErrorHandling();
    }

    private initialiseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(urlencoded({ extended: false}))
        this.express.use(compression());
    }

    private initialiseControlllers(controllers: Controller[]): void {
        controllers.forEach(controller => {
            this.express.use('/api', controller.router);
        })
    }

    private initialiseErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    private initialiseDatabaseConnection(): void {
        const { MONGO_PATH, MONGO_USER, MONGO_PASSWORD } = process.env;

        mongoose.connect(
            `mongoose+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}`
        );
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App is listening on port ${this.port}`)
        })
    }
}

export default App