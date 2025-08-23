import dotenv from 'dotenv';
dotenv.config({ debug: false });
console.log('▶️ Iniciando index.js…');

import express from 'express';
import cors from 'cors';
import { probarConexion } from './config/db.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

