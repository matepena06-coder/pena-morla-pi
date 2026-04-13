import React, { Component } from "react"
import Card from "../Card/Card"
import "../Card/Card.css"
import "./SeccionMovies.css"
import Loader from "../../screens/Loader/Loader"

class SeccionMovies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datosPopulares: [],
            datosNowPlaying: [],
            paginaPopulares: 1,
            paginaNowPlaying: 1,
            contenidoCargado: false
        }
    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=d452059a88c91458f5fb658b7db8e011")
            .then(response => response.json())
            .then(data => this.setState({ datosPopulares: data.results, contenidoCargado: true }))
            .catch(error => console.log(error))

        fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=d452059a88c91458f5fb658b7db8e011")
            .then(response => response.json())
            .then(data => this.setState({ datosNowPlaying: data.results }))
            .catch(error => console.log(error))
    }

    verMasPopulares() {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d452059a88c91458f5fb658b7db8e011&page=${this.state.paginaPopulares + 1}`)
            .then(response => response.json())
            .then(data => this.setState({
                datosPopulares: this.state.datosPopulares.concat(data.results),
                paginaPopulares: this.state.paginaPopulares + 1
            }))
            .catch(error => console.log(error))
    }

    verMasNowPlaying() {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=d452059a88c91458f5fb658b7db8e011&page=${this.state.paginaNowPlaying + 1}`)
            .then(response => response.json())
            .then(data => this.setState({
                datosNowPlaying: this.state.datosNowPlaying.concat(data.results),
                paginaNowPlaying: this.state.paginaNowPlaying + 1
            }))
            .catch(error => console.log(error))
    }

    render() {
        return (
            this.state.contenidoCargado ?
            <React.Fragment>
                <h2 className="alert alert-primary">Popular Movies this week</h2>
                <section className="row cards">
                    {this.state.datosPopulares.map((item, idx) => (
                            <Card
                                key={idx}
                                item={item}
                                cardClass="card single-card-movie"
                                link={`/movie/${item.id}`}
                            />
                        ))
                    }
                </section>
                <button className='ver-mas'onClick={() => this.verMasPopulares()}>Ver más</button>

                <h2 className="alert alert-primary">Movies now Playing</h2>
                <section id="now-playing" className="row cards">
                    {this.state.datosNowPlaying.map((item, idx) => (
                            <Card
                                key={idx}
                                item={item}
                                cardClass="card single-card-playing"
                                link={`/movie/${item.id}`}
                            />
                        ))
                    }
                </section>
                <button className='ver-mas'onClick={() => this.verMasNowPlaying()}>Ver más</button>
            </React.Fragment>
            : <Loader />
        )
    }
}

export default SeccionMovies;
