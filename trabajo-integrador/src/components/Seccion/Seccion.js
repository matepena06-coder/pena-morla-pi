import React,{Component} from "react"
import Card from "../Card/Card"

class Seccion extends Component{
    constructor(props){
        super(props)
        this.state={
            datos:[]
        }
    }
    componentDidMount(){
            fetch("https://api.themoviedb.org/3/movie/popular?api_key=d452059a88c91458f5fb658b7db8e011")
            .then(response=>response.json())
            .then(data=>
                this.setState({
                datos: data.results,
            }))
            .catch(error=>console.log(error))
        }

   
    render(){
        return(
            <React.Fragment>  
                <section className='row cards'>
                {this.state.datos.length=== 0?
                <h3>Cargando...</h3>:
                
                this.state.datos.map((pelicula, idx) =>(
                <Card key={idx} pelicula={pelicula} cardClass={this.props.cardClass} link={this.props.link}/>
            ))
                }
                </section>
            </React.Fragment>

    )
    }
}

export default Seccion