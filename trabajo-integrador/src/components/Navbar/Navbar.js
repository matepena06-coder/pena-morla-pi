import React from "react";

function Navbar(){
    return(
    <>      
        <h1>UdeSA Movies</h1>
        <nav>
            <ul class="nav nav-tabs my-4">
                <li class="nav-item">
                    <a class="nav-link" href="index.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="movies.html">Películas</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="series.html">Series</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="favorites.html">Favoritas</a>
                </li>
                <li class="nav-item ml-auto">
                    <a class="nav-link" href="register.html">Registro</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="login.html">Login</a>
                </li>
            </ul>
        </nav>
    </>
    )
}

export default Navbar;