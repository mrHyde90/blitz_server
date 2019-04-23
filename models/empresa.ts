import mongoose, {Schema, Document} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface IEmpresa extends Document{
    nombreEmpresa: string;
    direccion: string;
    cp: string;
    telefono: string;
    espacios: mongoose.Schema.Types.ObjectId[];
    imagen: string;
}

const empresaSchema = new Schema({
    nombreEmpresa: {type: String, required: true, unique: true},
    direccion: {type: String, required: true},    
    cp: {type: String, default: ""}, 
    telefono: {type: String, default: ""},
    espacios: [{type: mongoose.Schema.Types.ObjectId, ref: "Espacio"}],
    imagen: {type: String, default: ""}
});

empresaSchema.plugin(uniqueValidator);

export default mongoose.model<IEmpresa>("Empresa", empresaSchema);