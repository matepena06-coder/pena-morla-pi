import React from "react";
import NotFoundMessage from "../../components/NotFoundMessage/NotFoundMessage";
import SeccionMovies from "../../components/SeccionMovies/SeccionMovies"; 
import SeccionSeries from "../../components/SeccionSeries/SeccionSeries";
import "./Home.css";

function Home() {
    return (
        <div>
            <SeccionMovies 
            ubicacion='home'
            />
            <SeccionSeries 
            ubicacion='home'
            />
        </div>
    );
}

export default Home;
