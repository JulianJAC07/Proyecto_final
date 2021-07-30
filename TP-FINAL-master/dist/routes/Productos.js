"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conectionMySql_1 = __importDefault(require("../bin/conectionMySql"));
const productos = express_1.Router();
productos.get('/listaProductos', (req, res) => {
    const query = "SELECT * FROM PRODUCTOS1";
    conectionMySql_1.default.query(query, (error, results) => {
        res.json({
            estado: "success",
            mensaje: "pruebaok",
            data: results
        });
    });
});
exports.default = productos;
