import React from "react";
import NotFoundMessage from "../../components/NotFoundMessage/NotFoundMessage";
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import "./styles.css"

function NotFound() {
    return (
    <section>
        <Navbar/>
        <NotFoundMessage />
        <Footer/>
    </section>
    )
}

export default NotFound;
