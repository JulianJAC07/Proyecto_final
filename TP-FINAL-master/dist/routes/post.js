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
const authentication_1 = require("../middlewares/authentication");
const post_models_1 = require("../models/post.models");
const file_system_1 = __importDefault(require("../class/file-system"));
const fileSystem = new file_system_1.default();
const postRouter = express_1.Router();
postRouter.post('/', authentication_1.verificarToken, (req, res) => {
    let body = req.body;
    body.usuario = req.usuario.id_usuario;
    const imagenes = fileSystem.imagenesDeTempHaciaPost(req.usuario.id);
    body.img = imagenes;
    post_models_1.Post.create(body)
        .then((postDb) => __awaiter(void 0, void 0, void 0, function* () {
        yield postDb.populate('usuario').execPopulate();
        res.json({
            estado: "success",
            data: postDb
        });
    }))
        .catch(error => console.log("error"));
});
// para ir por sql
// star transaction
// const pots = await query("insertio into post(mensaje, coord, id_usuario)...")
//     imagenes.forEach(item =>{
//         query("insert into imagenes(id_post, nombre_imagen)", [post.insertId, item])
//     })
// create usuarios
// (
// id_usuario,
// avatar,
// email
// )
// create post
// (
// id_post,
// mensaje
// coord
// )
// create imagenes
// (
// id_imagen,
// nombre_imagen,
// id_post -- foreging
// )
postRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pagina = Number(req.query.pagina) || 1;
    let ctd = Number(req.query.ctd);
    let skip = pagina - 1;
    skip = skip * ctd;
    const post = yield post_models_1.Post.find()
        .sort({ id: -1 })
        .skip(skip)
        .limit(ctd)
        .populate('usuario')
        .exec();
    res.json({
        estado: "success",
        data: post
    });
}));
postRouter.post('/upload', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imag = req.files.imag;
    if (!req.files) {
        return res.status(400).json({
            estado: "error",
            mensaje: "no se subio archivo"
        });
    }
    const validacionTipoImagen = imag.mimetype.includes('image');
    if (!validacionTipoImagen) {
        return res.status(400).json({
            estado: "error",
            mensaje: "formato incorrecto"
        });
    }
    yield fileSystem.guardarImagenTemporal(req.usuario.id, imag);
    res.json({
        estado: "success",
        data: imag
    });
}));
postRouter.get('/imagen/:userId/:img', (req, res) => {
    const userId = req.params.userId;
    const img = req.params.img;
    const foto = fileSystem.getFotoUrl(userId, img);
    res.sendFile(foto);
});
exports.default = postRouter;
