  
import React from 'react';
import * as axios from 'axios';

const handleUsuarios = () => {
    axios.get('http://localhost:3000/api/usuarios').then(resp => {
        console.log(resp)
    }).catch(error => {
        console.log(error)
    })
}


const ListarUsuarios = () => {
    return (
        <button onClick={()=>handleUsuarios()}>Listar usuarios</button>
    )
}

export default ListarUsuarios;