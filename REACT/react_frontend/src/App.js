//import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import AuthExample from './routes/routes';
import Routes from './routes/routes.js';
import Axios from 'axios'; 
import Login from './pages/Login';

function App() {
  //variables para el registro
  const [UsernameReg,setUsernameReg]=useState("");
  const [passwordReg,setPasswordReg]=useState("");
  const [EmailReg,setEmailReg]=useState("");
  const [TelefonoReg,setTelefonoReg]=useState("");
  const [EstadoReg,setEstadoReg]=useState("");


  //variables para el login
  const [Email,setEmail]=useState("");
  const [Password,setPassword]=useState("");


  //creo funcion para llevar los datos recibidos a la base de datos
  const registro = ()=>{
    Axios.post("http://localhost:3001/userSQL/createUser", /*user=*/{
      nombre_usuario: UsernameReg,
      password:passwordReg,
      email_usuario:EmailReg,
      telefono:TelefonoReg,
      estado:EstadoReg


    }).then((response)=>{
      console.log(response);
      alert("su registro ha sido exitoso")
    }).catch((error)=>{
      console.log(error)
    })
  }


  const Ingreso = ()=>{
    Axios.post("http://localhost:3001/userSQL/login", /*user=*/{
      email_usuario:Email,
      password:Password,
      
      


    }).then((response)=>{
      console.log(response);
      alert("ha ingresado correctamente")
    }).catch((error)=>{
      console.log(error)
    })
  }




  return (
    <>
      {/* <Routes /> */}
      <AuthExample/>
      <div className="App">
        <div className="registracion">
          <h1>Registracion</h1>
          
          <label>Username</label>
          <input type="text" onChange={(e)=>{setUsernameReg(e.target.value)}} />
              
          
          <label>Password</label>
          <input type="text" onChange={(e)=>{setPasswordReg(e.target.value)}}/>
          
          
          
          
          <label>Email</label>
          <input type="text" onChange={(e)=>{setEmailReg(e.target.value)}}/>
          
          
          <label>Telefono</label>
          <input type="" onChange={(e)=>{setTelefonoReg(e.target.value)}}/>
          
          
          <label>Estado</label>
          <input type="" onChange={(e)=>{setEstadoReg(e.target.value)}}/>
          
          
          <button onClick={registro}>registrar</button>
        
        
        </div>
        <div className="Login">
          <h1>Login</h1>
          <input type="text" placeholder="Email..." onChange={(e)=>{setEmail(e.target.value)}}/>
          <input type="Password" placeholder="Password..." onChange={(e)=>{setPassword(e.target.value)}}/>
          <button onClick={Ingreso} >Ingresar</button>
        </div>
      </div>
    </>
  )
}

export default App;
