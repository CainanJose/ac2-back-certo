import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const ClienteSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true,
    },
    sobrenome:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    cargo:{
        type: String,
        required: true,
    },
    senha:{
        type: String,
        required: true,
        select: false,
    },
    status:{
        type: String,
        enum: ['ativo', 'inativo'], 
        default: 'ativo'
    }
})

ClienteSchema.pre('save', async function (next) {
    this.senha = await bcrypt.hash(this.senha, 10);
    next();
})

const Cliente = mongoose.model("Cliente",ClienteSchema);

export default Cliente;