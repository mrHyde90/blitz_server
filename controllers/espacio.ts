import Empresa from "../models/empresa";
import {Request, Response} from "express";
import mongoose from 'mongoose';
import Espacio from "../models/espacio";


exports.crear_espacio = async (req: Request, res: Response, next: Function) => {
    try{
        //Encontrar la empresa
        const foundEmpresa = await Empresa.findById(req.params.empresaID);
        //Crear el espacio
        /*const userData = {
            nombreUsuario: "",
            horaEntrada: "",
            horaSalida: ""
        }; */
        if(foundEmpresa != undefined){
            const newEspacio = new Espacio({
                empresaID: foundEmpresa._id,
                numero: req.body.numero,
                apartado: false
               // usuarioData: userData
            });
            const resultEspacio = await newEspacio.save();
            foundEmpresa.espacios.push(resultEspacio._id);
            const resultEmpresa = await foundEmpresa.save();
            return res.status(201).json({
                resultEspacio: resultEspacio,
                resultEmpresa: resultEmpresa,
                message: "Espacio creado"
            });
        } else{
            return res.status(404).json({
                message: "Empresa no encontrada"
            });
        }
        
    }
    catch(err){
        return res.status(500).json({err: err, message: "Empresas no pudieron ser obtenidas"});
    }
}

exports.obtener_espacios = async (req: Request, res: Response, next: Function) => {
    try{
        const espacios = await Espacio.find({empresaID: req.params.empresaID, apartado: false});
        const cleanEspacios = espacios.map(foundEspacio => {
            return{
                numero: foundEspacio.numero,
                _id: foundEspacio._id
            }
        });
        res.status(200).json({
            espacios: cleanEspacios,
            numeroEspacios: cleanEspacios.length
        });
    }
    catch(err){
        return res.status(500).json({err: err, message: "Espacios no pudideron ser obtenidos"});
    }
}

exports.apartar_lugar = async (req: Request, res: Response, next: Function) => {
    try{
        const userData = {
            usuarioID: req.body.usuarioID,
            nombreUsuario: req.body.nombreUsuario,
            horaEntrada: req.body.horaEntrada,
            horaSalida: req.body.horaSalida
        }
        await Espacio.updateOne({_id: req.body.espacioID}, {$set: {usuarioData: userData, apartado: true}});
        res.status(200).json({
            message: "Se aparto el lugar"
        });
    }
    catch(err){
        return res.status(500).json({err: err, message: "No se pudo apartar el lugar"});
    }
}

exports.desapartar_lugar = async (req: Request, res: Response, next: Function) => {
    try{
        const userData = {
            nombreUsuario: "",
            horaEntrada: "",
            horaSalida: ""
        };
        await Espacio.updateOne({_id: req.body.espacioID}, {$set: {usuarioData: userData, apartado: false}});
        res.status(200).json({
            message: "Se desaparto el lugar"
        });
    }
    catch(err){
        return res.status(500).json({err: err, message: "No se pudo desapartar el lugar"});
    }
}

exports.ver_espacio = async (req: Request, res: Response, next: Function) => {
    try{
        const espacioFound = await Espacio.findOne({"usuarioData.usuarioID": req.params.userID});
        if(espacioFound != undefined){
            res.status(200).json({
                _id: espacioFound._id,
                numero: espacioFound.numero,
                usuarioData: espacioFound.usuarioData,
                apartado: espacioFound.apartado
            });
        } else {
            res.status(200).json({
                _id: "",
                numero: "",
                usuarioData: "",
                apartado: ""
            });
        }
    }
    catch(err){
        return res.status(500).json({err: err, message: "No se pudo encontrar el lugar"});
    }
}


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