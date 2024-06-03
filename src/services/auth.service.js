import Cliente from '../models/Cliente.js';
import jwtoken from'jsonwebtoken';

const loginService = (email)=> Cliente.findOne({email: email, status:'ativo'}).select('+senha');

const generateToken = (id)=> jwtoken.sign({id:id},process.env.SECRET_JWT, {expiresIn:86400});

export {loginService, generateToken};