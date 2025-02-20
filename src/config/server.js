import express from 'express'; 
import cors from 'cors'; 
import http from 'http'; 
import helmet from 'helmet';
import bodyParser from 'body-parser';

import { config as dotenvConfig } from 'dotenv'; 
import { Configuration } from './config.js';
import * as https from 'https';
import { RouteIndex } from "../routes/route.Index.js";
// import { GeneralMwr } from '../middlewares/general.middleware.js';

export class Server {

  constructor() {
    dotenvConfig();

    this.config = new Configuration();
    this.ROUTE_INDEX = new RouteIndex();
    this.ENV = process.env.NODE_ENV; 
  }


  APP_PARAMS = () => {
    const CORS_OPTIONS = this.config.getCorsOptions();
    const ROUTE_INDEX = this.ROUTE_INDEX.routesInit()

    return [
      cors(CORS_OPTIONS),
      express.json(),
      express.urlencoded({ extended: true }),
      helmet(),
      bodyParser.json(),
      ROUTE_INDEX, 
    ]
  }


  appConfig = () => {
    const APP = express();
    for (const PARAM of this.APP_PARAMS()) { APP.use(PARAM); }
    return APP;
  }


  create = () => {
    // const SERVER = process.env.NODE_ENV === 'dev' ? http.createServer(this.appConfig()) : https.createServer(this.appConfig());
    const SERVER = http.createServer(this.appConfig());
    const PORT = this.ENV.PORT;
    SERVER.listen(PORT, () => { console.log(`✅ | Express Server | PORT: ${PORT} `);});
};

}