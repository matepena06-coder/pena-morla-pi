import React,{Component} from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom";


class Register extends Component{
   constructor(props){
       super(props)
       this.state ={
           email:"",
           password:"",
           error:""
       }
   }
 
   controlarCambios(event){
       this.setState({
           [event.target.name]: event.target.value
           //Si el name del input es email, lo que escribe el usuario se guarda en this.state.email
           //Si es password se guarda en this.state.password
       })
   }


   registro(event){


       event.preventDefault()


       if(
           this.state.email ==="" ||
           this.state.password ===""
       ){
           this.setState({error: "Completar todos los campos"});
           return;
       }


       if (this.state.password.length < 6){
           this.setState({error: "La contraseña debe tener al menos 6 caracteres"});
           return;
       }


       let usuariosRegistrados= localStorage.getItem("usuarios")
       let usuarios= null


       if (usuariosRegistrados === null){
           usuarios = []
       } else{
           usuarios = JSON.parse(usuariosRegistrados)
       }


       let yaRegistrados = usuarios.filter((usuario)=> usuario.email === this.state.email)
       if (yaRegistrados.length>0){
           this.setState({
               error: "Este email ya está en uso"
           });
           return;
       }


       let usuarioNuevo = {
           email: this.state.email,
           password: this.state.password
       }


       let usuariosNuevos = usuarios.concat(usuarioNuevo)


       localStorage.setItem("usuarios", JSON.stringify(usuariosNuevos))
       sessionStorage.setItem("usuarioLogueado", this.state.email)
      
       this.props.history.push("/login")
      
       this.setState({
           email:"",
           password:"",
           error:""
       })
   }
  
   render(){
       return(


           <section>


           <form onSubmit={(event)=>this.registro(event)}>
               <label>Email:</label>
               <input type="email" name="email" onChange={(event)=>this.controlarCambios(event)} value={this.state.email}></input>
               <label>Password</label>
               <input type="password" name="password" onChange={(event)=>this.controlarCambios(event)} value={this.state.password}></input>
               <button type="submit">Registrarse</button>
           </form>


           {this.state.error !== ""? <p>{this.state.error}</p>:""}


           </section>
       )
   }
}


export default withRouter(Register)