import express from "express";
const router = express.Router();
const EspacioController = require("../controllers/espacio");

router.post("/crear_espacio/:empresaID", EspacioController.crear_espacio);

router.get("/obtener_espacios/:empresaID", EspacioController.obtener_espacios);

router.put("/apartar_lugar", EspacioController.apartar_lugar);

router.get("/ver_espacio/:userID", EspacioController.ver_espacio);

router.put("/desapartar_lugar", EspacioController.desapartar_lugar);

export default router;