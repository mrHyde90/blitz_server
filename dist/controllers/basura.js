"use strict";
/*
exports.crear_espacio = async (req: Request, res: Response, next: Function) => {
    try{
        const empresaFound = await Empresa.findById(req.params.empresaID);
        if(empresaFound != undefined){
            empresaFound.espacios.push({
                numero: +req.body.numero,
                apartado: false
            });
            const result = await empresaFound.save();
            return res.status(201).json({
                result: result,
                message: "Espacios Creados"
            });
        }
    }
    catch(err){
        return res.status(500).json({err: err, message: "Empresas no pudieron ser obtenidas"});
    }
}
*/
/*
exports.obtener_espacios = async (req: Request, res: Response, next: Function) => {
    try{
        const empresa = await Empresa.findById(req.params.empresaID);
        if(empresa != undefined){
            res.status(200).json({
                nombreEmpresa: empresa.nombreEmpresa,
                espacios: empresa.espacios.map(espacio => {
                    return {
                        numero: espacio.numero,
                        apartado: espacio.apartado
                    }
                }),
                numeroEspacios: empresa.espacios.length
            })
        }
    }
    catch(err){
        return res.status(500).json({err: err, message: "Espacios no pudideron ser obtenidos"});
    }
}*/
/*
espacios: {
        numero: Number,
        usuarioData?: {
            usuarioID: mongoose.Schema.Types.ObjectId,
            nombreUsuario: string,
            horaEntrada: Date,
            horaSalida: Date,
        }
        apartado: boolean
    }[];
*/
//await Proyecto.updateOne({_id: projectID, inscritos: {$elementMatch: {usuarioID: userID}} }, 
//{$set: {"inscritos.$.aceptado": aceptado}});
/*
exports.apartar_lugar = async (req: Request, res: Response, next: Function) => {
    try{
        const empresaID = req.params.empresaID;
        const numeroEspacio = req.body.numero;
        const userData = {
            nombreUsuario: req.body.nombreUsuario,
            usuarioID: req.body.userID,
            horaEntrada: Date.now(),
            horaSalida: req.body.horaSalida
        }
        const newEspacio = {
            numero: numeroEspacio,
            usuarioData: userData,
            apartado: true
        };
        await Empresa.updateOne({_id: empresaID, espacios: {$elementMatch: {numero: numeroEspacio}}},
            {$set: {espacios: newEspacio}});
        res.status(200).json({
            message: "Espacio apartado"
        });
    }
    catch(err){
        return res.status(500).json({err: err, message: "Espacio no pudo ser actualizado"});
    }
}

exports.desapartar_lugar = async (req: Request, res: Response, next: Function) => {
    try{
        const empresaID = req.params.empresaID;
        const numeroEspacio = req.body.numero;
        const newEspacio = {
            numero: numeroEspacio,
            apartado: false
        };
        await Empresa.updateOne({_id: empresaID, espacios: {$elementMatch: {numero: numeroEspacio}}},
            {$set: {espacios: newEspacio}});
        res.status(200).json({
            message: "Espacio desapartado"
        });
    }
    catch(err){
        return res.status(500).json({err: err, message: "Espacio no pudo ser actualizado"});
    }
}*/ 
