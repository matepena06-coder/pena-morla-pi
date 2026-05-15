import React,{useState} from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom";


function Register(props){
   const [email, setEmail]= useState("")
   const [password, setPassword]= useState ("")
   const [error, setError]= useState ("")


   function registro(event){


       event.preventDefault()


       if(
           email ==="" ||
           password ===""
       ){
           setError("Completar todos los campos");
           return;
       }


       if (password.length < 6){
           setError("La contraseña debe tener al menos 6 caracteres");
           return;
       }


       let usuariosRegistrados= localStorage.getItem("usuarios")
       let usuarios= null


       if (usuariosRegistrados === null){
           usuarios = []
       } else{
           usuarios = JSON.parse(usuariosRegistrados)
       }


       let yaRegistrados = usuarios.filter((usuario)=> usuario.email === email)
       if (yaRegistrados.length>0){
           setError(
               "Este email ya está en uso"
           );
           return;
       }


       let usuarioNuevo = {
           email: email,
           password: password
       }


       let usuariosNuevos = usuarios.concat(usuarioNuevo)


       localStorage.setItem("usuarios", JSON.stringify(usuariosNuevos))
       sessionStorage.setItem("usuarioLogueado", email)
      
       props.history.push("/login")
      
       setEmail(
           ""  
       )
       setPassword(
           ""  
       )
       setError(
           ""  
       )
       
   }
  
       return(


           <section>


           <form onSubmit={(event)=>registro(event)}>
               <label>Email:</label>
               <input type="email" name="email" onChange={(event)=>setEmail(event.target.value)} value={email}></input>
               <label>Password</label>
               <input type="password" name="password" onChange={(event)=>setPassword(event.target.value)} value={password}></input>
               <button type="submit">Registrarse</button>
           </form>


           {error !== ""? <p>{error}</p>:""}


           </section>
       )
   }



export default withRouter(Register)