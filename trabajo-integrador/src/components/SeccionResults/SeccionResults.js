import { Component } from "react"
import { withRouter } from "react-router-dom"
import Card from "../Card/Card"
import NotFoundMessage from "../NotFoundMessage/NotFoundMessage"
import Loader from "../Loader/Loader"
import "../Card/Card.css"
import "./SeccionResults.css"

// Ultimo componente del flujo de search.

class SeccionResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resultados: [],
            contenidoCargado: false
        }
    }

    // Traigo los resultados de la busqueda realizada por el usuario


    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/search/${this.props.match.params.tipo}?api_key=d452059a88c91458f5fb658b7db8e011&query=${this.props.match.params.query}`)
            .then(response => response.json())
            .then(data => this.setState({
                resultados: data.results.filter(elem => elem.poster_path),
                contenidoCargado: true
            }))
            .catch(error => console.log(error))
    }

    render() {
        return (
            // Dos ternarios, si no cargo, poner el loader, si cargo y no trajo resultados, uso el 404
            this.state.contenidoCargado
            ? (this.state.resultados.length === 0
                ? <NotFoundMessage />
                : <section className="row cards">
                    {this.state.resultados.map((elem, idx) => (
                        <Card
                            key={idx}
                            item={elem}
                            link={`/${this.props.match.params.tipo}/${elem.id}`}
                            cardClass="card"
                        />
                    ))}
                </section>)
            : <Loader />
        )
    }
}

export default withRouter(SeccionResults)
