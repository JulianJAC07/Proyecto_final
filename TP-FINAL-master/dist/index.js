"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./class/server"));
const conectionMySql_1 = __importDefault(require("./bin/conectionMySql"));
const body_parser_1 = __importDefault(require("body-parser"));
const userSQL_1 = __importDefault(require("./routes/userSQL"));
const post_1 = __importDefault(require("./routes/post"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const file_system_1 = __importDefault(require("./class/file-system"));
const DatosMascota_1 = __importDefault(require("./routes/DatosMascota"));
const Productos_1 = __importDefault(require("./routes/Productos"));
//Creando servidor web
const server = new server_1.default();
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.puerto} y en host ${server.host}`);
});
// body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//upload
const crearFolder = new file_system_1.default();
crearFolder.createCarpetaUploads();
server.app.use(express_fileupload_1.default());
//Rutas aplicacion
server.app.use('/userSQL', userSQL_1.default);
server.app.use('/post', post_1.default);
server.app.use('/DatosMascota', DatosMascota_1.default);
server.app.use('/Produc', Productos_1.default);
//Conexión dataBase MySQL
conectionMySql_1.default.connect((error) => {
    if (error) {
        throw error;
    }
    else {
        console.log("Aplicacion conectada a base de datos MySql");
    }
});
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
