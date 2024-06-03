import express from 'express';
import userController from '../controllers/cliente.controller.js';
import {validId, validUsuario} from '../middlewares/global.middlewares.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const route = express.Router();

route.post('/',userController.createUsuario);
route.get('/',authMiddleware, userController.getAllUsuario);
route.get('/:id', validId, validUsuario, authMiddleware, userController.getByIdCliente);
route.patch('/:id', validId, validUsuario, authMiddleware, userController.updateUsuario);
route.delete('/:id', validId, validUsuario,authMiddleware, userController.deleteUsuario);

export default route;
