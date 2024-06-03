import mongoose from'mongoose';

const connectDatabase = () =>{
    console.log('Conectando com Banco de Dados');

    mongoose.connect(process.env.DB_URL)
    .then(()=>{console.log("Banco conectado com sucesso");})
    .catch((error)=> console.log(error));
}

export default connectDatabase;