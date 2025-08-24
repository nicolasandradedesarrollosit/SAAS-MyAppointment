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

// health-check opcional
app.get('/health', (_req, res) => res.json({ ok: true, mensaje: 'API OK' }));

export default app;