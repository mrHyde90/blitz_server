"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var empresa_1 = __importDefault(require("../models/empresa"));
var espacio_1 = __importDefault(require("../models/espacio"));
exports.crear_espacio = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var foundEmpresa, newEspacio, resultEspacio, resultEmpresa, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, empresa_1.default.findById(req.params.empresaID)];
            case 1:
                foundEmpresa = _a.sent();
                if (!(foundEmpresa != undefined)) return [3 /*break*/, 4];
                newEspacio = new espacio_1.default({
                    empresaID: foundEmpresa._id,
                    numero: req.body.numero,
                    apartado: false
                    // usuarioData: userData
                });
                return [4 /*yield*/, newEspacio.save()];
            case 2:
                resultEspacio = _a.sent();
                foundEmpresa.espacios.push(resultEspacio._id);
                return [4 /*yield*/, foundEmpresa.save()];
            case 3:
                resultEmpresa = _a.sent();
                return [2 /*return*/, res.status(201).json({
                        resultEspacio: resultEspacio,
                        resultEmpresa: resultEmpresa,
                        message: "Espacio creado"
                    })];
            case 4: return [2 /*return*/, res.status(404).json({
                    message: "Empresa no encontrada"
                })];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ err: err_1, message: "Empresas no pudieron ser obtenidas" })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.obtener_espacios = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var espacios, cleanEspacios, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, espacio_1.default.find({ empresaID: req.params.empresaID })];
            case 1:
                espacios = _a.sent();
                cleanEspacios = espacios.map(function (foundEspacio) {
                    return {
                        numero: foundEspacio.numero,
                        apartado: foundEspacio.apartado,
                        _id: foundEspacio._id
                    };
                });
                res.status(200).json({
                    espacios: cleanEspacios,
                    numeroEspacios: cleanEspacios.length
                });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ err: err_2, message: "Espacios no pudideron ser obtenidos" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.apartar_lugar = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var userData, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userData = {
                    usuarioID: req.body.usuarioID,
                    nombreUsuario: req.body.nombreUsuario,
                    horaEntrada: req.body.horaEntrada,
                    horaSalida: req.body.horaSalida
                };
                return [4 /*yield*/, espacio_1.default.updateOne({ _id: req.body.espacioID }, { $set: { usuarioData: userData, apartado: true } })];
            case 1:
                _a.sent();
                res.status(200).json({
                    message: "Se aparto el lugar"
                });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({ err: err_3, message: "No se pudo apartar el lugar" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.desapartar_lugar = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var userData, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userData = {
                    nombreUsuario: "",
                    horaEntrada: "",
                    horaSalida: ""
                };
                return [4 /*yield*/, espacio_1.default.updateOne({ _id: req.body.espacioID }, { $set: { usuarioData: userData, apartado: false } })];
            case 1:
                _a.sent();
                res.status(200).json({
                    message: "Se desaparto el lugar"
                });
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ err: err_4, message: "No se pudo desapartar el lugar" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.ver_espacio = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var espacioFound, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, espacio_1.default.findOne({ "usuarioData.usuarioID": req.params.userID })];
            case 1:
                espacioFound = _a.sent();
                if (espacioFound != undefined) {
                    res.status(200).json({
                        _id: espacioFound._id,
                        numero: espacioFound.numero,
                        usuarioData: espacioFound.usuarioData,
                        apartado: espacioFound.apartado
                    });
                }
                else {
                    res.status(200).json({
                        _id: "",
                        numero: "",
                        usuarioData: "",
                        apartado: ""
                    });
                }
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                return [2 /*return*/, res.status(500).json({ err: err_5, message: "No se pudo encontrar el lugar" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
/*
numero: Number;
        usuarioData?: {
            usuarioID: mongoose.Schema.Types.ObjectId,
            nombreUsuario: string,
            horaEntrada: Date,
            horaSalida: Date,
        }
        apartado: boolean;
*/ 
