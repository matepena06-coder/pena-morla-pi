import React, { Component } from "react"
import "./styles.css"
import Loader from "../../components/Loader/Loader"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import Cookies from "universal-cookie"

const cookies =new Cookies()

class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dato: { genres: [] },
            contenidoCargado: false,
            esFavorito: false
        }
    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/${this.props.match.params.type}/${this.props.match.params.id}?api_key=d452059a88c91458f5fb658b7db8e011`)
            .then(response => response.json())
            .then(data => this.setState({ dato: data, contenidoCargado: true }))
            .catch(error => console.log(error))
    }

    agregarAFavoritos() {
       let storage = localStorage.getItem("favoritos")
       let favoritos = storage ? JSON.parse(storage) : []
       favoritos.push(this.state.dato)
       localStorage.setItem("favoritos", JSON.stringify(favoritos))
       this.setState({
           esFavorito: true
           // Esto sirve para cambiar el renderizado cambie al instante el botón de agregar a eliminar
       })
   }


   eliminarDeFavoritos(){
       let storage = localStorage.getItem("favoritos")
       let favoritos = storage ? JSON.parse(storage) : []
       let nuevosFavoritos = favoritos.filter(item=> item.id !== this.state.dato.id)
       localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos))
       this.setState({
           esFavorito: false
       })
      
   }


   estáEnFavoritos(){
       let storage = localStorage.getItem("favoritos")
       let favoritos = storage ? JSON.parse(storage) : []
       let resultado = favoritos.filter(item=> item.id === this.state.dato.id)
       return resultado.length > 0
       // Si resultado devuelve un array con un item o más, el return es true, si no es false
   }

    render() {
        let usuario = cookies.get("usuarioLogueado")
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
                    {usuario?(
                        this.state.esFavorito?(
                        <button onClick={()=>this.eliminarDeFavoritos()}>
                            Eliminar de favoritos
                        </button>
                    ):(<button onClick={()=>this.agregarAFavoritos()}>
                          Agregar a favoritos
                        </button>
                    )
                    ):null}
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
