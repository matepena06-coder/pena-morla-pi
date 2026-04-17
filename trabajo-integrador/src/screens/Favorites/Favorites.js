import Cookies from "universal-cookie"
import Card from "../../components/Card/Card"
import React, {Component} from "react"
import "./Favorites.css"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"


const cookies = new Cookies()


class Favorites extends Component{
   constructor(props) {
       super(props)
       this.state = {
           favoritos:[]
       }
   }


   componentDidMount(){

       let storage = localStorage.getItem("favoritos")

       let favoritosGuardados = storage ? JSON.parse(storage) : []
    
       this.setState({
           favoritos: favoritosGuardados
       })

   }

   eliminarFavorito(id){
       let storage = localStorage.getItem("favoritos")
      
       let favoritos = storage ? JSON.parse(storage) : []


       let nuevosFavoritos = favoritos.filter(item => item.id !== id)


       localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos))
          
       this.setState({
           favoritos: nuevosFavoritos
       })
  
       }
  
   render(){
       let peliculasFavoritas =this.state.favoritos.filter(item=> item.title)
       let seriesFavoritas =this.state.favoritos.filter(item=> item.name)
       return(
           <React.Fragment>
               <Navbar/>
               <h2 className="alert alert-primary">Películas Favoritas</h2>
               <section className= "row cards">
               {peliculasFavoritas.length === 0 ?(
                   <p>No tenes películas favoritas</p>
               ): (peliculasFavoritas.map((item, idx)=>(
                  
                   <Card key= {idx} item={item} link={`/movie/${item.id}`} cardClass="single-card" botonesFavoritos={true}
                   eliminarFavorito={(id) => this.eliminarFavorito(id)}/>
                  
               ))
               )}
              
               </section>
               <h2 className="alert alert-primary">Series Favoritas</h2>
               <section className="row cards">
               {seriesFavoritas.length === 0 ?(
                   <p>No tenes series favoritas</p>
               ): (seriesFavoritas.map((item, idx)=>(
                  
                   <Card key= {idx} item={item} link={`/tv/${item.id}`} cardClass="single-card" botonesFavoritos={true}
                   eliminarFavorito={(id) => this.eliminarFavorito(id)}/>
   
               ))
               )}
               </section>
               <Footer/>
              
           </React.Fragment>
       )
   }
}


export default Favorites
