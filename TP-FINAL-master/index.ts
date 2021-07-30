import Server from './class/server';
import connection from './bin/conectionMySql';
import mongoose from 'mongoose';
import bodyPaser from 'body-parser';
import userSQLRoutes from './routes/userSQL';
import postRouter from './routes/post';
import fileUpload from 'express-fileupload'
import fs from 'fs';
import path from 'path';
import FileSystem from './class/file-system';
import DatosM from './routes/DatosMascota'
import productos from './routes/Productos';



//Creando servidor web
const server = new Server();

server.start(()=>{
    console.log(`Servidor corriendo en puerto ${server.puerto} y en host ${server.host}`);
});



// body parser
server.app.use(bodyPaser.urlencoded({extended:true}));
server.app.use(bodyPaser.json());

//upload
const crearFolder = new FileSystem();
crearFolder.createCarpetaUploads();
server.app.use(fileUpload());


//Rutas aplicacion

server.app.use('/userSQL', userSQLRoutes);
server.app.use('/post', postRouter);
server.app.use('/DatosMascota', DatosM);
server.app.use('/Produc',productos)




//Conexión dataBase MySQL
connection.connect((error:any)=>{
    if(error){
        throw error
    }
    else{
        console.log("Aplicacion conectada a base de datos MySql")
    }
})

//Conexion mongoDB
// mongoose.connect('mongodb://localhost:27017/gestion_inmobiliaria',
//                     {useNewUrlParser:true, useCreateIndex:true},
//                     (error)=>{
//                         if(error){
//                             throw error
//                         }
//                         else{
//                             console.log("Aplicación conectada a base de datos Mongo")
//                         }
//                     }

// )