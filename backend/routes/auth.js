import express from 'express';
import * as auth from '../services/auth.js';

const indexRoutes = express.Router();

indexRoutes.post('/login', auth.login);

export default indexRoutes;
