import express from 'express';

import { login, logout } from '../controllers/Auth';

const authRoutes = express.Router();

authRoutes.all('/login', login);
authRoutes.all('/logout', logout);

export default authRoutes;
