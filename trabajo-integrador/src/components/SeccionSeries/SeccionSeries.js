import React, { Component } from "react"
import Card from "../Card/Card"
import "../Card/Card.css"
import "./SeccionSeries.css"
import Loader from "../../screens/Loader/Loader"

class SeccionSeries extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datosPopulares: [],
            datosNowAiring: [],
            paginaPopulares: 1,
            paginaNowAiring: 1,
            contenidoCargado: false
        }
    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/tv/popular?api_key=d452059a88c91458f5fb658b7db8e011")
            .then(response => response.json())
            .then(data => this.setState({ datosPopulares: data.results, contenidoCargado: true }))
            .catch(error => console.log(error))

        fetch("https://api.themoviedb.org/3/tv/on_the_air?api_key=d452059a88c91458f5fb658b7db8e011")
            .then(response => response.json())
            .then(data => this.setState({ datosNowAiring: data.results }))
            .catch(error => console.log(error))
    }

    verMasPopulares() {
        const nuevaPagina = this.state.paginaPopulares + 1
        fetch(`https://api.themoviedb.org/3/tv/popular?api_key=d452059a88c91458f5fb658b7db8e011&page=${nuevaPagina}`)
            .then(response => response.json())
            .then(data => this.setState({
                datosPopulares: this.state.datosPopulares.concat(data.results),
                paginaPopulares: nuevaPagina
            }))
            .catch(error => console.log(error))
    }

    verMasNowAiring() {
        const nuevaPagina = this.state.paginaNowAiring + 1
        fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=d452059a88c91458f5fb658b7db8e011&page=${nuevaPagina}`)
            .then(response => response.json())
            .then(data => this.setState({
                datosNowAiring: this.state.datosNowAiring.concat(data.results),
                paginaNowAiring: nuevaPagina
            }))
            .catch(error => console.log(error))
    }

    render() {
        return (
            this.state.contenidoCargado ?
            <React.Fragment>
                <h2 className="alert alert-primary">Popular TV shows this week</h2>
                <section className="row cards">
                    {this.state.datosPopulares.map((item, idx) => (
                            <Card
                                key={idx}
                                item={item}
                                cardClass="card single-card-tv"
                                link={`/tv/${item.id}`}
                            />
                        ))
                    }
                </section>
                <button onClick={() => this.verMasPopulares()}>Ver más</button>

                <h2 className="alert alert-primary">TV shows airing today</h2>
                <section id="on-air-today" className="row cards">
                    {this.state.datosNowAiring.map((item, idx) => (
                            <Card
                                key={idx}
                                item={item}
                                cardClass="card single-card-on-air"
                                link={`/tv/${item.id}`}
                            />
                        ))
                    }
                </section>
                <button onClick={() => this.verMasNowAiring()}>Ver más</button>
            </React.Fragment>
            : <Loader />
        )
    }
}

export default SeccionSeries;
