export class Configuration {

  constructor() {
    this.ENV = process.env.NODE_ENV || 'dev';
  }; 

  get getCorsOptions() { return this.cors[this.ENV]; }; 
  get getConfig() { return this.config[this.ENV]; }
  get getDbConnect() { return this.DBConecction[this.ENV]}

  cors = {
    dev: {
      origin: '*',
      methods: 'GET,POST,PUT,DELETE',
      allowHeaders: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MDS. Content-Type, Date, X-Api-Version',
      credentials: true,
      optionsSuccessStatus: 200,
    }, 

    prod: {
      origin: process.env.WEB_URL,
      methods: 'GET,POST,PUT,DELETE',
      allowHeaders: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MDS. Content-Type, Date, X-Api-Version',
      credentials: true,
      optionsSuccessStatus: 200,
    }
  }; 

  config = {
    dev: {
      PORT: 3000
    },
    prod: {
      PORT: process.env.PORT
    }
  }

  DBConecction = {
    dev: {
      DB_HOST: process.env.DB_HOST_DEV,
      DB_USER: process.env.DB_USER_DEV,
      DB_PASSWORD: process.env.DB_PASSWORD_DEV,
      DB_DATABASE: process.env.DB_DATABASE_DEV,
    },

    prod: {
      DB_HOST: process.env.DB_HOST,
      DB_USER: process.env.DB_USER,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_DATABASE: process.env.DB_DATABASE,      
    }
  }; 

}; 