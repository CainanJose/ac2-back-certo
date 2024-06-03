import {loginService, generateToken} from '../services/auth.service.js';
import bcrypt from 'bcryptjs';

const login = async (req, res)=>{
    try {
        //DESESTRUTURANDO REQ EM VARIAVEIS
        const {email, senha} = req.body;

        //SOLICITANDO AO SERVICE A CONSULTA DE USUARIO
        const usuario = await loginService(email);

        //VERIFICANDO SE EXISTE USUARIO
        if(!usuario){
            return res.status(400).send({menssagem: "Usuario não encontrado"});
        }

        //VERIFICANDO SENHA
        const senhaIsValid = bcrypt.compareSync(senha, usuario.senha);
        if(!senhaIsValid){
            return res.status(400).send({menssagem: "senha não confere"});
        }
        
        //GERANDO TOKEN DE ACESSO
        const token = generateToken(usuario.id);

        //RETORNA O TOKEN
        res.send(token);
    } catch (error) {
        //RETORNA ERRO CASO NÃO COSSIGA EXECUTAR O TRY
        res.status(500).send({menssagem: error.message});
    }
    
    
}

export {login};