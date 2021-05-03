import React from 'react'
import './header.scss'

const Header = () => {
    return (
        <>
            <header className="header-cointainer">
                <ul>
                    <li>
                        <a href="/inicio">inicio</a>
                    </li>
                    <li>
                        <a href="/peliculas">Peliculas</a>
                    </li>
                    <li>
                        <a href="/peliculas/crear">Crear pelicula</a>
                    </li>
                </ul>
                <div className="search-cointener">
                    <input type="text" placeholder="Buscar..." />
                    <button>Buscar</button>
                </div>
            </header>
        </>
    )
}

export default Header