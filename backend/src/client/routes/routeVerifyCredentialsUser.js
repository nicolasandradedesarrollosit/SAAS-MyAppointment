import express from 'express';
import controllerUserVerifyCredentials from '../controllers/controllerVerifyCredentialsClient.js';

const router = express.Router();

router.post('/client/:email', controllerUserVerifyCredentials);

export default router;