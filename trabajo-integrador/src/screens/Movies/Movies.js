import SeccionMovies from "../../components/SeccionMovies/SeccionMovies"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import "./styles.css"

function Movies() {
    return (
        <section>
            <Navbar/>
            <SeccionMovies ubicacion='moviesseries'/>
            <Footer/>
        </section>
    )
}

export default Movies
