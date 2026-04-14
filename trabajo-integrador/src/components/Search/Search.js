import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import "./Search.css"

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
        // necesito el query (busqueda del usuario) y el tipo (pelicula o serie) para realizar el fetch
            query: "",
            tipo: ""
        }
    }

    tomarElSubmit(e) {
        e.preventDefault()
        this.state.tipo === '' ? alert('Por favor, seleccioná Películas o Series') :
        this.state.query === '' ? alert('Por favor, ingresá una búsqueda') :
        this.props.history.push(`/search/${this.state.tipo}/${this.state.query}`)
    }

    render() {
        return (
            <React.Fragment>
                <form className="search-form" onSubmit={e => this.tomarElSubmit(e)}>
                    <input
                        type="text"
                        name="searchData"
                        placeholder="Buscar..."
                        value={this.state.query}
                        onChange={e => this.setState({ query: e.target.value })}
                    />
                    {/* Si el usuario no selecciona un tipo de búsqueda, muestro una alerta.  */}
                    <button type="submit" className="boton-submit">
                        Buscar
                    </button>
                </form>

                {/* Radio buttons para seleccionar el tipo de búsqueda (película o serie) */}
                <div className="search-tipo">
                    <label className="search-tipo-label">
                        <input
                            type="radio"
                            name="tipo"
                            value="movie"
                            onChange={() => this.setState({ tipo: "movie" })}
                        />
                        Películas
                    </label>
                    <label className="search-tipo-label">
                        <input
                            type="radio"
                            name="tipo"
                            value="tv"
                            onChange={() => this.setState({ tipo: "tv" })}
                        />
                        Series
                    </label>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Search);
