import mongoose from 'mongoose';
import service from '../services/cliente.service.js';

export const validId = (req, res, next) =>{
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({menssagem: "ID invalido"});
    }
    next();
};

export const validUsuario = async(req, res, next) =>{
    const id = req.params.id;

    const usuario = await service.getByIdService(id);

    if(!usuario){
        return res.status(400).send({menssagem: "Usuario não encontrado"});
    }

    req.id = id;
    req.usuario = usuario;

    next();
};
