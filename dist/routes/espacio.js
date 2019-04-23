"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var EspacioController = require("../controllers/espacio");
router.post("/crear_espacio/:empresaID", EspacioController.crear_espacio);
router.get("/obtener_espacios/:empresaID", EspacioController.obtener_espacios);
router.put("/apartar_lugar", EspacioController.apartar_lugar);
router.get("/ver_espacio/:userID", EspacioController.ver_espacio);
router.put("/desapartar_lugar", EspacioController.desapartar_lugar);
exports.default = router;
