import React, { Component } from "react"
import Card from "../Card/Card"
import "../Card/Card.css"
import "./SeccionMovies.css"

class SeccionMovies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datosPopulares: [],
            datosNowPlaying: []
        }
    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=d452059a88c91458f5fb658b7db8e011")
            .then(response => response.json())
            .then(data => this.setState({ datosPopulares: data.results }))
            .catch(error => console.log(error))

        fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=d452059a88c91458f5fb658b7db8e011")
            .then(response => response.json())
            .then(data => this.setState({ datosNowPlaying: data.results }))
            .catch(error => console.log(error))
    }

    render() {
        return (
            <React.Fragment>
                <h2 className="alert alert-primary">Popular Movies this week</h2>
                <section className="row cards">
                    {this.state.datosPopulares.length === 0 ?
                        <h3>Cargando...</h3> :
                        this.state.datosPopulares.map((pelicula, idx) => (
                            <Card
                                key={idx}
                                pelicula={pelicula}
                                cardClass="card single-card-movie"
                                link={`https://www.themoviedb.org/movie/${pelicula.id}`}
                            />
                        ))
                    }
                </section>

                <h2 className="alert alert-primary">Movies now Playing</h2>
                <section id="now-playing" className="row cards">
                    {this.state.datosNowPlaying.length === 0 ?
                        <h3>Cargando...</h3> :
                        this.state.datosNowPlaying.map((pelicula, idx) => (
                            <Card
                                key={idx}
                                pelicula={pelicula}
                                cardClass="card single-card-playing"
                                link={`https://www.themoviedb.org/movie/${pelicula.id}`}
                            />
                        ))
                    }
                </section>
            </React.Fragment>
        )
    }
}

export default SeccionMovies;
