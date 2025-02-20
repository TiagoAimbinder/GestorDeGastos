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

  appConfig = () => {
    const APP = express();
    const CORS_OPTIONS = this.config.getCorsOptions();

    const APP_PARAMS = [
      cors(CORS_OPTIONS),
      express.json(),
      express.urlencoded({ extended: true }),
      helmet(),
      bodyParser.json(),
      this.ROUTE_INDEX.routesInit()
    ];  

    for (const PARAM of APP_PARAMS) { APP.use(PARAM); }

    return APP;
  }

  create = () => {
    const SERVER = process.env.NODE_ENV === 'dev' ? http.createServer(this.appConfig()) : https.createServer(this.appConfig());
    const PORT = this.ENV.PORT;
    SERVER.listen(PORT, () => { console.log(`✅ | Express Server | PORT: ${PORT} `);});
};

}