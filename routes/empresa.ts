import express from "express";
const router = express.Router();
const EmpresaController = require("../controllers/empresa");

router.post("/crear_empresa", EmpresaController.empresa_crear);

router.get("/obtener_empresas", EmpresaController.obtener_empresas);


export default router;