import express from 'express';
import controllerBusinessVerifyCredentials from '../controllers/controllerVerifyCredentialsBusiness.js';

const router = express.Router();

router.post('/business/:email', controllerBusinessVerifyCredentials);

export default router;