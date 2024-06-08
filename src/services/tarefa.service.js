import Tarefa from '../models/Tarefa.js';

const createService = (body)=> Tarefa.create(body);
const getAllService = ()=> Tarefa.find().populate("usuario","colaborador");
const getByIdService = (id)=>Tarefa.findById(id);
const getByUserService = (id)=> Tarefa.find({$or:[{usuario:id}, {colaborador:id}]}).populate("usuario","colaborador");
const getNullService = ()=> Tarefa.find({colaborador:""}).populate("usuario","colaborador");
const updateService = (id, titulo, descricao, status)=>{
    return Tarefa.findOneAndUpdate({_id:id},{titulo,descricao,status});
}
const deleteService = (id)=>Tarefa.findByIdAndDelete({_id:id});

export default{
    createService,
    getAllService,
    getByIdService,
    getByUserService,
    updateService,
    deleteService,
    getNullService
}