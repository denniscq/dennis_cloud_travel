import * as dotenv from "dotenv";
dotenv.config();
import express from "express"
import bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./route/index"
import morgan from 'morgan'
import config from './config';
import cors from 'cors'
import handleError from './middleware/errorHandler';
import init from "../mock/initalData";

const port = process.env.PORT || config.service.port || 3000;
console.log(port)
AppDataSource.initialize().then(async () => {
    // create express app
    const app = express()
    app.use(morgan('combined', { immediate: true }))
    app.use(bodyParser.json())

    // turn on CORS for white list domain
    const allowedDomains = process.env.NODE_ENV === 'local' ? ['http://localhost:8080'] : config.whiteList;
    const options: cors.CorsOptions = {
        origin: function (origin, callback) {
            if (!origin)
                return callback(null, true);

            if (allowedDomains.indexOf(origin) === -1) {
                var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
                return callback(new Error(msg), false);
            }

            return callback(null, true);
        },
        methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
        credentials: true,
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
    app.use(cors(options))
    app.options('*', cors(options))

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
            try {
                const result = await (new (route.controller as any))[route.action](req, res, next)
                res.json(result);
            } catch (error) {
                next(error);
            }
        })
    })

    app.use(handleError);

    // start express server
    app.listen(3000)

    // RUNNING
    console.log(`Express server has started on port ${port}. Open http://localhost:${port}`)

    // !!! if you're first time to run that plese uncomment, otherwise please comment this line.
    // init data for local runing
    await init(AppDataSource)
}).catch(error => console.log(error))
