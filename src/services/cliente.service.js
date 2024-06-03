import Cliente from '../models/Cliente.js';

const createService = (body)=> Cliente.create(body);
const getAllService = ()=> Cliente.find({status:"ativo"});
const getByIdService = (id)=>Cliente.findById(id);

const updateService = (id,nome,sobrenome,email,cargo,senha,status)=> {
    return Cliente.findOneAndUpdate({_id: id},{nome,sobrenome,email,cargo,senha,status})
}

const deleteService = (id)=>Cliente.findOneAndDelete({_id:id});

export default {
    createService,
    getAllService,
    getByIdService,
    updateService,
    deleteService
};