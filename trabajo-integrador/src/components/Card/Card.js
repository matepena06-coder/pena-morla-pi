import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./styles.css"
import Cookies from "universal-cookie"

const cookies =new Cookies()

// Componente reutilizable para mostrar películas o series en formato de tarjeta
class Card extends Component {
   constructor(props) {
       super(props)
       this.state = {
           verDesc: false,
           esFavorito: this.estáEnFavoritos()
       }
   }


   agregarAFavoritos() {
       let storage = localStorage.getItem("favoritos")
       let favoritos = storage ? JSON.parse(storage) : []
       favoritos.push(this.props.item)
       localStorage.setItem("favoritos", JSON.stringify(favoritos))
       this.setState({
           esFavorito: true
           // Esto sirve para cambiar el renderizado cambie al instante el botón de agregar a eliminar
       })
   }


   eliminarDeFavoritos(){
       let storage = localStorage.getItem("favoritos")
       let favoritos = storage ? JSON.parse(storage) : []
       let nuevosFavoritos = favoritos.filter(item=> item.id !== this.props.item.id)
       localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos))
       this.setState({
           esFavorito: false
       })
      
   }


   estáEnFavoritos(){
       let storage = localStorage.getItem("favoritos")
       let favoritos = storage ? JSON.parse(storage) : []
       let resultado = favoritos.filter(item=> item && item.id === this.props.item.id)
       // el item && lo agregué para evitar que cuando item = null tire error item.id
       return resultado.length > 0
       // Si resultado devuelve un array con un item o más, el return es true, si no es false
   }




   render() {
    let usuario = cookies.get("usuarioLogueado")

       return (
           <article className={this.props.cardClass}>
               <img src={`https://image.tmdb.org/t/p/w342/${this.props.item.poster_path}`}
               // utilizo title || name porque las películas tienen title y las series tienen name
               alt={this.props.item.title || this.props.item.name}
               className="card-img-top"/>
               <div className="cardBody">
                   <h5 className="card-title">{this.props.item.title || this.props.item.name}</h5>
                   {/* ver descripción solo si el usuario hace click en el botón */}
                   {this.state.verDesc ? <p className="card-text">{this.props.item.overview}</p> : null}
                   <button className="btn-description" onClick={() => this.setState({ verDesc: !this.state.verDesc })}>
                       {this.state.verDesc ? "Ocultar descripción" : "Ver descripción"}
                   </button>
                   <Link to={this.props.link} className="boton-detalle">
                       Ver detalle
                   </Link>
                   {this.props.botonesFavoritos?(
                      <button onClick={()=>this.props.eliminarFavorito(this.props.item.id)}>
                          Eliminar de favoritos
                      </button>
                      // Este botón aparece solo en favoritos, ya que "botonesFavoritos" solo es true en la screen de favoritos
                  ): (usuario?(this.state.esFavorito?(
                      <button onClick={()=>this.eliminarDeFavoritos()}>
                          Eliminar de favoritos
                      </button>
                  ):(<button onClick={()=>this.agregarAFavoritos()}>
                          Agregar a favoritos
                      </button>
                   )):null)}
               </div>
           </article>
       )
   }
}


export default Card;

