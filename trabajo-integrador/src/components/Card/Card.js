import React, { Component } from "react"
import { Link } from "react-router-dom";
import "./Card.css"

// Componente reutilizable para mostrar películas o series en formato de tarjeta
class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            verDesc: false
        }
    }

    agregarAFavoritos(){
       let favoritos = []


       let recuperarStorage = localStorage.getItem("favoritos")


       if (recuperarStorage !== null){
           favoritos= JSON.parse(recuperarStorage)
       }
       favoritos.push(this.props.item)


       let favoritosString= JSON.stringify(favoritos)


       localStorage.setItem("favoritos", favoritosString)
   }

    render() {
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
                    {this.props.botonesFavoritos?(
                       <button onClick={()=>this.props.eliminarFavorito(this.props.item.id)}>
                           Eliminar de favoritos
                       </button>
                   ):(
                       <button onClick={()=>this.agregarAFavoritos()}>
                           Agregar a favoritos
                       </button>
                   )}
                </div>
            </article>
        )
    }
}

export default Card;
