import React, { Component } from "react"
import Card from "../Card/Card"
import "../Card/Card.css"
import "./SeccionSeries.css"

class SeccionSeries extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datosPopulares: [],
            datosNowAiring: []
        }
    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/tv/popular?api_key=d452059a88c91458f5fb658b7db8e011")
            .then(response => response.json())
            .then(data => this.setState({ datosPopulares: data.results }))
            .catch(error => console.log(error))

        fetch("https://api.themoviedb.org/3/tv/on_the_air?api_key=d452059a88c91458f5fb658b7db8e011")
            .then(response => response.json())
            .then(data => this.setState({ datosNowAiring: data.results }))
            .catch(error => console.log(error))
    }

    render() {
        return (
            <React.Fragment>
                <h2 className="alert alert-primary">Popular TV shows this week</h2>
                <section className="row cards">
                    {this.state.datosPopulares.length === 0 ?
                        <h3>Cargando...</h3> :
                        this.state.datosPopulares.map((serie, idx) => (
                            <Card
                                key={idx}
                                pelicula={serie}
                                cardClass="card single-card-tv"
                                link={`https://www.themoviedb.org/tv/${serie.id}`}
                            />
                        ))
                    }
                </section>

                <h2 className="alert alert-primary">TV shows airing today</h2>
                <section id="on-air-today" className="row cards">
                    {this.state.datosNowAiring.length === 0 ?
                        <h3>Cargando...</h3> :
                        this.state.datosNowAiring.map((serie, idx) => (
                            <Card
                                key={idx}
                                pelicula={serie}
                                cardClass="card single-card-on-air"
                                link={`https://www.themoviedb.org/tv/${serie.id}`}
                            />
                        ))
                    }
                </section>
            </React.Fragment>
        )
    }
}

export default SeccionSeries;
