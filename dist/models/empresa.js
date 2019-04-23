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
var empresaSchema = new mongoose_1.Schema({
    nombreEmpresa: { type: String, required: true, unique: true },
    direccion: { type: String, required: true },
    cp: { type: String, default: "" },
    telefono: { type: String, default: "" },
    espacios: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Espacio" }],
    imagen: { type: String, default: "" }
});
empresaSchema.plugin(mongoose_unique_validator_1.default);
exports.default = mongoose_1.default.model("Empresa", empresaSchema);
