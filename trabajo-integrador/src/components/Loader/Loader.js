import "./styles.css"
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"

function Loader() {
    return (
        <div className="loader-container">
            <span className="loader-text">Cargando...</span>
            <img className='loader' src="/loader.gif" alt="cargando" />
        </div>
    )
}

export default Loader
