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




const userSQLRoutes = Router();


//Este funciona OK!!!!
userSQLRoutes.get('/pruebaSQL', (req:Request, res:Response)=>{

    res.json({
                estado: "success",
                mensaje: "pruebaok"
             })    
});

//Este funciona OK es el INSERT!!!!
userSQLRoutes.post('/createUser', async (req, res)=>{

  

    try{
         const user ={
                   // id:req.body.id_usuario,
                    nombre:req.body.nombre_usuario,
                    password:req.body./*bcrypt.hashSync(req.body.password,10), //req.body.*/password, 
                    email:req.body.email_usuario,
                    telefono:req.body.telefono,
                    estado:req.body.estado
                } 
            let validacioncontraseña =bcrypt.hashSync(user.password,10)
            let validacionmail: any = await query(`Select * from USUARIOS1 where EMAIL_USUARIO = '${user.email}'`, []);

            if(validacionmail.length==0){
                const pasajededatos ="START TRANSACTION";
                const cargadeusuario ="INSERT INTO USUARIOS1(NOMBRE_USUARIO,PASSWORD,EMAIL_USUARIO,TELEFONO,ESTADO)VALUES(?,?,?,?,?)";
                await query(pasajededatos,[])
                await query(cargadeusuario, [user.nombre,user.password/*validacioncontraseña*/,user.email,user.telefono,user.estado])
                //const emailEnvio = new emailClass()
                //const envio = await emailEnvio.enviarEmail(user.email, "Creacion cuenta", "Su cuenta se ha creado con exito", "");

                let commit = await query("commit",[])
                res.json({
                    estado: "Success",
                    mensaje: "Usuario creado con exito",
                    data: commit
                })
            }else{
                res.json({
                    estado: "Error",
                    mensaje: "El correo ingresado ya existe",
                })
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
     catch(error){
     const rollback = await query("rollback");
        res.json({
            estado:"error",
            data:error, 
            rollabck:rollback
        });
    }
})



userSQLRoutes.get('/TraerUsuarioPorId', async (req,res)=>{
    let Idusuario=req.body.id_usuario
    let user = await query(`Select * from USUARIOS1 where ID_USUARIO LIKE '%${Idusuario}%'`, []);
    res.json({
        estado: "success",
        mensaje: "Se encontraron los usuarios",
        data: user
    })
    
   

    
})

userSQLRoutes.post('/login', async (req, res)=>{
    try 
    {
       // const user = {
         const   usuario=req.body.nombre_usuario
         const   password=req.body.password
         const   email=req.body.email_usuario
       // }
        let hasPass =await bcrypt.hash(password,10);

        if (email && password){
            connection.query('SELECT * FROM USUARIOS1 where EMAIL_USUARIO=?',[email],async(error,result)=>{
                console.log(result)
                if(await result.lenght==0 || (await bcrypt.compare(password,result[0].PASSWORD))){
                    res.json({
                        estado:"sucess",
                        mensaje:"Usuario o contraseña incorrecta"
                    })
                }
             
                else {
                    const TokenJwt = Token.getToken({
                        id: result[0].id_usuario,
                        nombre:result[0].nombre_usuario,
                        email:result[0].email_usuario,
                        estado:result[0].estado,
                    })
                    res.json({
                        estado:"sucess",
                        mensaje:"LOGIN CORRECTO",
                        data:result,
                        Token:TokenJwt
                    })
                }
                res.end();


            })
            
        }
         else{
                res.send('Please enter user and Password');
                res.end();
             }
             

    } catch (error) {
        await query("rollback", []);
        res.json({
            estado: "error",
            data: error
        });
    }
    
    
   



})

export default userSQLRoutes;
