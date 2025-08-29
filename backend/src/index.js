import express from 'express';
import cors from 'cors';
import businessPostRoute from './business/routes/routePostBusiness.js';
import clientPostRoute from './client/routes/routePostClient.js';

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', businessPostRoute);
app.use('/api', clientPostRoute);

if (process.env.NODE_ENV !== 'test') {
  console.log('▶️ Iniciando index.js…');
  app.listen(port, () => console.log(`Servidor siendo escuchado en el puerto ${port}`));
}