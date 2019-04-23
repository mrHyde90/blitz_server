"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var espacioSchema = new mongoose_1.Schema({
    empresaID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Empresa" },
    numero: { type: Number, required: true },
    usuarioData: {
        usuarioID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
        nombreUsuario: { type: String },
        horaEntrada: { type: String },
        horaSalida: { type: String },
    },
    apartado: { type: Boolean, dafault: false }
});
espacioSchema.plugin(mongoose_unique_validator_1.default);
exports.default = mongoose_1.default.model("Espacio", espacioSchema);
