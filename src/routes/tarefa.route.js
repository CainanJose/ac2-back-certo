import express from 'express';
import tarefaController from '../controllers/tarefa.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const route = express.Router();

route.post('/',authMiddleware, tarefaController.createTarefa);
route.get('/', tarefaController.getAllTarefa);
route.get('/byUser', authMiddleware, tarefaController.getByUserTarefa);
route.get('/null', authMiddleware, tarefaController.getAllNull);
route.patch('/:id',authMiddleware, tarefaController.updateTarefa);
route.delete('/:id',authMiddleware, tarefaController.deleteTarefa);

export default route;