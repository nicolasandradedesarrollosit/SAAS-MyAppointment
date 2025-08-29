//////////////////
// Archivo con el puerto
//////////////////
import app from './app.js';

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== 'test') {
  console.log('▶️ Iniciando index.js…');
  app.listen(PORT, () => console.log(`Servidor siendo escuchado en el puerto ${PORT}`));
}