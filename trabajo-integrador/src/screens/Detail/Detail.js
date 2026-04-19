import React, { Component } from "react"
import "./styles.css"
import Loader from "../../components/Loader/Loader"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"

class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dato: { genres: [] },
            contenidoCargado: false
        }
    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/${this.props.match.params.type}/${this.props.match.params.id}?api_key=d452059a88c91458f5fb658b7db8e011`)
            .then(response => response.json())
            .then(data => this.setState({ dato: data, contenidoCargado: true }))
            .catch(error => console.log(error))
    }

    render() {
        return (
            <>
            <Navbar/>
            {this.state.contenidoCargado ? (
            <div className="detail">
                <img
                    src={`https://image.tmdb.org/t/p/w342/${this.state.dato.poster_path}`}
                    alt={this.state.dato.title || this.state.dato.name}
                />
                <div className="detail-info">
                    <h2>{this.state.dato.title || this.state.dato.name}</h2>
                    <p> <strong>Calificación:</strong> {this.state.dato.vote_average}</p>
                    <p> <strong>Fecha de estreno:</strong> {this.state.dato.release_date || this.state.dato.first_air_date}</p>
                    {this.props.match.params.type === "movie" ? <p> <strong>Duración:</strong> {this.state.dato.runtime} min</p> : null}
                    <p><strong> Sinopsis: </strong> {this.state.dato.overview}</p>
                    <p> <strong>Géneros:</strong> {this.state.dato.genres.map((genres, idx) => <span key={idx}>{genres.name} </span>)}</p>
                    <a href="">Agregar a favoritos</a>
                </div>
            </div>
            )
            : <Loader />
            }
            <Footer/>
            </>
        )
    }
}

export default Detail
