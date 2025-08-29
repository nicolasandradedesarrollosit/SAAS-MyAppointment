import express from 'express';
import createBusinessController from '../controllers/controllerPostBusiness.js';

const router = express.Router();

router.post('/business', createBusinessController);

export default router;