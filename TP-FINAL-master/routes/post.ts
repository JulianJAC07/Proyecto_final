import {Router, Response, query} from 'express';
import { verificarToken } from '../middlewares/authentication';
import { Post } from '../models/post.models';
import { IfileUpload } from '../interfaces/file-upload';
import FileSystem from '../class/file-system';


const fileSystem = new FileSystem();
const postRouter = Router();

postRouter.post('/', verificarToken, (req:any, res:Response)=>{
    
    let body = req.body;

    body.usuario = req.usuario.id_usuario;

    const imagenes:Array<string> = fileSystem.imagenesDeTempHaciaPost(req.usuario.id);

    body.img = imagenes;

    Post.create(body)
        .then(async postDb=>{

            await postDb.populate('usuario').execPopulate()
        
            res.json({
                estado:"success",
                data:postDb
            });
        })
        .catch(error =>console.log("error"))
});
// para ir por sql
// star transaction
// const pots = await query("insertio into post(mensaje, coord, id_usuario)...")
//     imagenes.forEach(item =>{
//         query("insert into imagenes(id_post, nombre_imagen)", [post.insertId, item])
//     })
// create usuarios
// (
// id_usuario,
// avatar,
// email
// )
// create post
// (
// id_post,
// mensaje
// coord
// )
// create imagenes
// (
// id_imagen,
// nombre_imagen,
// id_post -- foreging
// )

postRouter.get('/', async (req:any, res:Response)=>{

    let pagina = Number(req.query.pagina) || 1;
    let ctd = Number(req.query.ctd)
    let skip = pagina -1;
    skip = skip*ctd;
    
    const post = await Post.find()
                                .sort({id:-1})
                                .skip(skip)
                                .limit(ctd)
                                .populate('usuario')
                                .exec()

    res.json({
        estado:"success",
        data:post
    })


})

postRouter.post('/upload', verificarToken, async (req:any, res:Response)=>{

    const imag:IfileUpload = req.files.imag

    if(!req.files){
        return res.status(400).json({
            estado:"error",
            mensaje: "no se subio archivo"
        })
    }
 
    const validacionTipoImagen = imag.mimetype.includes('image');

    if(!validacionTipoImagen){
        return res.status(400).json({
            estado:"error",
            mensaje: "formato incorrecto"
        })
    }

    await fileSystem.guardarImagenTemporal(req.usuario.id, imag)

   
    res.json({
        estado:"success",
        data: imag
    })

})

postRouter.get('/imagen/:userId/:img', (req:any, res:Response)=>{

    const userId = req.params.userId;
    const img = req.params.img;

    const foto = fileSystem.getFotoUrl(userId, img);

    res.sendFile(foto);

})




export default postRouter;