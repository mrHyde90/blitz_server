import Server from './classes/server';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import empresaRoutes from "./routes/empresa";
import userRoutes from "./routes/usuario";
import espacioRoutes from "./routes/espacio";
import {Request, Response} from "express";

const server  = Server.instance;
//mecatronica20
//Anita
mongoose.connect('mongodb://Anita:mecatronica20@ds143156.mlab.com:43156/blitz')
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log(err);
        console.log("Conexion fallida");
    });

//Body parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//Configuracion del cors
server.app.use(cors({
    origin: true,
    credentials: true
}));
server.app.get("/", (req: Request, res: Response, next: Function)=>{
    res.send("Hola amigos");
});
server.app.use("/empresas", empresaRoutes);
server.app.use("/usuarios", userRoutes);
server.app.use("/espacios", espacioRoutes);

server.start( 5000);