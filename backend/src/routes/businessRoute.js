////////////////////////
// Crea la ruta de la api, para las funciones de business
////////////////////////

import { Router } from 'express';
import {
  postCreateBusiness,
  getBusiness,
  getBusinesses,
  patchBusiness,
  deleteBusinessCtrl
} from '../controllers/businessController.js';

const router = Router();

router.post('/business', postCreateBusiness);
router.get('/business', getBusinesses);
router.get('/business/:id', getBusiness);
router.patch('/business/:id', patchBusiness);
router.delete('/business/:id', deleteBusinessCtrl);

export default router;