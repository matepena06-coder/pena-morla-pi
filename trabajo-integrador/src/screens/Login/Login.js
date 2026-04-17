import Login from "../../components/Login/Login"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import "./Login.css"

function LoginS(){
    return(
        <section>
            <Navbar/>
            <Login/>
            <Footer/>
        </section>
    )
}

export default LoginS