import "reflect-metadata";
import {createConnection, createConnections} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import * as https from "https";
import * as fs from "fs";
import {Routes} from "./routes";
import {SisUsuarios} from "./entity/SisUsuarios";
import { SisBitacoraSession } from "./entity/SisBitacoraSession";
import { SisBitacoraSessionExpmovil } from "./entity/SisBitacoraSessionExpmovil";
import { SisUsuarioExpmovil } from "./entity/SisUsuarioExpmovil";
import { RmRegistroMovil } from "./entity/RmRegistroMovil";


createConnections(
    [
        {
            name:"aforecoppel.com",
            type: "postgres",
            host: "127.0.0.1",
            port: 5432,
            username: "postgres",
            password: "lospanteraS1",
            database: "oauth",
            entities: [
                // SisUsuarios,
                // SisBitacoraSession,
                // SisBitacoraSessionExpmovil,
                // RmRegistroMovil,
                // SisUsuarioExpmovil,
            ],
            /*cache: {
                duration: 180000 // 30 seconds
            }*/
            cache: true,
            synchronize: true,
            logging: false
        },
        {
            name:"aforeglobal",
            type: "postgres",
            host: "127.0.0.1",
            port: 5432,
            username: "postgres",
            password: "lospanteraS1",
            database: "aforeglobal",
            entities: [
                // SisUsuarios,
                // SisBitacoraSession,
                // SisBitacoraSessionExpmovil,
                // RmRegistroMovil,
                // SisUsuarioExpmovil,
            ],
            /*cache: {
                duration: 180000 // 30 seconds
            }*/
            cache: true,
            synchronize: true,
            logging: false
        }
    ]

).then(async connection => {
    let ip = "0.0.0.0";
    let port= 3000;

    // create express app
    const app = express();
    app.use(bodyParser.json({limit: '150mb'}));
    
    // register express routes from defined application routes
    Routes.forEach(route => {        
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            console.log(route.method);
            console.log(route.route);
            const result = (new (route.controller as any))[route.action](req, res, next);
            console.log(route.action);

            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
            } else if (result !== null && result !== undefined) {
                res.json(result);
            }

        });
    });

    // setup express app here
    // ...
    // start express server
    app.listen(port,ip);

    console.log("Express server has started on port 8001. Open http://"+ip+":"+port+"/ to see results");

}).catch(error => console.log(error));
