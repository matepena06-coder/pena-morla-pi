import React, { Component } from "react";
import Card from "../Card/Card";
import "../Card/Card.css";
import "./SeccionMovies.css";
import Loader from "../../screens/Loader/Loader";
import {Link} from "react-router-dom";

class SeccionMovies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datosPopulares: [],
            datosNowPlaying: [],
            paginaPopulares: 1,
            paginaNowPlaying: 1,
            contenidoCargado: false,
            filtro: ""
        }
    }

    // ComponentDidMount, etapa inicial del ciclo de vida, la uso para cargar las películas

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=d452059a88c91458f5fb658b7db8e011")
            .then(response => response.json())
            .then(data => this.setState({ 
                datosPopulares: data.results, 
                contenidoCargado: true 
            }))
            .catch(error => console.log(error))

        fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=d452059a88c91458f5fb658b7db8e011")
            .then(response => response.json())
            .then(data => this.setState({ 
                datosNowPlaying: data.results 
            }))
            .catch(error => console.log(error))
    }

    // Traigo los datos de las siguientes paginas, concatenando los arrays para no perder los datos anteriores

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
        // Si el contenido no se ha cargado, muestro un loader. 
            this.state.contenidoCargado ?
            <React.Fragment>
                {this.props.ubicacion === 'moviesseries' ?
                /* si la sección es la de movies/series, muestro un input para filtrar por título.  */
                    <input
                        className="filtro-input"
                        type="text"
                        placeholder="Filtrar películas..."
                        value={this.state.filtro}
                        onChange={e => this.setState({ filtro: e.target.value })}
                    />
                : null}
                

                <h2 className="alert alert-primary">Popular Movies this week</h2>
                <section className="row cards">
                    {this.state.datosPopulares
                    /* filtro por título, muestro las peliculas solicitadas, tambien si estoy en home hago slice (estetica)  */
                        .filter(item => item.title.toLowerCase().includes(this.state.filtro.toLowerCase()))
                        .slice(0, this.props.ubicacion === 'home' ? 4 : 16)
                        .map((item, idx) => (
                            <Card
                            // Mando la informacion a la card, como props, para que se muestre la imagen, el título, la descripción y habilite la pagina detalle 
                                key={idx}
                                item={item}
                                cardClass="card single-card-movie"
                                link={`/movie/${item.id}`}
                            />
                        ))
                    }
                </section>

                {/* Si estoy en home, muestro el link para ir a la screen Movies, sino muestro un boton para fetchear mas peliculas.  */}
                {this.props.ubicacion === 'home' ?
                    <Link to='/movies' className='cargar-todas'> Cargar todas </Link> :
                    <button className='ver-mas' onClick={() => this.verMasPopulares()}>Ver más</button>
                }

                {/* idem */}
                <h2 className="alert alert-primary">Movies now Playing</h2>
                <section id="now-playing" className="row cards">
                    {this.state.datosNowPlaying
                        .filter(item => item.title.toLowerCase().includes(this.state.filtro.toLowerCase()))
                        .slice(0, this.props.ubicacion === 'home' ? 4 : 16)
                        .map((item, idx) => (
                            <Card
                                key={idx}
                                item={item}
                                cardClass="card single-card-playing"
                                link={`/movie/${item.id}`}
                            />
                        ))
                    }
                </section>
                {this.props.ubicacion === 'home' ?
                    <Link to='/movies' className='cargar-todas'> Cargar todas </Link> :
                    <button className='ver-mas' onClick={() => this.verMasNowPlaying()}>Ver más</button>
                }
            </React.Fragment>
            : <Loader />
        )
    }
}

export default SeccionMovies;
