//////////////////
// Archivo de ruteo principal
//////////////////

import express from 'express';
import cors from 'cors';
import businessRoutes from './routes/businessRoute.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', businessRoutes);

export default app;