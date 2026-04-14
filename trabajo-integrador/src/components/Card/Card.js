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
                    <a href='' className="btn-description">Agregar a favoritos</a>
                </div>
            </article>
        )
    }
}

export default Card;
