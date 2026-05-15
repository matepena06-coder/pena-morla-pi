import React, {useState, useEffect} from "react";
import Card from "../Card/Card";
import "../Card/styles.css";
import "./styles.css";
import Loader from "../Loader/Loader";
import {Link} from "react-router-dom";

function SeccionMovies(props){
   const [datosPopulares, setDatosPopulares]= useState([])
   const [datosNowPlaying, setDatosNowPlaying]= useState ([])
   const [paginaPopulares, setPaginaPopulares]= useState (1)
   const [paginaNowPlaying, setPaginaNowPlaying]= useState (1)
   const [contenidoCargado, setContenidoCargado]= useState (false)
   const [filtro, setFiltro]= useState ("")

    // ComponentDidMount, etapa inicial del ciclo de vida, la uso para cargar las películas

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=d452059a88c91458f5fb658b7db8e011")
            .then(response => response.json())
            .then(data => setDatosPopulares( 
                data.results),
                setContenidoCargado( 
                true) 
            )
            .catch(error => console.log(error))

        fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=d452059a88c91458f5fb658b7db8e011")
            .then(response => response.json())
            .then(data => setDatosNowPlaying( 
                data.results 
            ))
            .catch(error => console.log(error))
    }, [])

    // Traigo los datos de las siguientes paginas, concatenando los arrays para no perder los datos anteriores

    function verMasPopulares() {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d452059a88c91458f5fb658b7db8e011&page=${paginaPopulares + 1}`)
            .then(response => response.json())
            .then(data => setDatosPopulares(
                datosPopulares.concat(data.results)),
                setPaginaPopulares(
                paginaPopulares + 1)
            )
            .catch(error => console.log(error))
    }

    function verMasNowPlaying() {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=d452059a88c91458f5fb658b7db8e011&page=${paginaNowPlaying + 1}`)
            .then(response => response.json())
            .then(data => setDatosNowPlaying(
                datosNowPlaying.concat(data.results)),
                setPaginaNowPlaying(
                paginaNowPlaying + 1)
            )
            .catch(error => console.log(error))
    }

        return (
        // Si el contenido no se ha cargado, muestro un loader. 
            contenidoCargado ?
            <React.Fragment>
                {props.ubicacion === 'moviesseries' ?
                /* si la sección es la de movies/series, muestro un input para filtrar por título.  */
                    <input
                        className="filtro-input"
                        type="text"
                        placeholder="Filtrar películas..."
                        value={filtro}
                        onChange={e => setFiltro(e.target.value )}
                    />
                : null}
                

                <h2 className="alert alert-primary">Popular Movies this week</h2>
                <section className="row cards">
                    {datosPopulares
                    /* filtro por título, muestro las peliculas solicitadas, tambien si estoy en home hago slice (estetica)  */
                        .filter(item => item.title.toLowerCase().includes(filtro.toLowerCase()))
                        .slice(0, props.ubicacion === 'home' ? 4 : 1000)
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
                {props.ubicacion === 'home' ?
                    <Link to='/movies' className='cargar-todas'> Cargar todas </Link> :
                    <button className='ver-mas' onClick={() => verMasPopulares()}>Ver más</button>
                }

                {/* idem */}
                <h2 className="alert alert-primary">Movies now Playing</h2>
                <section id="now-playing" className="row cards">
                    {datosNowPlaying
                        .filter(item => item.title.toLowerCase().includes(filtro.toLowerCase()))
                        .slice(0, props.ubicacion === 'home' ? 4 : 1000)
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
                {props.ubicacion === 'home' ?
                    <Link to='/movies' className='cargar-todas'> Cargar todas </Link> :
                    <button className='ver-mas' onClick={() => verMasNowPlaying()}>Ver más</button>
                }
            </React.Fragment>
            : <Loader />
        )
    }


export default SeccionMovies;
