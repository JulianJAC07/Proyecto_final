"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = void 0;
const token_1 = require("../class/token");
const verificarToken = (req, res, next) => {
    const userToken = req.get('x-token') || "";
    token_1.Token.checkToken(userToken).then(decoded => {
        console.log(decoded);
        //@ts-ignore
        req.usuario = decoded.usuario;
        //@ts-ignore
        const refreshToken = token_1.Token.getToken(decoded.usuario);
        req.token = refreshToken;
        next();
    })
        .catch(error => {
        res.json({
            estado: "succes",
            mensaje: "Token incorrecto",
            error: error
        });
    });
};
exports.verificarToken = verificarToken;
