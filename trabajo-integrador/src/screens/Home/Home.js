import React from "react";
import NotFoundMessage from "../../components/NotFoundMessage/NotFoundMessage";
import SeccionMovies from "../../components/SeccionMovies/SeccionMovies"; 
import SeccionSeries from "../../components/SeccionSeries/SeccionSeries";

function Home() {
    return (
        <div>
            <SeccionMovies />
            <SeccionSeries />
        </div>
    );
}

export default Home;
