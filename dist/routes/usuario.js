"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var UserController = require("../controllers/usuario");
router.post("/registrarse", UserController.user_registrarse);
router.post("/iniciar_sesion", UserController.user_iniciar_sesion);
exports.default = router;
