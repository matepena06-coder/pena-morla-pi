import React,{Component} from "react";

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
        })
    }

    login(event){

        event.preventDefault()

        if(
            this.state.email ==="",
            this.state.password ===""
        ){
            this.setState({error: "Completar todos los campos"});
            return;
        }

        let yaRegistrados = localStorage.getItem("usuarios")
        let usuarios = localStorage.getItem("usuarios") === null ? []: JSON.parse(localStorage.getItem("usuarios"))
        
        
        let usuarioCorrecto = usuarios.filter((usuario)=> 
            usuario.email === this.state.email &&
            usuario.password === this.state.password)

        if (usuarioCorrecto.length === 0){
            this.setState({
                error: "Email o contraseña incorrectos"
            })
            return
        }

        sessionStorage.setItem("usuarioLogueado", this.state.email)

        this.setState({
            email:"",
            password:"",
            error:""
        })

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

export default Login