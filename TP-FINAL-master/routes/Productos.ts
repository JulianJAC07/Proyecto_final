import {Router, Response, Request} from 'express';
import {Token} from '../class/token';
import { verificarToken } from '../middlewares/authentication';
import jwt from 'jsonwebtoken';
import connection from '../bin/conectionMySql';
import { json } from 'body-parser';
import query from '../utils/promesas'
import bcrypt from 'bcrypt';
import emailClass from '../class/email';
import usuariosController from '../controllers/usuariosController';


const productos=Router();

productos.get('/listaProductos', (req:Request, res:Response)=>{
    const query="SELECT * FROM PRODUCTOS1"
    connection.query(query,(error,results)=>{
        res.json({
                estado: "success",
                mensaje: "pruebaok",
                data:results
             })    

    })

    
});

export default productos;