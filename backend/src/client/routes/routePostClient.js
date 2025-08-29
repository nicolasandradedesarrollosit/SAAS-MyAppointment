import express from 'express';
import createClientController from '../controllers/controllerPostClient.js';

const router = express.Router();

router.post('/client', createClientController);

export default router;