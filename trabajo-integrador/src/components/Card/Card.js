import React, { Component } from "react"
import { Link } from "react-router-dom";
import "./Card.css"

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
                alt={this.props.item.title || this.props.item.name}
                className="card-img-top"/>
                <div className="cardBody">
                    <h5 className="card-title">{this.props.item.title || this.props.item.name}</h5>
                    {this.state.verDesc && <p className="card-text">{this.props.item.overview}</p>}
                    <button className="btn-description" onClick={() => this.setState({ verDesc: !this.state.verDesc })}>
                        {this.state.verDesc ? "Ocultar descripción" : "Ver descripción"}
                    </button>
                    <Link to={this.props.link} className="btn btn-primary">Ir a detalle</Link>
                    <a href='' className="btn-description">Agregar a favoritos</a>
                </div>
            </article>
        )
    }
}

export default Card;
