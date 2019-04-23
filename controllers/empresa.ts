import Empresa from "../models/empresa";
import {Request, Response} from "express";
import mongoose from 'mongoose';

exports.empresa_crear = async (req: Request, res: Response, next: Function)  => {
    try{
        const findEmpresa = await Empresa.find({nombreEmpresa: req.body.nombreEmpresa});
        if(findEmpresa.length > 1){
            return res.status(409).json({
                message: "Empresa existe"
            });
        } else{
            const newEmpresa = new Empresa({
                nombreEmpresa: req.body.nombreEmpresa,
                direccion: req.body.direccion,
                cp: req.body.cp,
                telefono: req.body.telefono,
                imagen: req.body.imagen
            });
            const result = await newEmpresa.save();
            return res.status(201).json({
                message: "Empresa creada",
                result: result
            });
        }
    }
    catch(err){
        return res.status(500).json({err: err, message: "Empresa no pudo ser salvada"});
    }
}

exports.obtener_empresas = async (req: Request, res: Response, next: Function) => {
    try{
        const empresas = await Empresa.find();

        const empresasClean = empresas.map(empresa => {
            return{
                nombreEmpresa: empresa.nombreEmpresa,
                imagen: empresa.imagen,
                _id: empresa._id
            }
        });
        res.status(200).json({
            empresasClean
        });
    }
    catch(err){
        return res.status(500).json({err: err, message: "Empresas no pudieron ser obtenidas"});
    }
}