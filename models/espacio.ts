import mongoose, {Schema, Document} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface IEspacio extends Document{
        numero: Number; 
        usuarioData: {
            usuarioID: mongoose.Schema.Types.ObjectId,
            nombreUsuario: string,
            horaEntrada: string,
            horaSalida: string,
        }
        apartado: boolean;
}

const espacioSchema = new Schema({
        empresaID: {type: mongoose.Schema.Types.ObjectId, ref: "Empresa"},
        numero: {type:Number, required: true},
        usuarioData: {
            usuarioID: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
            nombreUsuario: {type: String},
            horaEntrada: {type: String},
            horaSalida: {type: String},
        },
        apartado: {type: Boolean, dafault: false}
});

espacioSchema.plugin(uniqueValidator);

export default mongoose.model<IEspacio>("Espacio", espacioSchema);