import User from "../models/usuario";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {Request, Response} from "express";
import Espacio from "../models/espacio";

// Por defecto el usuario se guarda como esperar
// Los controladores que el usuario puede hacer

//Registrarse

exports.user_registrarse = async (req: Request, res: Response, next: Function) => {
    try{
        const users = await User.find({email: req.body.email});
        if(users.length >= 1){
            return res.status(409).json({
                message: "Mail exist"
            });
        } else {
            //El mail no existe
            const hashh = await bcrypt.hash(req.body.contraseña, 10);
            const user = new User({
                nombre: req.body.nombre,
                contraseña: hashh, 
                email: req.body.email,
                tarjeta: req.body.tarjeta
            });
            //Salvando el usuario en la base de datos
            const result = await user.save();
            return res.status(201).json({
                message: "User created",
                result: result
            });
        }
    }
    catch(err) {
        return res.status(500).json({err: err, message: "Usuario no pudo ser salvado"});
    }
}

exports.user_iniciar_sesion = async (req: Request, res: Response, next: Function) => {
    try {
        
        const user = await User.findOne({email: req.body.email});
        //Si el usuario no existe
        if(!user){
            return res.status(401).json({
                message: "Auth Failed, email does not recognized"
            });
        }
        //Si el usuario existe
        //Comparamos que sean las contrasenas iguales
        const result = await bcrypt.compare(req.body.contraseña, user.contraseña);
        //Si no hacen match, return
        if(!result){
            return res.status(401).json({
                message: "Auth failed, password incorrect"
            });
        }
        //si hacen match, Generamos el token
        const token = jwt.sign({
            email: user.email,
            userId: user._id,
            user_type: user.user_type
        }, "secret_this_should_be_longer");
        //Enviamos el json
        return res.status(200).json({
            token: token,
            userData: {
                _id: user._id,
                user_type: user.user_type,
                nombre: user.nombre
            }
        });

    }
    catch(err){
        res.status(401).json({
            message: "Auth failed"
        });
    }
}

exports.prueba = (req: Request, res: Response, next: Function) => {
    res.send("Hola amigos");
} 