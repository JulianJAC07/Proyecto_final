import request from 'express';

export interface IrequestExpress extends Request{

    usuario:{
        id_usuario:string,
        nombre_usuario:string,
        email_usuario:string,
        telefono:string,
        estado:string
    }


}
