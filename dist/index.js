"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./classes/server"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
var empresa_1 = __importDefault(require("./routes/empresa"));
var usuario_1 = __importDefault(require("./routes/usuario"));
var espacio_1 = __importDefault(require("./routes/espacio"));
var server = server_1.default.instance;
//mecatronica20
//Anita
mongoose_1.default.connect('mongodb://Anita:mecatronica20@ds143156.mlab.com:43156/blitz')
    .then(function () {
    console.log("Connected to database");
})
    .catch(function (err) {
    console.log(err);
    console.log("Conexion fallida");
});
//Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//Configuracion del cors
server.app.use(cors_1.default({
    origin: true,
    credentials: true
}));
server.app.get("/", function (req, res, next) {
    res.send("Hola amigos");
});
server.app.use("/empresas", empresa_1.default);
server.app.use("/usuarios", usuario_1.default);
server.app.use("/espacios", espacio_1.default);
server.start(5000);
