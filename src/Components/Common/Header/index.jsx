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
                        <a href="/agregar">Agregar</a>
                    </li>
                </ul>
                <div className="search-cointainer">
                    <input type="text" placeholder="Busca..." />
                    <button>Buscar</button>
                </div>
            </header>
        </>
    )
}

export default Header