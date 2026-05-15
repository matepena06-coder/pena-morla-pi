import React,{useState} from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import Cookies from "universal-cookie"


const cookies = new Cookies()

function Login (props){
   const [email, setEmail]= useState("")
   const [password, setPassword]= useState ("")
   const [error, setError]= useState ("")

   function login (event){


       event.preventDefault()


       if(
           email ===""||
           password ===""
       ){
           setError("Completar todos los campos");
           return;
       }


       let usuariosRegistrados = localStorage.getItem("usuarios")
       let usuarios = usuariosRegistrados ? JSON.parse(usuariosRegistrados): []


       if (usuarios.length === 0){
           setError(
               "No hay usuarios registrados"
           )
           return
       }


       let usuarioEmail = usuarios.filter((usuario) => usuario.email === email)


       if (usuarioEmail.length === 0){
           setError(
               "No existe un usuario con registrado con este email"
           )
           return
       }


       let usuarioCorrecto = usuarioEmail.filter((usuario)=> usuario.password === password)


       if (usuarioCorrecto.length === 0){
           setError("Credenciales incorrectas");
           return
       }


       cookies.set("usuarioLogueado", email)


       props.history.push("/")


}

return(

           <section>


           <form onSubmit={(event)=>login(event)}>
               <label>Email:</label>
               <input type="email" name="email" onChange={(event)=>setEmail(event.target.value)} value={email}></input>
               <label>Password</label>
               <input type="password" name="password" onChange={(event)=>setPassword(event.target.value)} value={password}></input>
               <button type="submit">Log in</button>
           </form>


           {error !== ""? <p>{error}</p>:""}


           </section>
       )
   }



export default withRouter(Login)
