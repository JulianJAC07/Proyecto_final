"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_model_1 = __importDefault(require("../models/usuarios.model"));
const token_1 = require("../class/token");
const authentication_1 = require("../middlewares/authentication");
const usuarios_1 = __importDefault(require("../controllers/usuarios"));
const email_1 = __importDefault(require("../class/email"));
const userRoutes = express_1.Router();
//typescrpt
// userRoutes.post('/create', async (req:Request, res:Response)=>{
//     const user = {
//         nombre_usuario: req.body.nombre_usuario,
//         password: bcrypt.hashSync(req.body.password, 10),
//         email_usuario: req.body.email_usuario,
//         telefono: req.body.telefono,
//         estado: req.body.estado
//     }
//     const emailEnvio = new emailClass()
//     const result = await Usuario.create(user);
//     const envio = await emailEnvio.enviarEmail(user.email_usuario, "Creacion cuenta", "Su cuenta se ha creado con exito", "");
//     res.json({
//         estado:"success",
//         mensaje: result, 
//         emailResult: envio
//     })
// })
userRoutes.post('/login', (req, res) => {
    usuarios_model_1.default.findOne({ email: req.body.email }, null, null, (error, result) => {
        if (error) {
            throw error;
        }
        if (!result) {
            return res.json({
                estado: "succes",
                mensaje: "usuario no encontrado en base de datos",
                data: result
            });
        }
        if (result.compararPassword(req.body.password)) {
            const tokenJwt = token_1.Token.getToken({
                id: result.id_usuario,
                nombre: result.nombre_usuario,
                email: result.email_usuario,
                telefono: result.telefono,
                estado: result.estado
            });
            return res.json({
                estado: "succes",
                mensaje: "usuario encontrado",
                data: result,
                token: tokenJwt
            });
        }
        else {
            return res.json({
                estado: "succes",
                mensaje: "usuario no encontrado en base de datos",
                data: result
            });
        }
    });
});
userRoutes.put('/update', authentication_1.verificarToken, (req, res) => {
    const user = {
        nombre: req.body.nombre_usuario,
        email: req.body.email_usuario,
        telefono: req.body.telefono,
        estado: req.body.estado
    };
    usuarios_model_1.default.findByIdAndUpdate(req.usuario.id_usuario, user, { new: true }, (error, result) => {
        if (error) {
            throw error;
        }
        if (!result) {
            res.json({
                estado: "success",
                mensaje: "usuario no existe en la base"
            });
        }
        if (result) {
            const tokenNuevo = token_1.Token.getToken({
                id: req.usuario.id_usuario,
                nombre: req.usuario.nombre_usuario,
                email: req.usuario.email_usuario,
                telefono: req.usuario.telefono,
                estado: req.usuario.estado
            });
            res.json({
                estado: "success",
                data: result,
                refreshToken: tokenNuevo
            });
        }
    });
});
userRoutes.get('/', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = req.usuario;
    const email = new email_1.default();
    const emailInfo = yield email.enviarEmail("ingindustrial.gu", "envio_email", "", "<h1> cuerpo email </h1>");
    res.json({
        estado: "success",
        mensaje: usuario,
        emailInfo: emailInfo
    });
}));
userRoutes.get('/', authentication_1.verificarToken, usuarios_1.default.token);
exports.default = userRoutes;
