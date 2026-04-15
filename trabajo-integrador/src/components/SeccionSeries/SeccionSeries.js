import React, { Component } from "react"
import Card from "../Card/Card"
import "../Card/Card.css"
import "./SeccionSeries.css"
import Loader from "../../screens/Loader/Loader"
import {Link} from "react-router-dom"


// Esta pagina contiene las mismas funcionalidades que las peliculas, pero con las series
class SeccionSeries extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datosPopulares: [],
            datosNowAiring: [],
            paginaPopulares: 1,
            paginaNowAiring: 1,
            contenidoCargado: false,
            filtro: ""
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
        fetch(`https://api.themoviedb.org/3/tv/popular?api_key=d452059a88c91458f5fb658b7db8e011&page=${this.state.paginaPopulares + 1}`)
            .then(response => response.json())
            .then(data => this.setState({
                datosPopulares: this.state.datosPopulares.concat(data.results),
                paginaPopulares: this.state.paginaPopulares + 1
            }))
            .catch(error => console.log(error))
    }

    verMasNowAiring() {
        fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=d452059a88c91458f5fb658b7db8e011&page=${this.state.paginaNowAiring + 1}`)
            .then(response => response.json())
            .then(data => this.setState({
                datosNowAiring: this.state.datosNowAiring.concat(data.results),
                paginaNowAiring: this.state.paginaNowAiring + 1
            }))
            .catch(error => console.log(error))
    }

    render() {
        return (
            this.state.contenidoCargado ?

            <React.Fragment>
                {this.props.ubicacion === 'moviesseries' ?
                    <input
                        className='filtro-input'
                        type="text"
                        placeholder='Filtrar series...'
                        value={this.state.filtro}
                        onChange={e => this.setState({ filtro: e.target.value })}
                    />
                    : null
                    }

                <h2 className="alert alert-primary">Popular TV shows this week</h2>

                <section className="row cards">
                    {this.state.datosPopulares
                        .filter(item => item.name.toLowerCase().includes(this.state.filtro.toLowerCase()))
                        .slice(0, this.props.ubicacion === 'home' ? 4 : 1000)
                        .map((item, idx) => (
                            <Card
                                key={idx}
                                item={item}
                                cardClass="card single-card-tv"
                                link={`/tv/${item.id}`}
                            />
                        ))
                    }
                </section>

                {this.props.ubicacion === 'home' ?
                    <Link to='/series' className='cargar-todas'> Cargar todas </Link> :
                    <button className='ver-mas' onClick={() => this.verMasPopulares()}> Ver más </button>
                }

                <h2 className="alert alert-primary">TV shows airing today</h2>

                <section id="on-air-today" className="row cards">
                    {this.state.datosNowAiring
                        .filter(item => item.name.toLowerCase().includes(this.state.filtro.toLowerCase()))
                        .slice(0, this.props.ubicacion === 'home' ? 4 : 1000)
                        .map((item, idx) => (
                            <Card
                                key={idx}
                                item={item}
                                cardClass="card single-card-on-air"
                                link={`/tv/${item.id}`}
                            />
                        ))
                    }
                </section>

                {this.props.ubicacion === 'home' ?
                    <Link to='/series' className='cargar-todas'> Cargar todas </Link> :
                    <button className='ver-mas' onClick={() => this.verMasNowAiring()}>Ver más</button>
                }
            </React.Fragment>

            : <Loader />
        )
    }
}

export default SeccionSeries;
