import { config } from 'dotenv'; 
import Sequelize from 'sequelize';

config();

// Variables de entorno globales | Sacadas de .env
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env; 

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  // dialect: 'mysql',
  dialect: 'mssql',
  dialectOptions: {
  options: {
      encrypt: false,
      tdsVersion: '8_0', 
  },
  },
  logging: false, // Bloquear los mensajes de Sequelize en la consola.
});

// Verificación de conexión a la base de datos 
const tryConnection = async () => {
  try {
      await sequelize.authenticate()
      .then(() => {
      console.log('Conexión a la base de datos establecida correctamente.');})
  }
  catch (err) {
      console.error('Error al conectar a la base de datos:', err.message);
      console.error('Error details:', err);
      if (err.original) {
      console.error('Original error details:', err.original);
      }
  }
}

import UserModel from '../models/User.model.js';
const User = UserModel(sequelize); 

import ManangementHistoryModel from '../models/ManangementHistory.model.js';
const ManangementHistory = ManangementHistoryModel(sequelize); 

import CurrencyTypeModel from '../models/CurrencyType.model.js';
const CurrencyType = CurrencyTypeModel(sequelize); 

import LogHistoryModel from '../models/LogHistory.model.js';
const LogHistory = LogHistoryModel(sequelize); 

import ExpensesModel from '../models/Expenses.model.js';
const Expenses = ExpensesModel(sequelize);

import CategoryModel from '../models/Category.model.js'; 
const Category = CategoryModel(sequelize);

import SaleHistoryModel from '../models/SaleHistory.model.js';
const SaleHistory = SaleHistoryModel(sequelize);


sequelize.sync({alter : true}) // {alter : true} | alter: Actualiza las tablas creadas de las bases de datos. 
    .then(() => {
        console.log('Modelo sincronizado con la base de datos.');
    })
    .catch(err => {
        console.error('Error al sincronizar el modelo con la base de datos:', err);
    });

export {
  tryConnection,
  User, 
  ManangementHistory,
  CurrencyType,
  LogHistory,
  Expenses,
  SaleHistory,
  Category,
  sequelize
}