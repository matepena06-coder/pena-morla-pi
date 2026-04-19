import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import Cookies from "universal-cookie";

const cookies =new Cookies()

function Navbar(){

    let usuario = cookies.get("usuarioLogueado")

    return(
    <>
        <h1 className="logo">PyM</h1>
        <nav>
            <ul className="nav nav-tabs my-4">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/movies">Películas</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/series">Series</Link>
                </li>
                {usuario? (
                <li className="nav-item">
                    <Link className="nav-link" to="/favorites">Favoritos</Link>
                </li>): null}

                {/* ternario con register y login, mostrar favoritos si esta logeado*/}
                {!usuario?(
                <li className="nav-item ml-auto">
                    <Link className="nav-link" to="/register">Registro</Link>
                </li>
                ): null}
                {!usuario?(
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                ): null}
            </ul>
        </nav>
    </>
    )
}

export default Navbar;