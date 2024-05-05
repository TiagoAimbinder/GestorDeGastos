import express from 'express';
import cors from 'cors';
import http from 'http';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import routeIndex from './src/routes/route.Index.js';
import { tryConnection } from './src/config/db.js';

// .env conf
config();

// Configuración de Express: 
const app = express(); 

// Middlewares:
const corsOptions = {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowHeaders: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MDS. Content-Type, Date, X-Api-Version',
  credentials: true,
}; 
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions)); 

// Import API Routes: 
app.use('/', routeIndex);

// Iniciar Servidor: 
const server = http.createServer(app);
const PORT = process.env.PORT || 3000; 
server.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto: ${PORT}`);
});

tryConnection();