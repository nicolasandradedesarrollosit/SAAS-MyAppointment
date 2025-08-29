////////////////////////
// Crea la ruta de la api, para las funciones de client
////////////////////////

import { Router } from 'express';
import {
  postCreateClient,
  getClient,
  getClients,
  patchClient,
  deleteClientCtrl
} from '../controllers/clientController.js';

const router = Router();

router.post('/client', postCreateClient);
router.get('/client', getClients);
router.get('/client/:email', getClient);
router.patch('/client/:id', patchClient);
router.delete('/client/:id', deleteClientCtrl);

export default router;