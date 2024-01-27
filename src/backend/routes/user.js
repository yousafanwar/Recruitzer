import express from 'express';
import * as userRepository from '../services/user.js';
import * as auth from '../services/auth.js';

let userRoutes = express.Router();

userRoutes.get('/', auth.authenticate, userRepository.getUsers);
userRoutes.get('/:id', auth.authenticate, userRepository.getUser);
userRoutes.post('/', auth.authenticate, userRepository.addUser);
userRoutes.put('/', auth.authenticate, userRepository.updateUser);

userRoutes.put('/delete', auth.authenticate, userRepository.deleteUser);
export default userRoutes;
