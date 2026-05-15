import React, {useState} from "react"
import { Link } from "react-router-dom"
import "./styles.css"
import Cookies from "universal-cookie"


const cookies =new Cookies()

// Componente reutilizable para mostrar películas o series en formato de tarjeta

function Card(props){
   const [verDesc, setVerDesc]= useState(false)
   const [esFavorito, setEsFavorito]= useState (estáEnFavoritos())


   function agregarAFavoritos() {
       let storage = localStorage.getItem("favoritos")
       let favoritos = storage ? JSON.parse(storage) : []
       favoritos.push(props.item)
       localStorage.setItem("favoritos", JSON.stringify(favoritos))
       setEsFavorito(
           true
           // Esto sirve para cambiar el renderizado cambie al instante el botón de agregar a eliminar
       )
   }


   function eliminarDeFavoritos(){
       let storage = localStorage.getItem("favoritos")
       let favoritos = storage ? JSON.parse(storage) : []
       let nuevosFavoritos = favoritos.filter(item=> item.id !== props.item.id)
       localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos))
       setEsFavorito(
           false
       )
      
   }


   function estáEnFavoritos(){
       let storage = localStorage.getItem("favoritos")
       let favoritos = storage ? JSON.parse(storage) : []
       let resultado = favoritos.filter(item=> item && item.id === props.item.id)
       // el item && lo agregué para evitar que cuando item = null tire error item.id
       return resultado.length > 0
       // Si resultado devuelve un array con un item o más, el return es true, si no es false
   }

    let usuario = cookies.get("usuarioLogueado")

       return (
           <article className={props.cardClass}>
               <img src={`https://image.tmdb.org/t/p/w342/${props.item.poster_path}`}
               // utilizo title || name porque las películas tienen title y las series tienen name
               alt={props.item.title || props.item.name}
               className="card-img-top"/>
               <div className="cardBody">
                   <h5 className="card-title">{props.item.title || props.item.name}</h5>
                   {/* ver descripción solo si el usuario hace click en el botón */}
                   {verDesc ? <p className="card-text">{props.item.overview}</p> : null}
                   <button className="btn-description" onClick={() => setVerDesc( !verDesc )}>
                       {verDesc ? "Ocultar descripción" : "Ver descripción"}
                   </button>
                   <Link to={props.link} className="boton-detalle">
                       Ver detalle
                   </Link>
                   {props.botonesFavoritos?(
                      <button onClick={()=>props.eliminarFavorito(props.item.id)}>
                          Eliminar de favoritos
                      </button>
                      // Este botón aparece solo en favoritos, ya que "botonesFavoritos" solo es true en la screen de favoritos
                  ): (usuario?(esFavorito?(
                      <button onClick={()=>eliminarDeFavoritos()}>
                          Eliminar de favoritos
                      </button>
                  ):(<button onClick={()=>agregarAFavoritos()}>
                          Agregar a favoritos
                      </button>
                   )):null)}
               </div>
           </article>
       )
   }



export default Card;

