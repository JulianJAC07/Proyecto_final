//para usar este caso usamos formik para usar un formularioya prehecho

import React from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import * as axios from "axios";


//login
const loginSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(3, "El nombre debe tener por lo menos 3 letras")
    .max(60, "Nombre demasiado largo. Máx 100 caracteres")/*ver los valores que puse en la tabla*/
    .required("Requerido"),
  email: Yup.string().email("El email es inválido").required("Requerido"),
});




const LoginForm =()=>{

    const handleSubmit=(values,{setSubmitting,resetForm})=>{
       /* setTimeout(()=>{alert(JSON.stringify(values, null, 2));
        setSubmitting(false)},1000)
        axios.get('http://localhost:3000/api/usuarios').then((resp)=>{
            console.log(resp)
        }).catch((error)=>{
            console.log(error)
        })*/
        axios.post('http://localhost:3001/userSQL/login',{
            nombre: values.nombre_usuario ,
            email: values.email_usuario,
          //  estado: true
        } )
        .then ((resp)=>{
            console.log(resp)})
        .catch((error)=>{
            console.log(error)
        })

        resetForm()


    }
    
    
    return(
        <>

        <h1>Login</h1>
        <Formik
            initialValues={{email:"",nombre:""}}
            onSubmit={handleSubmit}
            validationSchema={loginSchema}
        >
            {({isSubmittin})=>{
                return(
                    <Form>
                        <label>
                            email:<Field type='email' name='email'/>
                            <ErrorMessage name='email' component='div'/>
                        </label>
                        <label>
                            nombre: <Field type='text' name='nombre' />
                            <ErrorMessage name='nombre' component='div'/>

                        </label>
                        <button type='submit' disable={isSubmittin} >
                            Ingresar
                        </button>

                    </Form>
                )
            }}


        </Formik>




        
        </>
    )
}
export default LoginForm;