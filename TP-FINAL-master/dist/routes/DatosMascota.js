"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conectionMySql_1 = __importDefault(require("../bin/conectionMySql"));
//import { Connection } from 'mongoose';
const DatosM = express_1.Router();
//http://localhost:3001/DatosMascota/.....
DatosM.get('/listaMascotas', (req, res) => {
    const query = "SELECT * FROM MASCOTA1";
    conectionMySql_1.default.query(query, (error, results) => {
        res.json({
            estado: "success",
            mensaje: "pruebaok",
            data: results
        });
    });
});
exports.default = DatosM;
