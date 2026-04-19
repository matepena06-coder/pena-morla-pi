import React,{Component} from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import Cookies from "universal-cookie"


const cookies = new Cookies()


class Login extends Component{


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


   login(event){


       event.preventDefault()


       if(
           this.state.email ===""||
           this.state.password ===""
       ){
           this.setState({error: "Completar todos los campos"});
           return;
       }


       let usuariosRegistrados = localStorage.getItem("usuarios")
       let usuarios = usuariosRegistrados ? JSON.parse(usuariosRegistrados): []


       if (usuarios.length === 0){
           this.setState({
               error: "No hay usuarios registrados"
           })
           return
       }


       let usuarioEmail = usuarios.filter((usuario) => usuario.email === this.state.email)


       if (usuarioEmail.length === 0){
           this.setState({
               error: "No existe un usuario con registrado con este email"
           })
           return
       }


       let usuarioCorrecto = usuarioEmail.filter((usuario)=> usuario.password === this.state.password)


       if (usuarioCorrecto.length === 0){
           this.setState({error: "Credenciales incorrectas"});
           return
       }


       cookies.set("usuarioLogueado", this.state.email)


       this.props.history.push("/")


}
   render(){


       return(


           <section>


           <form onSubmit={(event)=>this.login(event)}>
               <label>Email:</label>
               <input type="email" name="email" onChange={(event)=>this.controlarCambios(event)} value={this.state.email}></input>
               <label>Password</label>
               <input type="password" name="password" onChange={(event)=>this.controlarCambios(event)} value={this.state.password}></input>
               <button type="submit">Log in</button>
           </form>


           {this.state.error !== ""? <p>{this.state.error}</p>:""}


           </section>
       )
   }
}


export default withRouter(Login)
