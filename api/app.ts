import * as bodyParser from "body-parser";
const path = require('path');
import * as express from "express";
import swaggerUi = require('swagger-ui-express');
import fs = require('fs');
import { connect, disconnect } from "../api/config/db.config";
import { StatusModel } from '../api/model/status.modal';
import { TicketsModel } from '../api/model/tickets.modal';

class App {

    public express: express.Application;

    /* Swagger files start */
    // private swaggerFile: any = (process.cwd()+"/swagger/swagger.json");
    // private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
    // private customCss: any = fs.readFileSync((process.cwd()+"/swagger/swagger.css"), 'utf8');
    // private swaggerDocument = JSON.parse(this.swaggerData);
    /* Swagger files end */


    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        connect();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express.static(path.join(__dirname, '../ui/build')));
    }

    private routes(): void {

        this.express.get('/api/get-status', async (req, res) => {
            try {
                const status = await StatusModel.find({});
                console.log('Status:::', status);
                res.json(status);
            } catch (error) {
                console.log("Error in get status",error);
                res.status(404);
            }
        });
        
        this.express.get('/api/get-ticket/:id', async (req, res) => {
            try {
                const tickets = await TicketsModel.findOne({id:Number(req.params.id)});
                console.log('Ticket:::', tickets);
                res.json(tickets);
            } catch (error) {
                console.log("Error in get ticket",error);
                res.status(404);
            }
        });

        this.express.post('/api/update-ticket', async (req, res) => {
            try {
                const {id,status} = req.body;
                console.log(req.body,'req');
                const tickets = await TicketsModel.findOneAndUpdate({id:Number(id)},{
                    status:Number(status)
                }, {new: true});
                console.log('Updated Ticket:::', tickets);
                res.json(tickets);
            } catch (error) {
                console.log("Error in get ticket",error);
                res.status(404);
            }
        });

        this.express.get("/", (req, res, next) => {
            res.sendFile(path.join(__dirname, '../ui/build/index.html'));
        });

        // swagger docs
        //this.express.use('/api/docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocument, null, null, this.customCss));

        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.sendFile(path.join(__dirname, '../ui/build/index.html'), function(err) {
                if (err) {
                  res.status(500).send(err)
                }
            })
            //res.send("Make sure url is correct!!!");
        });
    }
}

export default new App().express;