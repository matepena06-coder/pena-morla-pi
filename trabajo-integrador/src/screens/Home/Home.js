import React from "react";
import NotFoundMessage from "../../components/NotFoundMessage/NotFoundMessage";
import SeccionMovies from "../../components/SeccionMovies/SeccionMovies";
import SeccionSeries from "../../components/SeccionSeries/SeccionSeries";
import Search from "../../components/Search/Search";
import "./styles.css";
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"

function Home() {
    return (
        <div>
            <Navbar/>
            <Search />
            <SeccionMovies
            ubicacion='home'
            />
            <SeccionSeries 
            ubicacion='home'
            />
            <Footer/>
        </div>
    );
}

export default Home;
