//IMPORTS
import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './src/database/bd.js';

import clienteRoute from './src/routes/cliente.route.js';
import authRoute    from './src/routes/auth.route.js';
import tarefaRoute  from './src/routes/tarefa.route.js';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();


connectDatabase();
app.use(express.json());
app.use('/cliente', clienteRoute);
app.use('/login', authRoute);
app.use('/tarefa', tarefaRoute);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
