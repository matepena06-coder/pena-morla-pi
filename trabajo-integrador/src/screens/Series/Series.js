import SeccionSeries from "../../components/SeccionSeries/SeccionSeries"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import "./Series.css"

function Series() {
    return (
        <section>
            <Navbar/>
            <SeccionSeries ubicacion='moviesseries'/>
            <Footer/>
        </section>
        
    )
}

export default Series
