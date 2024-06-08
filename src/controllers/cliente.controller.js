import userService from '../services/cliente.service.js';

const createUsuario = async (req, res)=>{
    try {
        
        //DESSETRUTURANDO OBJETO EM VARIAVEIS
        const {nome, sobrenome, email, cargo, senha} = req.body;

        //VALIDANDO VARIAVEIS
        if(!nome || ! sobrenome || !email || !cargo || !senha){
            //RETORNANDO ERRO 400(BAD REQUEST) SE FALTAR DADOS
            res.status(400).send({menssagem: "preencha todos os campos para registro."})
        }

        //SOLICITANDO AO SERVICE A CRIAÇÃO DO USUARIO
        const cliente = await userService.createService(req.body);

        if(!cliente){
            return  res.status(400).send({menssagem: "Erro no cadastro de cliente"})
        }

        //CRIANDO OBJ CLIENTE RESULTADO PARA EXIBIR NA RESPONSE
        let clienteRes = {
            id: cliente._id,
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            cargo: cargo
        }    

        //RETORNANDO SUCESSO COM MENSAGEM E CLIENTE CADASTRADO
        res.status(201).send({
            menssagem: "Cliente cadastrado com sucesso",
            clienteRes
        });

    } catch (error) {
        //RETORNA ERRO CASO NÃO COSSIGA EXECUTAR O TRY
        res.status(500).send({menssagem: error.message});
    }

}

const getAllUsuario = async (req, res)=>{
    try {
        //SOLICITANDO AO SERVICE O GET DE TODOS OS USUARIOS
        const usuarios = await userService.getAllService();

        //VERIFICANDO SE A LISTA DE USUARIOS É MENOR QUE 1
        if(usuarios.length < 1){
            return res.status(400).send({menssagem: "Não há usuario cadastrado"});
        }

        //RETORNANDO LISTA DE USUARIOS
        res.send(usuarios);

    } catch (error) {
        //RETORNA ERRO CASO NÃO COSSIGA EXECUTAR O TRY
        res.status(500).send({menssagem: error.message});
    }
}

const getContByCargo = async (req, res)=>{
    try {
        //SOLICITANDO AO SERVICE O GET DE TODOS OS USUARIOS
        const usuarios = await userService.getAllService();

        //VERIFICANDO SE A LISTA DE USUARIOS É MENOR QUE 1
        if(usuarios.length < 1){
            return res.status(400).send({menssagem: "Não há usuario cadastrado"});
        }

        const contCargos = {};
        
        usuarios.forEach(usuario => {
            const cargo = usuario.cargo; // supondo que o campo do cargo é 'cargo'
            if (contCargos[cargo]) {
                contCargos[cargo]++;
            } else {
                contCargos[cargo] = 1;
            }
        });
        

        //RETORNANDO LISTA DE USUARIOS
        res.send(contCargos);

    } catch (error) {
        //RETORNA ERRO CASO NÃO COSSIGA EXECUTAR O TRY
        res.status(500).send({menssagem: error.message});
    }
}

const getByIdCliente = async  (req, res)=>{
    const cliente = req.cliente;
    res.send(cliente);
}

const updateUsuario = async  (req, res)=>{
    try {
        //DESESTRUTURANDO EM VARIAVEIS
        const {nome, sobrenome, email, cargo, senha, status} = req.body;
        const {id} = req.params;

        //VERIFICANDO SE PELO MENOS UM CAMPO FOI PREENCHIDO
        if(!nome && !sobrenome && !email && !cargo && !senha && !status){
            
            res.status(400).send({menssagem: "preencha pelo menos um campo para atualização."})
        }

        //SOLICITANDO AO SERVICE A BUSCA DO USUARIO
        const usuario = await userService.getByIdService(id);

        //VERIFICANDO SE O USUARIO É DIVERENTE
        if(String(usuario._id) != req.userId){
            return res.status(400).send({menssagem: "Voce não pode atualizar outro usuario"});
        }

        //SOLICITANDO AO SERVICE A ATUALIZAÇÃO DE DADOS
        await userService.updateService(
            id,
            nome,
            sobrenome,
            email,
            cargo,
            senha, 
            status
        );

        res.status(200).send({menssagem:"Cliente autalizado com sucesso"});

    } catch (error) {
        //RETORNA ERRO CASO NÃO COSSIGA EXECUTAR O TRY
        res.status(500).send({menssagem: error.message});
    }

}

const deleteUsuario = async (req, res)=>{
    try {
        const {id} = req.params;
        console.log(req.userId);

        const usuario = await userService.getByIdService(id);

        //VERIFICANDO SE O USUARIO É DIVERENTE
        if(String(usuario._id) != req.userId){
            return res.status(400).send({menssagem: "Voce não pode deletar outro usuario",usuario: usuario._id,requser: req.userId});
        }

        await userService.deleteService(id);

        return res.status(200).send({menssagem: "Usuario deletado"});
    } catch (error) {
        res.status(500).send({menssagem: error.message});
    }

}


export default { 
    createUsuario,
    getAllUsuario,
    getByIdCliente,
    updateUsuario,
    deleteUsuario,
    getContByCargo
};