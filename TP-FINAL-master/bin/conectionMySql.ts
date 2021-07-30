import mysql from 'mysql';
import variables_entorno from '../config';

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'esquema_servicio1',
    port: 3306
})

export default connection;
