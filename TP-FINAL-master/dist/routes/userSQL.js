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
const token_1 = require("../class/token");
const conectionMySql_1 = __importDefault(require("../bin/conectionMySql"));
const promesas_1 = __importDefault(require("../utils/promesas"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const email_1 = __importDefault(require("../class/email"));
const userSQLRoutes = express_1.Router();
//Este funciona OK!!!!
userSQLRoutes.get('/pruebaSQL', (req, res) => {
    res.json({
        estado: "success",
        mensaje: "pruebaok"
    });
});
//Este funciona OK es el INSERT!!!!
userSQLRoutes.post('/createUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            // id:req.body.id_usuario,
            nombre: req.body.nombre_usuario,
            password: req.body. /*bcrypt.hashSync(req.body.password,10), //req.body.*/password,
            email: req.body.email_usuario,
            telefono: req.body.telefono,
            estado: req.body.estado
        };
        let validacioncontraseña = bcrypt_1.default.hashSync(user.password, 10);
        let validacionmail = yield promesas_1.default(`Select * from USUARIOS1 where EMAIL_USUARIO = '${user.email}'`, []);
        if (validacionmail.length == 0) {
            const pasajededatos = "START TRANSACTION";
            const cargadeusuario = "INSERT INTO USUARIOS1(NOMBRE_USUARIO,PASSWORD,EMAIL_USUARIO,TELEFONO,ESTADO)VALUES(?,?,?,?,?)";
            yield promesas_1.default(pasajededatos, []);
            yield promesas_1.default(cargadeusuario, [user.nombre, user.password /*validacioncontraseña*/, user.email, user.telefono, user.estado]);
            //const emailEnvio = new email_1.default();
            //const envio = yield emailEnvio.enviarEmail(user.email, "Creacion cuenta", "Su cuenta se ha creado con exito", "");
            let commit = yield promesas_1.default("commit", []);
            res.json({
                estado: "Success",
                mensaje: "Usuario creado con exito",
                data: commit
            });
        }
        else {
            res.json({
                estado: "Error",
                mensaje: "El correo ingresado ya existe",
            });
        }
        /*console.log(user)
         await query("start transaction",[]);
         await query("INSERT INTO USUARIOS1(NOMBRE_USUARIO,PASSWORD,EMAIL_USUARIO,TELEFONO)VALUES(?,?,?,?,?)", [user.nombre,user.password,user.email,user.telefono]);
         await query("commit",[]);
          const emailEnvio = new emailClass()
          const envio = await emailEnvio.enviarEmail(user.email, "Creacion cuenta", "Su cuenta se ha creado con exito", "");

        res.json({
                 estado: "successsql",
                 mensaje: user,
                 emailResult: envio
               }) */
    }
    catch (error) {
        const rollback = yield promesas_1.default("rollback");
        res.json({
            estado: "error",
            data: error,
            rollabck: rollback
        });
    }
}));
userSQLRoutes.get('/TraerUsuarioPorId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let Idusuario = req.body.id_usuario;
    let user = yield promesas_1.default(`Select * from USUARIOS1 where ID_USUARIO LIKE '%${Idusuario}%'`, []);
    res.json({
        estado: "success",
        mensaje: "Se encontraron los usuarios",
        data: user
    });
}));
userSQLRoutes.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = {
        const usuario = req.body.nombre_usuario;
        const password = req.body.password;
        const email = req.body.email_usuario;
        // }
        let hasPass = yield bcrypt_1.default.hash(password, 10);
        if (email && password) {
            conectionMySql_1.default.query('SELECT * FROM USUARIOS1 where EMAIL_USUARIO=?', [email], (error, result) => __awaiter(void 0, void 0, void 0, function* () {
                console.log(result);
                if ((yield result.lenght) == 0 || (yield bcrypt_1.default.compare(password, result[0].PASSWORD))) {
                    res.json({
                        estado: "sucess",
                        mensaje: "Usuario o contraseña incorrecta"
                    });
                }
                else {
                    const TokenJwt = token_1.Token.getToken({
                        id: result[0].id_usuario,
                        nombre: result[0].nombre_usuario,
                        email: result[0].email_usuario,
                        estado: result[0].estado,
                    });
                    res.json({
                        estado: "sucess",
                        mensaje: "LOGIN CORRECTO",
                        data: result,
                        Token: TokenJwt
                    });
                }
                res.end();
            }));
        }
        else {
            res.send('Please enter user and Password');
            res.end();
        }
    }
    catch (error) {
        yield promesas_1.default("rollback", []);
        res.json({
            estado: "error",
            data: error
        });
    }
}));
exports.default = userSQLRoutes;
