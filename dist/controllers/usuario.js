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
var usuario_1 = __importDefault(require("../models/usuario"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Por defecto el usuario se guarda como esperar
// Los controladores que el usuario puede hacer
//Registrarse
exports.user_registrarse = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var users, hashh, user, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, usuario_1.default.find({ email: req.body.email })];
            case 1:
                users = _a.sent();
                if (!(users.length >= 1)) return [3 /*break*/, 2];
                return [2 /*return*/, res.status(409).json({
                        message: "Mail exist"
                    })];
            case 2: return [4 /*yield*/, bcryptjs_1.default.hash(req.body.contraseña, 10)];
            case 3:
                hashh = _a.sent();
                user = new usuario_1.default({
                    nombre: req.body.nombre,
                    contraseña: hashh,
                    email: req.body.email,
                    tarjeta: req.body.tarjeta
                });
                return [4 /*yield*/, user.save()];
            case 4:
                result = _a.sent();
                return [2 /*return*/, res.status(201).json({
                        message: "User created",
                        result: result
                    })];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ err: err_1, message: "Usuario no pudo ser salvado" })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.user_iniciar_sesion = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var user, result, token, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, usuario_1.default.findOne({ email: req.body.email })];
            case 1:
                user = _a.sent();
                //Si el usuario no existe
                if (!user) {
                    return [2 /*return*/, res.status(401).json({
                            message: "Auth Failed, email does not recognized"
                        })];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(req.body.contraseña, user.contraseña)];
            case 2:
                result = _a.sent();
                //Si no hacen match, return
                if (!result) {
                    return [2 /*return*/, res.status(401).json({
                            message: "Auth failed, password incorrect"
                        })];
                }
                token = jsonwebtoken_1.default.sign({
                    email: user.email,
                    userId: user._id,
                    user_type: user.user_type
                }, "secret_this_should_be_longer");
                //Enviamos el json
                return [2 /*return*/, res.status(200).json({
                        token: token,
                        userData: {
                            _id: user._id,
                            user_type: user.user_type,
                            nombre: user.nombre
                        }
                    })];
            case 3:
                err_2 = _a.sent();
                res.status(401).json({
                    message: "Auth failed"
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.prueba = function (req, res, next) {
    res.send("Hola amigos");
};
