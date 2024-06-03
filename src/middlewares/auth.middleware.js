import dotenv from'dotenv';
import jwtoken from'jsonwebtoken';
import userService from'../services/cliente.service.js';

dotenv.config();

const authMiddleware = (req, res, next)=>{
   try {
        const {authorization} = req.headers;

        if(!authorization){
            return res.status(401);
        }

        const authParts = authorization.split(" ");


        if(authParts.length !== 2){
            return res.status(401);
        }

        const [schema, token] = authParts;

        if(schema !== "Bearer"){
            return res.status(401);
        }

        jwtoken.verify(token,process.env.SECRET_JWT, async(error, decoded)=>{
            if(error){
                return res.status(401).send({menssagem: "Token invalido"});
            }
            const user = await userService.getByIdService(decoded.id);

            if(!user || !user.id){
                return res.status(401).send({menssagem: "Token invalido"})
            }

            req.userId = user._id;
            return next();
        });        

   } catch (error) {
    res.status(500).send(error.message);
   }

}


export default authMiddleware;
