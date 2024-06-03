import tarefaService from '../services/tarefa.service.js';

const createTarefa = async (req, res)=>{
    const {titulo, descricao} = req.body;
    const userId = req.userId;

    try {

        if(!titulo || !descricao){
            res.status(400).send({menssagem: "preencha todos os campos para registro."})
        }

        await tarefaService.createService({
            titulo,
            descricao,
            usuario: userId,
        })

        res.status(201).send({menssagem:"tarefa adicionada"});
    } catch (error) {
        //RETORNA ERRO CASO NÃO COSSIGA EXECUTAR O TRY
        res.status(500).send({menssagem: error.message});
    }
    
};

const getAllTarefa = async(req, res)=>{
   try {
        const tarefas = await tarefaService.getAllService();

        if(tarefas.length < 1){
            return res.status(400).send({menssagem: "Não há tarefas cadastradas"});
        }

        res.send(tarefas);
   } catch (error) {
        //RETORNA ERRO CASO NÃO COSSIGA EXECUTAR O TRY
        res.status(500).send({menssagem: error.message});
   }
};

const getByUserTarefa = async(req, res)=>{
    try {
        const id = req.userId;
        console.log(id);
        const tarefas = await tarefaService.getByUserService(id);

        return res.send({tarefas});
    } catch (error) {
        res.status(500).send({menssagem: error.message});
    }
}

const updateTarefa = async(req, res)=>{
    try {
        const {titulo, descricao, status} = req.body;
        const {id} = req.params;
    
        if(!titulo && !descricao && !status){
            res.status(400).send({menssagem: "preencha pelo menos um campo para atualização."});
        }
    
        const tarefa = await tarefaService.getByIdService(id);

        if(String(tarefa.usuario._id) != req.userId){
            return res.status(400).send({menssagem: "Voce não pode atualizar tarefas de outro usuario"});
        }
    
        await tarefaService.updateService(
            id,
            titulo,
            descricao,
            status
        );
    
        res.status(200).send({menssagem:"tarefa atualizada com sucesso"});
    } catch (error) {
        //RETORNA ERRO CASO NÃO COSSIGA EXECUTAR O TRY
        res.status(500).send({menssagem: error.message});
    }

}

const deleteTarefa = async(req, res)=>{
    try {
        const {id} = req.params;

        const tarefa = await tarefaService.getByIdService(id);

        //VERIFICANDO SE O USUARIO É DIVERENTE
        if(String(tarefa.usuario._id) != req.userId){
            return res.status(400).send({menssagem: "Voce não pode deletar outro usuario"});
        }

        await tarefaService.deleteService(id);

        return res.status(200).send({menssagem: "tarefa deletada"});

    } catch (error) {
        res.status(500).send({menssagem: error.message});
    }
}


export default {
    createTarefa,
    getAllTarefa,
    getByUserTarefa,
    updateTarefa,
    deleteTarefa
}