import React from "react"
function Card(props){
    return(
        <article className={props.cardClass}>
            <img src={`https://image.tmdb.org/t/p/w342/${props.pelicula.poster_path}`} 
            alt={props.pelicula.title} 
            className="card-img-top"/>
            <div className="cardBody">
                <h5 className= "card-title">{props.pelicula.title}</h5>
                <p className="card-text">{props.pelicula.overview}</p>
                <a href={props.link} className="btn btn-primary">Ver Más</a>
                <a href="movie.html" className="btn alert-primary">❤️</a>
            </div>
        </article>

    )
}

export default Card;