import mongoose, {Schema, Document} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface IUser extends Document {
    nombre: string;
    contraseña: string;
    email: string;
    user_type: string;
    tarjeta: string;
    lugares: {nombreEmpresa: string, numero: Number}[];
}

const userSchema: Schema = new Schema({
    nombre: {type: String, required: true}, 
    contraseña: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    tarjeta: {type:String, required: true},
    lugares: [{
        nombreEmpresa: {type: String},
        numero: {type: Number}
    }],
    user_type: {type: String, enum: ["Aceptado", "Owner"], default: "Aceptado"}
});

userSchema.plugin(uniqueValidator);

export default  mongoose.model<IUser>("User", userSchema);