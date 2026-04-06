import React, { useState } from "react"
import "./Card.css"

function Card(props){
    const [verDesc, setVerDesc] = useState(false)

    return(
        <article className={props.cardClass}>
            <img src={`https://image.tmdb.org/t/p/w342/${props.pelicula.poster_path}`}
            alt={props.pelicula.title || props.pelicula.name}
            className="card-img-top"/>
            <div className="cardBody">
                <h5 className="card-title">{props.pelicula.title || props.pelicula.name}</h5>
                {verDesc && <p className="card-text">{props.pelicula.overview}</p>}
                <button className="btn-description" onClick={() => setVerDesc(!verDesc)}>
                    {verDesc ? "Ocultar descripción" : "Ver descripción"}
                </button>
                <a href='' className="btn btn-primary">Ir a detalle</a>
                <a href='' className="btn-description">Agregar a favoritos</a>
            </div>
        </article>
    )
}

export default Card;
