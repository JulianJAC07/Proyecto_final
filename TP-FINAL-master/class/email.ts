import nodemailer from 'nodemailer';
import path from 'path'

export default class email {

    host:string = "smtp.gmail.com"
    port:number = 587
    secure:boolean = false
    tsl:boolean = false
    auth = {
        user: "",//aca va mail
        pass: "" // aca va la clave de ese mail
    }
    constructor(){

    }
 
    enviarEmail(cuentaCorreoDestion:string, asunto:string, cuerpoEmail:string ="Tu usuario fue creado con exito", html:string = ""){

        return new Promise((resolve,reject)=>{
            const transporter = nodemailer.createTransport({
                host: this.host,
                port: this.port,
                secure: this.secure,
                auth:{
                    user: this.auth.user,
                    pass: this.auth.pass
                },
                tls:{
                    rejectUnauthorized: this.tsl
                }
            })
    
            const mailOptions = {
                from: this.auth.user,
                to: cuentaCorreoDestion,
                subject: asunto,
                text: cuerpoEmail,
                html: html,
                attachments:[
                    {
                        path: path.resolve(__dirname, '../assets', '') // aca agregas imagen 
                    }
                ]
            }
    
            nodemailer.createTestAccount((error)=>{
                transporter.sendMail(mailOptions,(error, info)=>{
                    if(error){
                        reject(error)
                    }
                    else{
                        return resolve(info)
                        console.log(info)
                    }
                })
            })
        })

    }
}