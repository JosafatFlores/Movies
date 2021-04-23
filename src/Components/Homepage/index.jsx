import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import logo from '../../Assets/logo.png'

const Homepage = () => {
    return (
        <>
            <div className="welcome-container">
                <img src={logo} alt="CronoxSoft_Logo" />
                <p className="welcome-test">
                    Bienvenido a la plataforma de peliculas CronoxSoft.
                </p>
                <button className="welcome-button">
                    <Link to="/peliculas">
                        Ver peliculas
                </Link>
                </button>
            </div>
        </>
    )
}

export default Homepage