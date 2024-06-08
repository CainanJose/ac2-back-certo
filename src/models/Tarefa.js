import mongoose from 'mongoose';

const TarefaSchema = new mongoose.Schema({
    titulo:{
        type: String,
        require: true,
    },
    descricao:{
        type: String,
        require: true,
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Cliente",
        require: true
    },
    colaborador:{
        type: String,
        ref:"Cliente",  
        require: false
    },
    status:{
        type: String,
        enum: ['incompleto', 'completo'], 
        default: 'incompleto'
    }
});

const Tarefa = mongoose.model("Tarefa", TarefaSchema);

export default Tarefa;