import React from 'react';
import { Link } from 'react-router-dom';
import './Not-found-message.css';

function NotFoundMessage() {
    return (
        <div className='not-found-message'>

            <img className='not-found-image' src="/404-error.png" alt="Not Found"/>
            <h1 className='not-found-title'><strong> No encontramos resultados para tu búsqueda </strong></h1>
            <Link to="/" className="not-found-button"> Volver al inicio </Link>

        </div>
    );
}

export default NotFoundMessage;