import { Database } from "./src/config/db.js";
import { Server } from "./src/config/server.js";


const main = async () => {

  const ServerInit = new Server(); 
  const DatabaseInit = new Database();

  DatabaseInit.sequelizeInit(); 
  await DatabaseInit.createConnection(); 
  const models = DatabaseInit.modelsInit(); 
  // DatabaseInit.associations(models);
  await DatabaseInit.sequelizeSync(); 
  ServerInit.create(); 
}

main();