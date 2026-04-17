import React from "react"
import SeccionResults from "../../components/SeccionResults/SeccionResults"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import "./Results.css"

function Results(props) {
    const query = props.match.params.query
    const tipo = props.match.params.tipo

    return (
        <section>
            <Navbar/>
            <SeccionResults query={query} tipo={tipo} />
            <Footer/>
        </section>
    )
}

export default Results
